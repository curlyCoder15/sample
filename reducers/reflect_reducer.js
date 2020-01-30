import { REHYDRATE } from "redux-persist";
import {
  GET_TRANSACTIONS,
  SET_TRANSACTION,
  RESET_REFLECTED,
  SET_POSNEGNUE,
  SET_NETWORK
} from "../actions/types";

const INITIAL_STATE = {
  network: true,
  totalUnreflected: 0,
  unreflected: [],
  reflected: [],
  data: [],
  positive: [],
  negative: [],
  nuetral: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state, ...INITIAL_STATE };
    }
    case GET_TRANSACTIONS: {
      return {
        ...state,
        data: action.mappedData,
        unreflected: action.unreflected,
        totalUnreflected: action.unreflected.length
      };
    }
    case SET_POSNEGNUE: {
      return {
        ...state,
        positive: action.positive,
        negative: action.negative,
        nuetral: action.nuetral
      };
    }
    case SET_TRANSACTION: {
      return {
        ...state,
        unreflected: action.unreflected,
        reflected: action.reflected,
        data: action.allData
      };
    }
    case RESET_REFLECTED: {
      return {
        ...state,
        reflected: [],
        totalUnreflected: action.total
      };
    }
    case SET_NETWORK: {
      return { ...state, network: action.status };
    }

    default:
      return state;
  }
};
