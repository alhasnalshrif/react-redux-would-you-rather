import React, { Fragment } from "react";
import { connect } from "react-redux";
import User from "./User";
import { CardGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const Login = (props) => {
  const { usersIds } = props;

  return (
    <Fragment>
      <h1>Login Required</h1>
      <h3>Please, select a user to login</h3>
      <p>
        Only logged users can vote, submit new questions or view leaderboards.
      </p>
      <CardGroup>
        {usersIds.map((id) => (
          <User key={id} id={id} isLeaderboard={false} />
        ))}
      </CardGroup>
    </Fragment>
  );
};

Login.propTypes = {
  // from connect
  dispatch: PropTypes.func.isRequired,
  // from mapStateToProps
  usersIds: PropTypes.array.isRequired,
};

function mapStateToProps({ users }) {
  return {
    usersIds: Object.keys(users).sort(
      (a, b) =>
        Object.keys(users[b].answers).length +
        users[b].questions.length -
        (Object.keys(users[a].answers).length + users[a].questions.length)
    ),
  };
}

export default connect(mapStateToProps)(Login);
