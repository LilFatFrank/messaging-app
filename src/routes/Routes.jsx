import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Message, SelectChats, SelectUser, StartChat } from "../pages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={SelectUser} />
        <Route exact path={"/user/:id"} component={SelectChats} />
        <Route exact path={"/startchat/:id"} component={StartChat} />
        <Route exact path={"/conversation/:userId/:id"} component={Message} />
      </Switch>
    </Router>
  );
};

export default Routes;
