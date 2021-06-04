import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../redux/actions/shared";
import PrivateRoute from "./PrivateRoute";
import NavBar from "./Nav";
import Login from "./Login";
import Logout from "./Logout";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import Four0Four from "./404";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Router>
      <Fragment>
        <LoadingBar />
        <NavBar />
        {props.loading === true ? null : (
          <Container>
            <Switch>
              <PrivateRoute path="/" exact component={Dashboard} />
              <PrivateRoute path="/leaderboard" exact component={Leaderboard} />
              <PrivateRoute
                path="/questions/:id"
                exact
                component={QuestionPage}
              />
              <PrivateRoute path="/add" exact component={NewQuestion} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route component={Four0Four} />
            </Switch>
          </Container>
        )}
      </Fragment>
    </Router>
  );
};

App.propTypes = {
  // from connect
  dispatch: PropTypes.func.isRequired,
  // from mapStateToProps
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps({ loadingBar }) {
  return {
    loading: loadingBar.default === 1,
  };
}

export default connect(mapStateToProps)(App);
