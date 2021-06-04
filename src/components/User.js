import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authedUser";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import PropTypes from "prop-types";

const User = (props) => {
  const handleLogin = (e, id) => {
    e.preventDefault();
    const { dispatch } = props;

    dispatch(loginUser(id));
  };

  const { user, authedUser, isLeaderboard } = props;

  return (
    <Card key={user.id}>
      <Card.Img variant="top" width={171} src={user.avatarURL} />

      <Card.Body>
        <Card.Title>
          {user.name}
          {user.id === authedUser && <span> (You)</span>}
        </Card.Title>

        {isLeaderboard === true && (
          <Card.Body>
            {
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Questions: {user.questions.length}
                </ListGroupItem>
                <ListGroupItem>
                  Answers: {Object.keys(user.answers).length}
                </ListGroupItem>
              </ListGroup>
            }
          </Card.Body>
        )}
      </Card.Body>

      {isLeaderboard === false && (
        <Card.Body extra="true">
          {user.id !== authedUser ? (
            <Button
              primary="true"
              fluid="true"
              onClick={(e) => handleLogin(e, user.id)}
            >
              Login
            </Button>
          ) : (
            <Button primary="true" fluid="true" disabled>
              Logged In
            </Button>
          )}
        </Card.Body>
      )}
    </Card>
  );
};

User.propTypes = {
  // from connect
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  // from mapStateToProps
  user: PropTypes.object.isRequired,
  authedUser: PropTypes.string,
  isLeaderboard: PropTypes.bool.isRequired,
};

function mapStateToProps({ authedUser, users }, { id, isLeaderboard }) {
  const user = users[id];

  return {
    user,
    authedUser,
    isLeaderboard,
  };
}

export default connect(mapStateToProps)(User);
