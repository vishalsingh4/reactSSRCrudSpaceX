import "isomorphic-fetch";

// Actions
const FETCH_LAUNCH_REQUEST = "FETCH_LAUNCH_REQUEST"; 
const FETCH_LAUNCH_SUCCESS = "FETCH_LAUNCH_SUCCESS";
const FETCH_LAUNCH_FAILURE = "FETCH_LAUNCH_FAILURE";

// Reducer
export default function reducer(state = {loading: false}, action) {
  switch (action.type) {

    case FETCH_LAUNCH_SUCCESS:
      return { ...state, launches: action.payload, loading: false};

    case FETCH_LAUNCH_REQUEST:
      return { ...state, loading: true};

    case FETCH_LAUNCH_FAILURE:
      return { ...state, loading: false};
    
    default:
      return state;
  }
}

// Action Creators
const requestLaunches = () => ({type: FETCH_LAUNCH_REQUEST});
const receivedLaunches = launches => ({type: FETCH_LAUNCH_SUCCESS, payload: launches});
const launchError = () => ({type: FETCH_LAUNCH_FAILURE});

// FETCH MISSILE LAUNCHES API
export const fetchLaunches = searchQuery => (dispatch, getState) => {
  dispatch(requestLaunches());
  return fetch(`http://localhost:3000/api/launches${searchQuery}`)
      .then(response => response.json())
      .then(launches => dispatch(receivedLaunches(launches)))
      .catch(err => dispatch(launchError(err)));
};
