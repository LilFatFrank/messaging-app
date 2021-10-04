import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./ContactCard.scss";

const ContactCard = ({ name, status, onClick }) => {
  const { Text } = Typography;

  return (
    <div className={`card`} onClick={onClick}>
      <Avatar size={64} icon={<UserOutlined />} className={`avatar`} />
      <div className={`details`}>
        <Text strong>{name}</Text>
        <Text>{status}</Text>
      </div>
    </div>
  );
};

export default ContactCard;
