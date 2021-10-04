import { Link, useHistory, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./StartChat.scss";
import { Button, ContactCard, Input, Loader, Back } from "../../components";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { storeConversations } from "../../redux/app/AppActions";

const StartChat = (props) => {
  const { Title, Text } = Typography;
  const {
    users,
    selectedChats,
    newlyCreatedConversation,
    loadingNewlyCreatedConversation
  } = useSelector((state) => state.appReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  const [conversationTitle, setConversationTitle] = useState("");

  const dispatchConversation = () => {
    if (conversationTitle) {
      dispatch(
        storeConversations(
          { user_id: props.match.params.id },
          {
            contact_ids: selectedChats.map((s) => s.id),
            title: conversationTitle
          }
        )
      );
    }
  };

  useEffect(() => {
    if (newlyCreatedConversation && newlyCreatedConversation?.id) {
      history.push(
        `/conversation/${props.match.params.id}/${newlyCreatedConversation.id}}`
      );
    }
  }, [newlyCreatedConversation]);

  return (
    <div className={`section start-chat`}>
      <div className={`title`}>
        <Title level={1}>
          {/* Redirecting back to the page to select contacts or old conversations */}
          <Link to={`/user/${props.match.params.id}`} className={`back-link`}>
            <Back />
          </Link>
          Welcome&nbsp;
          {
            users[
              users.findIndex((user) => user.id == props.match.params.id)
            ].name.split(" ")[0]
          }
          !
        </Title>
        <Text style={{ fontSize: "24px" }}>
          Give title to start new conversation with {selectedChats.length}{" "}
          participants
        </Text>
      </div>
      <div className={`participants`}>
        {selectedChats.map((chat) => (
          <ContactCard
            name={chat.name}
            status={chat.status || ""}
            key={`${chat.id} - ${chat.name}`}
          />
        ))}
      </div>
      <div className={`input-area`}>
        <Input
          width={400}
          placeholder={"Set Conversation Title"}
          onChange={(val) => setConversationTitle(val)}
        />
        <Button
          onClick={dispatchConversation}
          {...(loadingNewlyCreatedConversation
            ? { style: { padding: "0px" } }
            : undefined)}
        >
          {loadingNewlyCreatedConversation ? <Loader /> : "Start Conversation"}
        </Button>
      </div>
    </div>
  );
};

export default withRouter(StartChat);
