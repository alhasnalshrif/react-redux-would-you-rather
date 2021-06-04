import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Question from "./Question";
import Four0Four from "./404";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const QuestionPage = (props) => {
  const { question } = props;

  if (question === null) {
    return <Four0Four />;
  }

  return (
    <Fragment>
      <h2>Would You Rather</h2>

      <Question id={question.id} details={true} />

      <Button as={Link} to="/" animated="fade">
        Back to Home
      </Button>

  
    </Fragment>
  );
};

QuestionPage.propTypes = {
  // from connect
  props: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  // from mapStateToProps
  question: PropTypes.object,
};

function mapStateToProps({ questions }, props) {
  const { id } = props.match.params;
  const question = questions[id];

  return {
    question: question || null,
  };
}

export default connect(mapStateToProps)(QuestionPage);
