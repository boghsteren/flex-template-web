import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import { types as sdkTypes } from '../../util/sdkLoader';
import { isTransactionsTransitionInvalidTransition, storableError } from '../../util/errors';
import {
  TRANSITION_ACCEPT,
  TRANSITION_DECLINE,
  TRANSITION_REVIEW_1_BY_CUSTOMER,
  TRANSITION_REVIEW_1_BY_PROVIDER,
  TRANSITION_REVIEW_2_BY_CUSTOMER,
  TRANSITION_REVIEW_2_BY_PROVIDER,
  TRANSITION_ENQUIRE,
  TRANSITION_REQUEST,
  TRANSITION_REQUEST_AFTER_ENQUIRY,
  TRANSITION_CANCEL,
  TRANSITION_EXPIRE_ENQUIRY,
  TRANSITION_EXPIRE_ENQUIRY_ACCEPTED,
  TRANSITION_WITHDRAW,
} from '../../util/types';
import * as log from '../../util/log';
import {
  updatedEntities,
  denormalisedEntities,
  denormalisedResponseEntities,
} from '../../util/data';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { fetchCurrentUserNotifications } from '../../ducks/user.duck';
import config from '../../config';
import { createProviderLineItems, createRefundLineItems } from './TransactionPage.helpers';
import AWS from 'aws-sdk';

// ================ Email ================ //

const ADMIN_EMAIL = `${process.env.REACT_APP_ADMIN_EMAIL}`;
const ADMIN_RECEIVER_EMAIL = `${process.env.REACT_APP_ADMIN_RECEIVER_EMAIL}`;

const { UUID } = sdkTypes;

const MESSAGES_PAGE_SIZE = 100;
const CUSTOMER = 'customer';

// ================ Action types ================ //

export const SET_INITAL_VALUES = 'app/TransactionPage/SET_INITIAL_VALUES';

export const FETCH_TRANSACTION_REQUEST = 'app/TransactionPage/FETCH_TRANSACTION_REQUEST';
export const FETCH_TRANSACTION_SUCCESS = 'app/TransactionPage/FETCH_TRANSACTION_SUCCESS';
export const FETCH_TRANSACTION_ERROR = 'app/TransactionPage/FETCH_TRANSACTION_ERROR';

export const ACCEPT_SALE_REQUEST = 'app/TransactionPage/ACCEPT_SALE_REQUEST';
export const ACCEPT_SALE_SUCCESS = 'app/TransactionPage/ACCEPT_SALE_SUCCESS';
export const ACCEPT_SALE_ERROR = 'app/TransactionPage/ACCEPT_SALE_ERROR';

export const DECLINE_SALE_REQUEST = 'app/TransactionPage/DECLINE_SALE_REQUEST';
export const DECLINE_SALE_SUCCESS = 'app/TransactionPage/DECLINE_SALE_SUCCESS';
export const DECLINE_SALE_ERROR = 'app/TransactionPage/DECLINE_SALE_ERROR';

export const FETCH_MESSAGES_REQUEST = 'app/TransactionPage/FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'app/TransactionPage/FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_ERROR = 'app/TransactionPage/FETCH_MESSAGES_ERROR';

export const SEND_MESSAGE_REQUEST = 'app/TransactionPage/SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'app/TransactionPage/SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_ERROR = 'app/TransactionPage/SEND_MESSAGE_ERROR';

export const SEND_REVIEW_REQUEST = 'app/TransactionPage/SEND_REVIEW_REQUEST';
export const SEND_REVIEW_SUCCESS = 'app/TransactionPage/SEND_REVIEW_SUCCESS';
export const SEND_REVIEW_ERROR = 'app/TransactionPage/SEND_REVIEW_ERROR';

// ================ Reducer ================ //

const initialState = {
  fetchTransactionInProgress: false,
  fetchTransactionError: null,
  transactionRef: null,
  acceptInProgress: false,
  acceptSaleError: null,
  declineInProgress: false,
  declineSaleError: null,
  fetchMessagesInProgress: false,
  fetchMessagesError: null,
  totalMessages: 0,
  totalMessagePages: 0,
  oldestMessagePageFetched: 0,
  messages: [],
  initialMessageFailedToTransaction: null,
  sendMessageInProgress: false,
  sendMessageError: null,
  sendReviewInProgress: false,
  sendReviewError: null,
};

const credential = new AWS.Config(
  {
    accessKeyId: `${process.env.REACT_APP_AWS_API_ACCESS_ID}`, 
    secretAccessKey: `${process.env.REACT_APP_AWS_API_ACCESS_KEY}`,
    region: `${process.env.REACT_APP_AWS_API_REGION}`
  }
);

AWS.config.update(credential);

const createEmailParams = (receiver, subject, content) => {
  let newReceiver = receiver ? receiver : ADMIN_RECEIVER_EMAIL;
  let toAddresses = Array.isArray(newReceiver) ? newReceiver : [newReceiver]
  let body = {
    Text: {
      Charset: "UTF-8",
      Data: content
    }
  }
  return {
    Destination: {
      ToAddresses: toAddresses
    },
    Message: {
      Body: body,
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: ADMIN_EMAIL,
  };
};

// Merge entity arrays using ids, so that conflicting items in newer array (b) overwrite old values (a).
// const a = [{ id: { uuid: 1 } }, { id: { uuid: 3 } }];
// const b = [{ id: : { uuid: 2 } }, { id: : { uuid: 1 } }];
// mergeEntityArrays(a, b)
// => [{ id: { uuid: 3 } }, { id: : { uuid: 2 } }, { id: : { uuid: 1 } }]
const mergeEntityArrays = (a, b) => {
  return a.filter(aEntity => !b.find(bEntity => aEntity.id.uuid === bEntity.id.uuid)).concat(b);
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITAL_VALUES:
      return { ...initialState, ...payload };

    case FETCH_TRANSACTION_REQUEST:
      return { ...state, fetchTransactionInProgress: true, fetchTransactionError: null };
    case FETCH_TRANSACTION_SUCCESS: {
      const transactionRef = { id: payload.data.data.id, type: 'transaction' };
      return { ...state, fetchTransactionInProgress: false, transactionRef };
    }
    case FETCH_TRANSACTION_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchTransactionInProgress: false, fetchTransactionError: payload };

    case ACCEPT_SALE_REQUEST:
      return { ...state, acceptInProgress: true, acceptSaleError: null, declineSaleError: null };
    case ACCEPT_SALE_SUCCESS:
      return { ...state, acceptInProgress: false };
    case ACCEPT_SALE_ERROR:
      return { ...state, acceptInProgress: false, acceptSaleError: payload };

    case DECLINE_SALE_REQUEST:
      return { ...state, declineInProgress: true, declineSaleError: null, acceptSaleError: null };
    case DECLINE_SALE_SUCCESS:
      return { ...state, declineInProgress: false };
    case DECLINE_SALE_ERROR:
      return { ...state, declineInProgress: false, declineSaleError: payload };

    case FETCH_MESSAGES_REQUEST:
      return { ...state, fetchMessagesInProgress: true, fetchMessagesError: null };
    case FETCH_MESSAGES_SUCCESS: {
      const oldestMessagePageFetched =
        state.oldestMessagePageFetched > payload.page
          ? state.oldestMessagePageFetched
          : payload.page;
      return {
        ...state,
        fetchMessagesInProgress: false,
        messages: mergeEntityArrays(state.messages, payload.messages),
        totalMessages: payload.totalItems,
        totalMessagePages: payload.totalPages,
        oldestMessagePageFetched,
      };
    }
    case FETCH_MESSAGES_ERROR:
      return { ...state, fetchMessagesInProgress: false, fetchMessagesError: payload };

    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        sendMessageInProgress: true,
        sendMessageError: null,
        initialMessageFailedToTransaction: null,
      };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, sendMessageInProgress: false };
    case SEND_MESSAGE_ERROR:
      return { ...state, sendMessageInProgress: false, sendMessageError: payload };

    case SEND_REVIEW_REQUEST:
      return { ...state, sendReviewInProgress: true, sendReviewError: null };
    case SEND_REVIEW_SUCCESS:
      return { ...state, sendReviewInProgress: false };
    case SEND_REVIEW_ERROR:
      return { ...state, sendReviewInProgress: false, sendReviewError: payload };

    default:
      return state;
  }
}

// ================ Selectors ================ //

export const acceptOrDeclineInProgress = state => {
  return state.TransactionPage.acceptInProgress || state.TransactionPage.declineInProgress;
};

// ================ Action creators ================ //
export const setInitialValues = initialValues => ({
  type: SET_INITAL_VALUES,
  payload: pick(initialValues, Object.keys(initialState)),
});

const fetchTransactionRequest = () => ({ type: FETCH_TRANSACTION_REQUEST });
const fetchTransactionSuccess = response => ({
  type: FETCH_TRANSACTION_SUCCESS,
  payload: response,
});
const fetchTransactionError = e => ({ type: FETCH_TRANSACTION_ERROR, error: true, payload: e });

const acceptSaleRequest = () => ({ type: ACCEPT_SALE_REQUEST });
const acceptSaleSuccess = () => ({ type: ACCEPT_SALE_SUCCESS });
const acceptSaleError = e => ({ type: ACCEPT_SALE_ERROR, error: true, payload: e });

const declineSaleRequest = () => ({ type: DECLINE_SALE_REQUEST });
const declineSaleSuccess = () => ({ type: DECLINE_SALE_SUCCESS });
const declineSaleError = e => ({ type: DECLINE_SALE_ERROR, error: true, payload: e });

const fetchMessagesRequest = () => ({ type: FETCH_MESSAGES_REQUEST });
const fetchMessagesSuccess = (messages, pagination) => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: { messages, ...pagination },
});
const fetchMessagesError = e => ({ type: FETCH_MESSAGES_ERROR, error: true, payload: e });

const sendMessageRequest = () => ({ type: SEND_MESSAGE_REQUEST });
const sendMessageSuccess = () => ({ type: SEND_MESSAGE_SUCCESS });
const sendMessageError = e => ({ type: SEND_MESSAGE_ERROR, error: true, payload: e });

const sendReviewRequest = () => ({ type: SEND_REVIEW_REQUEST });
const sendReviewSuccess = () => ({ type: SEND_REVIEW_SUCCESS });
const sendReviewError = e => ({ type: SEND_REVIEW_ERROR, error: true, payload: e });

// ================ Thunks ================ //

const listingRelationship = txResponse => {
  return txResponse.data.data.relationships.listing.data;
};

export const fetchTransaction = id => (dispatch, getState, sdk) => {
  dispatch(fetchTransactionRequest());
  let txResponse = null;

  return sdk.transactions
    .show(
      {
        id,
        include: [
          'customer',
          'customer.profileImage',
          'customer.profile.protectedData',
          'provider',
          'provider.profileImage',
          'listing',
          'booking',
          'reviews',
          'reviews.author',
          'reviews.subject',
        ],
        ...IMAGE_VARIANTS,
      },
      { expand: true }
    )
    .then(response => {
      txResponse = response;
      const listingId = listingRelationship(response).id;
      const entities = updatedEntities({}, response.data);
      const listingRef = { id: listingId, type: 'listing' };
      const denormalised = denormalisedEntities(entities, [listingRef]);
      const listing = denormalised[0];

      const canFetchListing = listing && listing.attributes && !listing.attributes.deleted;
      if (canFetchListing) {
        return sdk.listings.show({
          id: listingId,
          include: ['author', 'author.profileImage', 'images'],
          ...IMAGE_VARIANTS,
        });
      } else {
        return response;
      }
    })
    .then(listingResponse => {
      const listingId = listingRelationship(txResponse).id;
      const lastTransition = txResponse.data.data.attributes.lastTransition;
      const currentUser = getState().user.currentUser;
      const isCustomer = currentUser && currentUser.id.uuid === txResponse.data.data.relationships.customer.data.id.uuid;
      if ((lastTransition === TRANSITION_ENQUIRE || lastTransition === TRANSITION_ACCEPT) && isCustomer) {
        const booking = txResponse.data.included.find(include => {
          return include.type === 'booking';
        });
        const listing = txResponse.data.included.find(include => {
          return include.type === 'listing';
        });
        const groupSizeMax = listing && listing.attributes.publicData.group_size_max ? listing.attributes.publicData.group_size_max : 1;
        const { price_scheme, seats } = txResponse.data.data.attributes.protectedData;
        const params = {
          bookingEnd: booking.attributes.end,
          bookingStart: booking.attributes.start,
          bookingDisplayStart: booking.attributes.displayStart,
          bookingDisplayEnd: booking.attributes.displayEnd,
          listingId: listingId,
          protectedData: txResponse.data.data.attributes.protectedData,
          quantity: price_scheme === 'group_seats' ? (parseInt(seats / groupSizeMax) + (seats % groupSizeMax !== 0 ? 1 : 0)) : seats,
        };
        const bodyParams = {
          transition: TRANSITION_REQUEST,
          processAlias: config.bookingProcessAlias,
          params: {
            ...params,
            cardToken: 'CheckoutPage_speculative_card_token',
          },
        };
        const queryParams = {
          include: ['booking', 'provider'],
          expand: true,
        };
        return sdk.transactions
          .initiateSpeculative(bodyParams, queryParams)
          .then(response => {
            txResponse.data.data.attributes.lineItems = response.data.data.attributes.lineItems;
            txResponse.data.data.attributes.payinTotal = response.data.data.attributes.payinTotal;
            txResponse.data.data.attributes.payoutTotal = response.data.data.attributes.payoutTotal;

            dispatch(addMarketplaceEntities(txResponse));
            dispatch(addMarketplaceEntities(listingResponse));
            dispatch(fetchTransactionSuccess(txResponse));
            return txResponse;
          })
      } else if ((lastTransition === TRANSITION_ENQUIRE || lastTransition === TRANSITION_ACCEPT) && !isCustomer) {

        const { lineItems, attributes } = createProviderLineItems(listingResponse, txResponse);
        txResponse.data.data.attributes.lineItems = lineItems;
        txResponse.data.data.attributes.payinTotal = attributes.payinTotal;
        txResponse.data.data.attributes.payoutTotal = attributes.payoutTotal;

        dispatch(addMarketplaceEntities(txResponse));
        dispatch(addMarketplaceEntities(listingResponse));
        dispatch(fetchTransactionSuccess(txResponse));
        return listingResponse;
      } else if ((lastTransition === TRANSITION_CANCEL || lastTransition === TRANSITION_DECLINE ||
        lastTransition === TRANSITION_EXPIRE_ENQUIRY ||
        lastTransition === TRANSITION_EXPIRE_ENQUIRY_ACCEPTED ||
        lastTransition === TRANSITION_WITHDRAW)) {
        const { lineItems, attributes } = createRefundLineItems(listingResponse, txResponse);
        txResponse.data.data.attributes.lineItems = lineItems;
        txResponse.data.data.attributes.payinTotal = attributes.payinTotal;
        txResponse.data.data.attributes.payoutTotal = attributes.payoutTotal;

        dispatch(addMarketplaceEntities(txResponse));
        dispatch(addMarketplaceEntities(listingResponse));
        dispatch(fetchTransactionSuccess(txResponse));
        return listingResponse;
      } else {
        dispatch(addMarketplaceEntities(txResponse));
        dispatch(addMarketplaceEntities(listingResponse));
        dispatch(fetchTransactionSuccess(txResponse));
        return listingResponse;
      }
    })
    .catch(e => {
      dispatch(fetchTransactionError(storableError(e)));
      throw e;
    });
};


const sendAcceptedEmailToAdmin = (orderId) => {
  AWS.config.update(credential);
  const content = `A booking has been accepted, please log in to the flex console and see the transaction detail. The transaction detail link can be found here: https://flex-console.sharetribe.com/transactions?id=${orderId.uuid}`;
  const params = createEmailParams('hello@gwexperiences.com', 'A booking has been accepted', content);

  const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  return sendPromise.then(
    function (data) {
      //ok
    }).catch(
    function (err) {
      console.error(err);
    });
}

const sendDeclinedEmailToAdmin = (orderId) => {
  AWS.config.update(credential);
  const content = `A booking has been declined, please log in to the flex console and see the transaction detail. The transaction detail link can be found here: https://flex-console.sharetribe.com/transactions?id=${orderId.uuid}`;
  const params = createEmailParams('hello@gwexperiences.com', 'A booking has been declined', content);

  const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  return sendPromise.then(
    function (data) {
      //ok
    }).catch(
    function (err) {
      console.error(err);
    });
}

export const acceptSale = (id, tx) => (dispatch, getState, sdk) => {
  if (acceptOrDeclineInProgress(getState())) {
    return Promise.reject(new Error('Accept or decline already in progress'));
  }
  dispatch(acceptSaleRequest());

  return sdk.transactions
    .transition({ id, transition: TRANSITION_ACCEPT, params: {} }, { expand: true })
    .then(response => {
      sendAcceptedEmailToAdmin(id);
      let txResponse = response;
      const { lineItems, attributes } = createProviderLineItems({ data: { data: tx.listing } }, { data: { data: tx } });
      txResponse.data.data.attributes.lineItems = lineItems;
      txResponse.data.data.attributes.payinTotal = attributes.payinTotal;
      txResponse.data.data.attributes.payoutTotal = attributes.payoutTotal;
      dispatch(addMarketplaceEntities(txResponse));
      dispatch(acceptSaleSuccess());
      dispatch(fetchCurrentUserNotifications());
      return txResponse;
    })
    .catch(e => {
      dispatch(acceptSaleError(storableError(e)));
      log.error(e, 'accept-sale-failed', {
        txId: id,
        transition: TRANSITION_ACCEPT,
      });
      throw e;
    });
};

export const declineSale = (id, tx) => (dispatch, getState, sdk) => {
  if (acceptOrDeclineInProgress(getState())) {
    return Promise.reject(new Error('Accept or decline already in progress'));
  }
  dispatch(declineSaleRequest());

  return sdk.transactions
    .transition({ id, transition: TRANSITION_DECLINE, params: {} }, { expand: true })
    .then(response => {
      sendDeclinedEmailToAdmin(id);
      let txResponse = response;
      const { lineItems, attributes } = createRefundLineItems({ data: { data: tx.listing } }, { data: { data: tx } });
      txResponse.data.data.attributes.lineItems = lineItems;
      txResponse.data.data.attributes.payinTotal = attributes.payinTotal;
      txResponse.data.data.attributes.payoutTotal = attributes.payoutTotal;
      dispatch(addMarketplaceEntities(response));
      dispatch(declineSaleSuccess());
      dispatch(fetchCurrentUserNotifications());
      return response;
    })
    .catch(e => {
      dispatch(declineSaleError(storableError(e)));
      log.error(e, 'reject-sale-failed', {
        txId: id,
        transition: TRANSITION_DECLINE,
      });
      throw e;
    });
};


export const withdrawBooking = (id, tx) => (dispatch, getState, sdk) => {
  if (acceptOrDeclineInProgress(getState())) {
    return Promise.reject(new Error('Accept or decline already in progress'));
  }
  dispatch(declineSaleRequest());

  return sdk.transactions
    .transition({ id, transition: TRANSITION_WITHDRAW, params: {} }, { expand: true })
    .then(response => {
      sendDeclinedEmailToAdmin(id);
      let txResponse = response;
      const { lineItems, attributes } = createRefundLineItems({ data: { data: tx.listing } }, { data: { data: tx } });
      txResponse.data.data.attributes.lineItems = lineItems;
      txResponse.data.data.attributes.payinTotal = attributes.payinTotal;
      txResponse.data.data.attributes.payoutTotal = attributes.payoutTotal;
      dispatch(addMarketplaceEntities(response));
      dispatch(declineSaleSuccess());
      dispatch(fetchCurrentUserNotifications());
      return response;
    })
    .catch(e => {
      dispatch(declineSaleError(storableError(e)));
      log.error(e, 'reject-sale-failed', {
        txId: id,
        transition: TRANSITION_DECLINE,
      });
      throw e;
    });
};

const sendPaymentEmailToAdmin = (orderId) => {
  AWS.config.update(credential);
  const content = `A booking has been paid, please log in to the flex console and see the transaction detail. The transaction detail link can be found here: https://flex-console.sharetribe.com/transactions?id=${orderId.uuid}`;
  const params = createEmailParams('hello@gwexperiences.com', 'Travel Agent has paid for an activity', content);

  const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  return sendPromise.then(
    function (data) {
      //ok
    }).catch(
    function (err) {
      console.error(err);
    });
}


export const payment = (id, params) => (dispatch, getState, sdk) => {
  if (acceptOrDeclineInProgress(getState())) {
    return Promise.reject(new Error('Accept or decline already in progress'));
  }
  dispatch(declineSaleRequest());
  const bodyParams = {
    ...params
  };

  return sdk.transactions
    .transition({ id, transition: TRANSITION_REQUEST_AFTER_ENQUIRY, params: bodyParams }, { expand: true })
    .then(response => {
      sendPaymentEmailToAdmin(id);
      dispatch(addMarketplaceEntities(response));
      dispatch(declineSaleSuccess());
      dispatch(fetchCurrentUserNotifications());
      return response;
    })
    .catch(e => {
      dispatch(acceptSaleError(storableError(e)));
      log.error(e, 'request-after-enquiry-failed', {
        txId: id,
        transition: TRANSITION_REQUEST_AFTER_ENQUIRY,
      });
      throw e;
    });
};

const fetchMessages = (txId, page) => (dispatch, getState, sdk) => {
  const paging = { page, per_page: MESSAGES_PAGE_SIZE };
  dispatch(fetchMessagesRequest());

  return sdk.messages
    .query({
      transaction_id: txId,
      include: ['sender', 'sender.profileImage'],
      ...IMAGE_VARIANTS,
      ...paging,
    })
    .then(response => {
      const messages = denormalisedResponseEntities(response);
      const { totalItems, totalPages, page: fetchedPage } = response.data.meta;
      const pagination = { totalItems, totalPages, page: fetchedPage };
      const totalMessages = getState().TransactionPage.totalMessages;

      // Original fetchMessages call succeeded
      dispatch(fetchMessagesSuccess(messages, pagination));

      // Check if totalItems has changed between fetched pagination pages
      // if totalItems has changed, fetch first page again to include new incoming messages.
      // TODO if there're more than 100 incoming messages,
      // this should loop through most recent pages instead of fetching just the first one.
      if (totalItems > totalMessages && page > 1) {
        dispatch(fetchMessages(txId, 1))
          .then(() => {
            // Original fetch was enough as a response for user action,
            // this just includes new incoming messages
          })
          .catch(() => {
            // Background update, no need to to do anything atm.
          });
      }
    })
    .catch(e => {
      dispatch(fetchMessagesError(storableError(e)));
      throw e;
    });
};

export const fetchMoreMessages = txId => (dispatch, getState, sdk) => {
  const state = getState();
  const { oldestMessagePageFetched, totalMessagePages } = state.TransactionPage;
  const hasMoreOldMessages = totalMessagePages > oldestMessagePageFetched;

  // In case there're no more old pages left we default to fetching the current cursor position
  const nextPage = hasMoreOldMessages ? oldestMessagePageFetched + 1 : oldestMessagePageFetched;

  return dispatch(fetchMessages(txId, nextPage));
};

export const sendMessage = (txId, message) => (dispatch, getState, sdk) => {
  dispatch(sendMessageRequest());

  return sdk.messages
    .send({ transactionId: txId, content: message })
    .then(response => {
      const messageId = response.data.data.id;

      // We fetch the first page again to add sent message to the page data
      // and update possible incoming messages too.
      // TODO if there're more than 100 incoming messages,
      // this should loop through most recent pages instead of fetching just the first one.
      return dispatch(fetchMessages(txId, 1))
        .then(() => {
          dispatch(sendMessageSuccess());
          return messageId;
        })
        .catch(() => dispatch(sendMessageSuccess()));
    })
    .catch(e => {
      dispatch(sendMessageError(storableError(e)));
      // Rethrow so the page can track whether the sending failed, and
      // keep the message in the form for a retry.
      throw e;
    });
};

const REVIEW_TX_INCLUDES = ['reviews', 'reviews.author', 'reviews.subject'];
const IMAGE_VARIANTS = {
  'fields.image': [
    // Profile images
    'variants.square-small',
    'variants.square-small2x',

    // Listing images:
    'variants.landscape-crop',
    'variants.landscape-crop2x',
  ],
};

// If other party has already sent a review, we need to make transition to
// TRANSITION_REVIEW_2_BY_<CUSTOMER/PROVIDER>
const sendReviewAsSecond = (id, params, role, dispatch, sdk) => {
  const transition =
    role === CUSTOMER ? TRANSITION_REVIEW_2_BY_CUSTOMER : TRANSITION_REVIEW_2_BY_PROVIDER;

  const include = REVIEW_TX_INCLUDES;

  return sdk.transactions
    .transition({ id, transition, params }, { expand: true, include, ...IMAGE_VARIANTS })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(sendReviewSuccess());
      return response;
    })
    .catch(e => {
      dispatch(sendReviewError(storableError(e)));

      // Rethrow so the page can track whether the sending failed, and
      // keep the message in the form for a retry.
      throw e;
    });
};

// If other party has not yet sent a review, we need to make transition to
// TRANSITION_REVIEW_1_BY_<CUSTOMER/PROVIDER>
// However, the other party might have made the review after previous data synch point.
// So, error is likely to happen and then we must try another state transition
// by calling sendReviewAsSecond().
const sendReviewAsFirst = (id, params, role, dispatch, sdk) => {
  const transition =
    role === CUSTOMER ? TRANSITION_REVIEW_1_BY_CUSTOMER : TRANSITION_REVIEW_1_BY_PROVIDER;
  const include = REVIEW_TX_INCLUDES;

  return sdk.transactions
    .transition({ id, transition, params }, { expand: true, include, ...IMAGE_VARIANTS })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(sendReviewSuccess());
      return response;
    })
    .catch(e => {
      // If transaction transition is invalid, lets try another endpoint.
      if (isTransactionsTransitionInvalidTransition(e)) {
        return sendReviewAsSecond(id, params, role, dispatch, sdk);
      } else {
        dispatch(sendReviewError(storableError(e)));

        // Rethrow so the page can track whether the sending failed, and
        // keep the message in the form for a retry.
        throw e;
      }
    });
};

export const sendReview = (role, tx, reviewRating, reviewContent) => (dispatch, getState, sdk) => {
  const params = { reviewRating, reviewContent };

  const txStateOtherPartyFirst =
    role === CUSTOMER
      ? tx.attributes.lastTransition === TRANSITION_REVIEW_1_BY_PROVIDER
      : tx.attributes.lastTransition === TRANSITION_REVIEW_1_BY_CUSTOMER;

  dispatch(sendReviewRequest());

  return txStateOtherPartyFirst
    ? sendReviewAsSecond(tx.id, params, role, dispatch, sdk)
    : sendReviewAsFirst(tx.id, params, role, dispatch, sdk);
};

const isNonEmpty = value => {
  return typeof value === 'object' || Array.isArray(value) ? !isEmpty(value) : !!value;
};

// loadData is a collection of async calls that need to be made
// before page has all the info it needs to render itself
export const loadData = params => (dispatch, getState) => {
  const txId = new UUID(params.id);
  const state = getState().TransactionPage;
  const txRef = state.transactionRef;

  // In case a transaction reference is found from a previous
  // data load -> clear the state. Otherwise keep the non-null
  // and non-empty values which may have been set from a previous page.
  const initialValues = txRef ? {} : pickBy(state, isNonEmpty);
  dispatch(setInitialValues(initialValues));

  // Sale / order (i.e. transaction entity in API)
  return Promise.all([dispatch(fetchTransaction(txId)), dispatch(fetchMessages(txId, 1))]);
};
