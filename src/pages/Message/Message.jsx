import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  ConversationCard,
  Error,
  Loader,
  Input,
  Button,
  Back
} from "../../components";
import { getMessages, sendMessage } from "../../redux/app/AppActions";
import "./Message.scss";

const Message = (props) => {
  const dispatch = useDispatch();

  const { Title } = Typography;
  const {
    loadingMessages,
    messages,
    users,
    loadingSendMessage,
    sendMessageSuccess
  } = useSelector((state) => state.appReducer);

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    allMessages();
  }, []);

  useEffect(() => {
    if (sendMessageSuccess) allMessages();
  }, [sendMessageSuccess]);

  const allMessages = () => {
    dispatch(
      getMessages({ user_id: props.match.params.userId }, props.match.params.id)
    );
  };

  const dispatchMessage = () => {
    dispatch(
      sendMessage(
        { user_id: props.match.params.userId },
        { id: props.match.params.id, content: newMessage }
      )
    );
  };

  return loadingMessages ? (
    <Loader />
  ) : Object.keys(messages).length ? (
    <div className={`message`}>
      <Title level={1} className={`title`}>
        {/* Redirecting back to the page to select contacts or old conversations */}
        <Link to={`/user/${props.match.params.userId}`} className={`back-link`}>
          <Back />
        </Link>
        {messages.title}
      </Title>
      <div className={`list`}>
        {/* sorting the show the most recent message at the bottom */}
        {messages?.recent_messages
          ?.sort((a, b) => a.id - b.id)
          .map((message) => (
            <ConversationCard
              message={message.content}
              senderName={
                message.sender_id === props.match.params.id
                  ? "You"
                  : message.sender_name
              }
              key={`${message.id}`}
            />
          ))}
      </div>
      <div className={`input-area`}>
        <Input width={400} onChange={(val) => setNewMessage(val)} />
        <Button
          onClick={dispatchMessage}
          disabled={newMessage === ""}
          {...(loadingSendMessage ? { style: { padding: "0px" } } : undefined)}
        >
          {loadingSendMessage ? <Loader /> : "Send Message"}
        </Button>
      </div>
    </div>
  ) : (
    <Error />
  );
};

export default withRouter(Message);
