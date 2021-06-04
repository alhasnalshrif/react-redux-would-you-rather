import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import PropTypes from "prop-types";

const NavBar = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        Would You Rather?
      </Navbar.Brand>

      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/" exact activeClassName="active">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/leaderboard" activeClassName="active">
          Leaderboard
        </Nav.Link>
        <Nav.Link as={NavLink} to="/add" activeClassName="active">
          Add Question
        </Nav.Link>
      </Nav>
      <Nav>
        {props.authedUser !== null && (
          <Fragment>
            <Nav.Link>
              <Fragment>
                <Image
                  roundedCircle
                  src={props.authedUser.avatarURL}
                  width={30}
                  className="mr-sm-2"
                />
                <span>{props.authedUser.name}</span>
              </Fragment>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/logout" activeClassName="active">
              {/* <Icon name='sign out' /> */}
              Logout
            </Nav.Link>
          </Fragment>
        )}
      </Nav>
    </Navbar>
  );
};

NavBar.propTypes = {
  // from connect
  dispatch: PropTypes.func.isRequired,
  // from mapStateToProps
  authedUser: PropTypes.object,
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser:
      authedUser === null
        ? null
        : {
            ...users[authedUser],
          },
  };
}

export default withRouter(connect(mapStateToProps)(NavBar));
