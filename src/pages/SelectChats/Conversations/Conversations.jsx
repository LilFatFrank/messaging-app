import { Typography } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ConversationCard, Button, Back } from "../../../components";
import "../SelectChats.scss";

const Conversations = (props) => {
  const { Title } = Typography;
  const { conversations } = useSelector((state) => state.appReducer);

  return (
    <>
      <div className={`title`}>
        {/* Redirecting back to choose user page */}
        <Link to={`/`} className={`back-link`}>
          <Back />
        </Link>
        <Title level={1}>Your conversations</Title>
      </div>
      <div className={`chats-list conversation`}>
        {/* sorting the show the most recent conversation at the top */}
        {conversations
          .sort((a, b) => b.id - a.id)
          .map((conversation) => (
            <Link
              to={`/conversation/${props.id}/${conversation.id}`}
              key={`${conversation.id} - ${conversation.title}`}
            >
              <ConversationCard
                title={conversation.title}
                senderName={
                  conversation["last_message"][0]?.sender_id === props.id
                    ? "You"
                    : conversation["last_message"][0]?.sender_name
                }
                message={conversation["last_message"][0]?.content}
              />
            </Link>
          ))}
      </div>
      <Button className={`link`} onClick={props.selectChats}>
        Create New Conversation
      </Button>
    </>
  );
};

export default Conversations;
