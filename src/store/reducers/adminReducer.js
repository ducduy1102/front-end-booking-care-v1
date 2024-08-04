import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoading = true;
      // console.log("fire fetch gender start", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoading = false;
      // console.log("fire fetch gender success", state);

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoading = false;
      state.genders = [];
      // console.log("fire fetch gender failed", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_START:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      state.isLoading = false;

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.isLoading = false;
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_START:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      state.isLoading = false;

      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.isLoading = false;
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_START:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.isLoading = false;
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctors;
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.isLoading = false;
      state.topDoctors = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
