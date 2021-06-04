import React from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Tab, Tabs, Toast } from "react-bootstrap";
import PropTypes from "prop-types";

const Dashboard = (props) => {
  const { unansweredQuestionsIds, answeredQuestionsIds } = props;

  const panes = [
    {
      menuItem: "Unanswered",
      render: () => (
        <Tab attached={false}>
          {unansweredQuestionsIds.length === 0 && (
            <Toast
              icon="inbox"
              header="No Questions"
              content="You have answered all the questions"
            />
          )}
          {unansweredQuestionsIds.map((id) => (
            <Question key={id} id={id} />
          ))}
        </Tab>
      ),
    },

    {
      menuItem: "Answered",
      render: () => (
        <Tab attached={false}>
          {answeredQuestionsIds.length === 0 && (
            <Toast
              icon="inbox"
              header="No Questions"
              content="You haven&#39;t answered any question"
            />
          )}
          {answeredQuestionsIds.map((id) => (
            <Question key={id} id={id} />
          ))}
        </Tab>
      ),
    },
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <Tabs menu={{ secondary: true, pointing: true }} panes={panes}>
        <Tab eventKey="answered" title="Answered">
          {answeredQuestionsIds.length === 0 && (
            <Toast
              icon="inbox"
              header="No Questions"
              content="You haven&#39;t answered any question"
            />
          )}
          {answeredQuestionsIds.map((id) => (
            <Question key={id} id={id} />
          ))}
        </Tab>
        <Tab eventKey="unanswered" title="Unanswered">
          {unansweredQuestionsIds.length === 0 && (
            <Toast
              icon="inbox"
              header="No Questions"
              content="You have answered all the questions"
            />
          )}
          {unansweredQuestionsIds.map((id) => (
            <Question key={id} id={id} />
          ))}
        </Tab>
      </Tabs>
    </div>
  );
};

Dashboard.propTypes = {
  // from connect
  dispatch: PropTypes.func.isRequired,
  // from mapStateToProps
  unansweredQuestionsIds: PropTypes.array.isRequired,
  answeredQuestionsIds: PropTypes.array.isRequired,
};

function mapStateToProps({ questions, authedUser }) {
  const unansweredQuestionsIds = Object.keys(questions)
    .filter(
      (i) =>
        !questions[i].optionOne.votes.includes(authedUser) &&
        !questions[i].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const answeredQuestionsIds = Object.keys(questions)
    .filter(
      (i) =>
        questions[i].optionOne.votes.includes(authedUser) ||
        questions[i].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    unansweredQuestionsIds,
    answeredQuestionsIds,
  };
}

export default connect(mapStateToProps)(Dashboard);
