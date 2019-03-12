import { storableError } from '../util/errors';

var AWS = require('aws-sdk');
const ADMIN_EMAIL = "tj@goodwings.com";
const ADMIN_RECEIVER_EMAIL = "hello@gwexperiences.com";

// ================ Action types ================ //

export const EMAIL_REQUEST = 'app/SendingEmail/EMAIL_REQUEST';
export const EMAIL_SUCCESS = 'app/SendingEmail/EMAIL_SUCCESS';
export const EMAIL_ERROR = 'app/SendingEmail/EMAIL_ERROR';

// ================ Reducer ================ //

const initialState = {
  // verification
  sendingEmailError: null,
  sendingInProgress: false,
  emailSent: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case EMAIL_REQUEST:
      return {
        ...state,
        sendingInProgress: true,
        sendingEmailError: null,
      };
    case EMAIL_SUCCESS:
      return { ...state, sendingInProgress: false, emailSent: true };
    case EMAIL_ERROR:
      return { ...state, sendingInProgress: false, sendingEmailError: payload };
    default:
      return state;
  }
}

// ================ Selectors ================ //

export const sendingEmailInProgress = state => {
  return state.SendingEmail.sendingInProgress;
};

// ================ Action creators ================ //

export const sendingEmailRequest = () => ({ type: EMAIL_REQUEST });
export const sendingEmailSuccess = () => ({ type: EMAIL_SUCCESS });
export const sendingEmailError = error => ({
  type: EMAIL_ERROR,
  payload: error,
  error: true,
});

// ================ Actions ================ //

AWS.config.loadFromPath('./config.json');
AWS.config.update({region: 'eu-west-1'});

const createEmailParams = (receiver = ADMIN_RECEIVER_EMAIL, subject, content) => {
  let toAddresses = Array.isArray(receiver) ? receiver : [receiver]
  let body = isTemplated ? null : {
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

// ================ Thunks ================ //

export const sendEmail = (receiver, subject, content) => (dispatch, getState, sdk) => {
  if (sendingEmailInProgress(getState())) {
    return Promise.reject(new Error('Email sending already in progress'));
  }
  dispatch(sendingEmailRequest());

  const params = createEmailParams(receiver, subject, content);

  const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  return sendPromise.then(
    function (data) {
      dispatch(sendingEmailSuccess());
    }).catch(
    function (err) {
      dispatch(sendingEmailError(storableError(err)));
    });
};
