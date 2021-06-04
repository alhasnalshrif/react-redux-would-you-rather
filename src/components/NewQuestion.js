import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../redux/actions/questions";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const NewQuestion = (props) => {
  const [state, setState] = useState({
    optionOneText: "",
    optionTwoText: "",
  });

  const handleChanges = (event, optionIndex) => {
    const text = event.target.value;

    setState(function (previousState) {
      return optionIndex === 1
        ? { ...previousState, optionOneText: text }
        : { ...previousState, optionTwoText: text };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = state;
    const { dispatch } = props;

    dispatch(handleAddQuestion({ optionOneText, optionTwoText }));

    setState({
      optionOneText: "",
      optionTwoText: "",
    });

    props.history.push(`/`);
  };

  const { optionOneText, optionTwoText } = state;

  return (
    <Fragment>
      <h2>Would You Rather</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Option One</Form.Label>
          <Form.Control
            label="Option One"
            name="optionOneText"
            value={optionOneText}
            onChange={(event) => handleChanges(event, 1)}
            placeholder="Add the Option One"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Option Two</Form.Label>

          <Form.Control
            label="Option Two"
            name="optionTwoText"
            value={optionTwoText}
            placeholder="Add the Option Two"
            onChange={(event) => handleChanges(event, 2)}
          />
        </Form.Group>

        <Button
          variant="primary"
          disabled={optionOneText === "" || optionTwoText === ""}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

NewQuestion.propTypes = {
  // from connect
  dispatch: PropTypes.func.isRequired,
  // from mapStateToProps
  authedUser: PropTypes.string.isRequired,
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
