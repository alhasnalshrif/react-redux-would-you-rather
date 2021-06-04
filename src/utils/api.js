import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './_DATA';

export async function getInitialData()    {
	const [users, questions] = await Promise.all([
		_getUsers(),
		_getQuestions()
	]);
	return ({
		users,
		questions
	});
}

export function saveQuestion(data)  {
	return _saveQuestion(data);
}

export function saveQuestionAnswer(data)    {
	return _saveQuestionAnswer(data);
}

