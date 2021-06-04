import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleAddAnswer } from "../redux/actions/questions";
import { camelize } from "../utils/helpers";
import { Card, Container, Col, Button, Row, Image } from "react-bootstrap";
import PropTypes from "prop-types";

const Question = (props) => {
  const goToQuestionPage = (e, id) => {
    e.preventDefault();
    props.history.push(`/questions/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, question } = props;

    dispatch(handleAddAnswer(question.id, camelize(e.target.textContent)));
  };

  const { question, author, authedUser, details, authedHasAnswered, stats } =
    props;

  return (
    <Card fluid="true" color="teal">
      <Card.Body>
        <Container columns={2}>
          <Col>{question.optionOne.text}</Col>
          <Col>{question.optionTwo.text}</Col>
        </Container>
      </Card.Body>
      {details === false ? (
        <Card.Body>
          <Button
            fluid="true"
            primary="true"
            onClick={(e) => goToQuestionPage(e, question.id)}
          >
            {authedHasAnswered ? <span>Details</span> : <span>Vote</span>}
          </Button>
        </Card.Body>
      ) : (
        <Fragment>
          {authedHasAnswered === null ? (
            <Card.Text>
              <Button color="danger" onClick={handleSubmit}>
                Option One
              </Button>

              <Button color="danger" onClick={handleSubmit}>
                Option Two
              </Button>
            </Card.Text>
          ) : (
            <Card.Body>
              <Card.Title>Well done!</Card.Title>

              <Card.Text>You voted for the {authedHasAnswered}</Card.Text>

              <Row
                className={
                  authedHasAnswered === "Option One"
                    ? "text-success"
                    : ".text-dark"
                }
              >
                <Col xs={4}> voted by {stats.votesOptionOne} users</Col>

                <Col xs={4}>{stats.percentVotesOptionOne}%</Col>
              </Row>

              <Row
                className={
                  authedHasAnswered === "Option One"
                    ? "text-success"
                    : ".text-dark"
                }
              >
                <Col xs={4}> voted by {stats.votesOptionTwo} users</Col>

                <Col xs={4}>{stats.percentVotesOptionTwo}%</Col>
              </Row>
            </Card.Body>
          )}
          <Card.Body>
            <Card.Text>
              <Container>
                <Row>
                  <Col xs={6} md={4}>
                    <Row>
                      <Image
                        style={{ width: 70, height: "auto" }}
                        src={author.avatarURL}
                        width={30}
                        roundedCircle
                        alt={author.name}
                      />
                      Posted by: {author.name}
                      {authedUser === author.id && <span> (You)</span>}
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Card.Text>

            {/* <Feed>
              <Feed.Event>
                <Feed.Label>

                  <img src={author.avatarURL} alt={author.name} />

                </Feed.Label>
                <Feed.Content>
                  <Feed.Meta>

                    Posted by
                    <Feed.User>

                      {author.name}
                      {authedUser === author.id && <span> (You)</span>}

                    </Feed.User>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
            </Feed> */}
          </Card.Body>
        </Fragment>
      )}
    </Card>
  );
};

Question.propTypes = {
  // from connect
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  // from mapStateToProps
  question: PropTypes.object,
  author: PropTypes.object.isRequired,
  details: PropTypes.bool.isRequired,
  authedUser: PropTypes.string.isRequired,
  authedHasAnswered: PropTypes.string,
  stats: PropTypes.object.isRequired,
};

function mapStateToProps({ questions, users, authedUser }, { id, details }) {
  const question = questions[id];

  const checkAuthedHasAnswered = () => {
    if (question.optionOne.votes.includes(authedUser)) return "Option One";
    else if (question.optionTwo.votes.includes(authedUser)) return "Option Two";
    else return null;
  };

  const createStats = () => {
    const votesOptionOne = question.optionOne.votes.length,
      votesOptionTwo = question.optionTwo.votes.length,
      votes = votesOptionOne + votesOptionTwo;
    const percentVotesOptionOne = parseInt((votesOptionOne * 100) / votes, 10),
      percentVotesOptionTwo = 100 - percentVotesOptionOne;
    return {
      votesOptionOne,
      votesOptionTwo,
      percentVotesOptionOne,
      percentVotesOptionTwo,
    };
  };

  return {
    question: question || null,
    author: users[question.author],
    details: details !== undefined,
    authedUser,
    authedHasAnswered: checkAuthedHasAnswered(),
    stats: createStats(),
  };
}

export default withRouter(connect(mapStateToProps)(Question));
