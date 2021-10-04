import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ContactCard, Button } from "../../../components";
import { storeSelectedChats } from "../../../redux/app/AppActions";
import "../SelectChats.scss";

const Chats = (props) => {
  const { Title, Text } = Typography;
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeSelectedChats(selected));
  }, [selected]);

  const handleSelectChats = (user) => {
    if (selected.findIndex((s) => s.id == user.id) > -1) {
      const filter = [...selected];
      filter.splice(
        filter.findIndex((s) => s.id == user.id),
        1
      );
      setSelected(filter);
    } else {
      setSelected([...selected, user]);
    }
  };
  return (
    <>
      <div className={`title`}>
        <Title level={1}>
          Welcome{" "}
          {
            props.users[
              props.users.findIndex((user) => user.id == props.id)
            ].name.split(" ")[0]
          }
          !
        </Title>
        <Text style={{ fontSize: "24px" }}>
          You don't have any conversations
        </Text>
      </div>
      <Title level={1}>Select conversations to message</Title>
      <div className={`chats-list`}>
        {props.users.map((user) => {
          if (user.id != props.id)
            return (
              <span
                style={{ padding: "5px" }}
                className={`${selected.includes(user) ? "selected" : ""}`}
              >
                <ContactCard
                  name={user.name}
                  status={user.status}
                  key={`${user.id}-${user.name}`}
                  onClick={() => handleSelectChats(user)}
                />
              </span>
            );
        })}
      </div>
      {selected.length ? (
        <Link className={"link"} to={`/startchat/${props.id}`}>
          <Button>Continue</Button>
        </Link>
      ) : null}
    </>
  );
};

export default Chats;
