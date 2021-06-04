import { saveQuestion, saveQuestionAnswer } from "../../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { ADD_QUESTION, ADD_QUESTION_ANSWER, RECEIVE_QUESTIONS } from "../types";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function handleAddQuestion(params) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    const { optionOneText, optionTwoText } = params;

    dispatch(showLoading());

    const question = await saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText,
    });
    dispatch(addQuestion(question));
    return dispatch(hideLoading());
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddAnswer(qid, answer) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    const info = { qid, answer, authedUser };

    dispatch(addQuestionAnswer(info));

    try {
      return saveQuestionAnswer(info);
    } catch (e) {
      console.warn("Error", e);
      dispatch(addQuestionAnswer(info));
      alert("There was an error linking the tweet. Try again.");
    }
  };
}

export function addQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}
