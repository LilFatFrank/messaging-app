import { Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { ContactCard, Loader, Error } from "../../components";
import { getUsers } from "../../redux/app/AppActions";
import "./SelectUser.scss";

const SelectUser = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();

  const { loadingUsers, users } = useSelector((state) => state.appReducer);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className={`section select-user`}>
      <Title level={1}>Let us know who you are</Title>
      <div className={`user-list`}>
        {loadingUsers ? (
          <Loader />
        ) : users?.length ? (
          users.map((user) => (
            <Link to={`/user/${user.id}`}>
              <ContactCard
                name={user.name}
                status={user.status || ""}
                key={`${user.id}-${user.name}`}
              />
            </Link>
          ))
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
};

export default withRouter(SelectUser);
