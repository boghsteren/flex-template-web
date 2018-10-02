import { types as sdkTypes } from "../../util/sdkLoader";
import { promotedExperiences } from "./LandingPageConfig";

const { UUID } = sdkTypes;

// ================ Action types ================ //

export const SET_INITIAL_STATE = "app/LandingPage/SET_INITIAL_STATE";

export const QUERY_LISTINGS_REQUEST = "app/LandingPage/QUERY_LISTINGS_REQUEST";
export const QUERY_LISTINGS_SUCCESS = "app/LandingPage/QUERY_LISTINGS_SUCCESS";
export const QUERY_LISTINGS_ERROR = "app/LandingPage/QUERY_LISTINGS_ERROR";

// ================ Reducer ================ //

const initialState = {
  queryListingsError: null,
  listings: []
};

export default function landingPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_STATE:
      return { ...initialState };
    case QUERY_LISTINGS_REQUEST:
      return {
        ...state,
        // Empty listings
        listings: [],
        queryListingsError: null
      };
    case QUERY_LISTINGS_SUCCESS:
      return {
        ...state,
        listings: [
          ...state.listings,
          {
            attributes: payload.data.attributes,
            id: payload.data.id,
            authorID: payload.data.relationships.author.data.id.uuid,
            author: payload.included.find(
              item =>
                item.id.uuid === payload.data.relationships.author.data.id.uuid
            ),
            type: payload.data.type,
            images: payload.included.filter(
              item =>
                item.id.uuid !== payload.data.relationships.author.data.id.uuid
            )
          }
        ]
      };
    case QUERY_LISTINGS_ERROR:
      return { ...state, listings: [], queryListingsError: payload };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const setInitialState = () => ({
  type: SET_INITIAL_STATE
});

export const queryListingsRequest = () => ({
  type: QUERY_LISTINGS_REQUEST
});

export const queryListingsSuccess = listings => ({
  type: QUERY_LISTINGS_SUCCESS,
  payload: listings
});

export const queryListingsError = e => ({
  type: QUERY_LISTINGS_ERROR,
  error: true,
  payload: e
});

// ================ Thunks ================ //

export const queryListings = listingIds => (dispatch, getState, sdk) => {
  dispatch(queryListingsRequest());
  listingIds.map(listingId => {
    const listingUUID = new UUID(listingId);
    sdk.listings
      .show({ id: listingUUID, include: "author,images", 'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
      'limit.images': 1, })
      .then(response => dispatch(queryListingsSuccess(response.data)));
    return "ok";
  });
};

export const loadData = userId => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialState());

  return Promise.all([dispatch(queryListings(promotedExperiences))]);
};
