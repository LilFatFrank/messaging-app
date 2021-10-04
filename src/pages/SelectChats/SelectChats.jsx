import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  storeConversationsSuccess
} from "../../redux/app/AppActions";
import "./SelectChats.scss";
import Chats from "./Chats/Chats";
import { Error, Loader } from "../../components";
import Conversations from "./Conversations/Conversations";

const SelectChats = (props) => {
  const { loadingConversations, conversations, users } = useSelector(
    (state) => state.appReducer
  );
  const dispatch = useDispatch();

  const [showSelectChatsView, setShowSelectChatsView] = useState(false);

  useEffect(() => {
    dispatch(getConversations({ user_id: props.match.params.id }));
    /* clearing the new conversation store below */
    dispatch(storeConversationsSuccess({}));
  }, []);

  return (
    <div className={`section select-chats`}>
      {loadingConversations ? (
        <Loader />
      ) : conversations.error || showSelectChatsView ? (
        <Chats id={props.match.params.id} users={users} />
      ) : conversations.length ? (
        <Conversations
          id={props.match.params.id}
          selectChats={() => setShowSelectChatsView(true)}
        />
      ) : (
        <Error />
      )}
    </div>
  );
};

export default withRouter(SelectChats);
