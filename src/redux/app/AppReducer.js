import { sendMessageSuccess } from "./AppActions";
import {
  GET_CONVERSAIONS_SUCCESS,
  GET_CONVERSATIONS_FAILURE,
  GET_CONVERSATIONS_REQUEST,
  GET_MESSAGE_FAILURE,
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  STORE_CONVERSATION_FAILURE,
  STORE_CONVERSATION_REQUEST,
  STORE_CONVERSATION_SUCCESS,
  STORE_SELECTED_CHATS
} from "./AppActionTypes";

const initialState = {
  loadingUsers: false,
  users: [],
  loadingConversations: false,
  conversations: [],
  selectedChats: [],
  loadingNewlyCreatedConversation: false,
  newlyCreatedConversation: {},
  loadingMessages: false,
  messages: {},
  loadingSendMessage: false,
  sendMessageSuccess: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_SELECTED_CHATS:
      return {
        ...state,
        selectedChats: action.payload
      };
    case GET_USERS_REQUEST:
      return {
        ...state,
        loadingUsers: true,
        users: []
      };
    case GET_USERS_SUCCESS:
    case GET_USERS_FAILURE:
      return {
        ...state,
        loadingUsers: false,
        users: action.payload
      };
    case GET_CONVERSATIONS_REQUEST:
      return {
        ...state,
        loadingConversations: true,
        conversations: []
      };
    case GET_CONVERSAIONS_SUCCESS:
    case GET_CONVERSATIONS_FAILURE:
      return {
        ...state,
        loadingConversations: false,
        conversations: action.payload
      };
    case STORE_CONVERSATION_REQUEST:
      return {
        ...state,
        loadingNewlyCreatedConversation: true,
        newlyCreatedConversation: {}
      };
    case STORE_CONVERSATION_SUCCESS:
    case STORE_CONVERSATION_FAILURE:
      return {
        ...state,
        loadingNewlyCreatedConversation: false,
        newlyCreatedConversation: action.payload
      };
    case GET_MESSAGE_REQUEST:
      return {
        ...state,
        loadingMessages: true,
        messages: {}
      };
    case GET_MESSAGE_SUCCESS:
    case GET_MESSAGE_FAILURE:
      return {
        ...state,
        loadingMessages: false,
        messages: action.payload
      };
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        loadingSendMessage: true,
        sendMessageSuccess: false
      };
    case SEND_MESSAGE_SUCCESS:
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        loadingSendMessage: false,
        sendMessageSuccess: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;
