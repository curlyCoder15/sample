import { AsyncStorage, Linking } from "react-native";

import axios from "axios";
import _ from "lodash";

import {
  URL_LOCAL,
  GET_TRANSACTIONS,
  SET_TRANSACTION,
  RESET_REFLECTED,
  SET_POSNEGNUE,
  SET_NETWORK
} from "./types";
import moment from "moment-timezone";

const ROOT_URL = URL_LOCAL;

export const getTransactions = () => async dispatch => {
  const url = ROOT_URL + "reflections";
  var reflected = [];
  var unreflected = [];
  var mappedData = [];
  try {
    const { data } = await axios.get(url);
    data.transactions.map((item, index) => {
      if (item.reflected_as == null) unreflected.push(item);
      else mappedData.push(item);
    });
    dispatch({ type: GET_TRANSACTIONS, unreflected, mappedData });
    analyseData(data.transactions, dispatch);
  } catch (e) {
    console.log(e);
  }
};

export const resetReflected = unreflected_length => async dispatch => {
  dispatch({
    type: RESET_REFLECTED,
    total: unreflected_length
  });
};

export const setReflection = (
  type,
  id,
  unreflected,
  reflected,
  allData
) => async dispatch => {
  var newUnreflected = _.drop(unreflected);

  const url = ROOT_URL + "reflections/" + id;
  try {
    const { data } = await axios.put(url, { reflected_as: type });
    reflected.push(data);
    allData[id] = data;
    analyseData(allData, dispatch);

    dispatch({
      type: SET_TRANSACTION,
      reflected,
      unreflected: newUnreflected,
      allData
    });
  } catch (e) {
    console.log(e, "error");
  }
};

const analyseData = (data, dispatch) => {
  var positive = [];
  var negative = [];
  var nuetral = [];

  data.map((item, index) => {
    if (item.reflected_as == "POSITIVE") positive.push(item);
    else if (item.reflected_as == "NEGATIVE") negative.push(item);
    else if (item.reflected_as == "NUETRAL") nuetral.push(item);
  });
  dispatch({ type: SET_POSNEGNUE, positive, negative, nuetral });
};

export const setNetwork = status => dispatch => {
  dispatch({ type: SET_NETWORK, status });
};
