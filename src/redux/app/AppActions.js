import axios from "axios";
import {
  STORE_SELECTED_CHATS,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_CONVERSATIONS_REQUEST,
  GET_CONVERSAIONS_SUCCESS,
  GET_CONVERSATIONS_FAILURE,
  STORE_CONVERSATION_REQUEST,
  STORE_CONVERSATION_SUCCESS,
  STORE_CONVERSATION_FAILURE,
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE
} from "./AppActionTypes";

const BASE_URL = `http://34.122.252.114:3000`;

export const storeSelectedChats = (data) => {
  return {
    type: STORE_SELECTED_CHATS,
    payload: data
  };
};

export const getUsersRequest = () => {
  return {
    type: GET_USERS_REQUEST
  };
};

export const getUsersSuccess = (data) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: data
  };
};

export const getUsersFailure = (error) => {
  return {
    type: GET_USERS_FAILURE,
    payload: error
  };
};

export const getConversationsRequest = () => {
  return {
    type: GET_CONVERSATIONS_REQUEST
  };
};

export const getConversationsSuccess = (data) => {
  return {
    type: GET_CONVERSAIONS_SUCCESS,
    payload: data
  };
};

export const getConversationsFailure = (error) => {
  return {
    type: GET_CONVERSATIONS_FAILURE,
    payload: error
  };
};

export const storeConversationsRequest = () => {
  return {
    type: STORE_CONVERSATION_REQUEST
  };
};

export const storeConversationsSuccess = (data) => {
  return {
    type: STORE_CONVERSATION_SUCCESS,
    payload: data
  };
};

export const storeConversationsFailure = (error) => {
  return {
    type: STORE_CONVERSATION_FAILURE,
    payload: error
  };
};

export const getMessagesRequest = () => {
  return {
    type: GET_MESSAGE_REQUEST
  };
};

export const getMessageSuccess = (data) => {
  return {
    type: GET_MESSAGE_SUCCESS,
    payload: data
  };
};

export const getMessageFailure = (error) => {
  return {
    type: GET_MESSAGE_FAILURE,
    payload: error
  };
};

export const sendMessageRequest = () => {
  return {
    type: SEND_MESSAGE_REQUEST
  };
};

export const sendMessageSuccess = (data) => {
  return {
    type: SEND_MESSAGE_SUCCESS,
    payload: data
  };
};

export const sendMessageFailure = (error) => {
  return {
    type: SEND_MESSAGE_FAILURE,
    payload: error
  };
};

export const getUsers = () => (dispatch) => {
  dispatch(getUsersRequest());
  axios
    .get(`${BASE_URL}/contacts`)
    .then(({ data }) => {
      dispatch(getUsersSuccess(data));
    })
    .catch((e) => dispatch(getUsersFailure({ error: true, errorObject: e })));
};

export const getConversations =
  (headers, id = undefined) =>
  (dispatch) => {
    dispatch(getConversationsRequest());
    axios
      .get(`${BASE_URL}/conversations/${id || ""}`, { headers })
      .then(({ data }) => dispatch(getConversationsSuccess(data)))
      .catch((e) =>
        dispatch(getConversationsFailure({ error: true, errorObject: e }))
      );
  };

export const storeConversations = (headers, params) => (dispatch) => {
  dispatch(storeConversationsRequest());
  axios
    .post(`${BASE_URL}/conversations`, params, { headers })
    .then(({ data }) => {
      if (data.id) {
        dispatch(storeConversationsSuccess(data));
      } else {
        dispatch(storeConversationsFailure(data));
      }
    })
    .catch((e) =>
      dispatch(storeConversationsFailure({ error: true, errorObject: e }))
    );
};

export const getMessages = (headers, id) => (dispatch) => {
  dispatch(getMessagesRequest());
  axios
    .get(`${BASE_URL}/conversations/${id}`, { headers })
    .then(({ data }) => {
      if (data.id) {
        dispatch(getMessageSuccess(data));
      } else {
        dispatch(getMessageFailure(data));
      }
    })
    .catch((e) => dispatch(getMessageFailure({ error: true, errorObject: e })));
};

export const sendMessage = (headers, params) => (dispatch) => {
  dispatch(sendMessageRequest());
  axios
    .post(`${BASE_URL}/conversations/${params.id}/messages`, params, {
      headers
    })
    .then(({ data }) => {
      if (data.id) {
        dispatch(sendMessageSuccess(true));
      } else {
        dispatch(sendMessageFailure(false));
      }
    })
    .catch((e) => dispatch(sendMessageFailure(false)));
};
