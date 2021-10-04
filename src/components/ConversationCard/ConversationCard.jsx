import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import "./ConversationCard.scss";

const ConversationCard = ({ title, senderName, message, onClick }) => {
  const { Text, Title } = Typography;

  return (
    <div className={`card`} onClick={onClick}>
      <Avatar size={64} icon={<UserOutlined />} className={`avatar`} />
      <div className={`details conversation`}>
        {title ? <Title level={4}>{title}</Title> : null}
        <Text strong>{senderName}</Text>
        <Text>{message}</Text>
      </div>
    </div>
  );
};

export default ConversationCard;
