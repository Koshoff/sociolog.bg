import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const CreateSurvey = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', questionType: 'SINGLE_CHOICE', answers: [{ answerText: '' }] }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].answerText = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', questionType: 'SINGLE_CHOICE', answers: [{ answerText: '' }] }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    }
  };

  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push({ answerText: '' });
    setQuestions(updatedQuestions);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].answers.length > 1) {
      updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError('Survey title is required');
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.questionText.trim()) {
        setError(`Question ${i + 1} text is required`);
        return false;
      }

      for (let j = 0; j < question.answers.length; j++) {
        if (!question.answers[j].answerText.trim()) {
          setError(`Answer ${j + 1} for question ${i + 1} is required`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/surveys', {
        title,
        description,
        questions
      });

      history.push('/surveys');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create survey. Please try again.');
      console.error('Error creating survey:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-survey">
      <h2 className="mb-4">Create New Survey</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Survey Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="questions-section">
          <h3 className="mb-3">Questions</h3>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title">Question {questionIndex + 1}</h5>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeQuestion(questionIndex)}
                    disabled={questions.length === 1}
                  >
                    Remove Question
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor={`question-${questionIndex}`}>Question Text</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`question-${questionIndex}`}
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`question-type-${questionIndex}`}>Question Type</label>
                  <select
                    className="form-control"
                    id={`question-type-${questionIndex}`}
                    value={question.questionType}
                    onChange={(e) => handleQuestionChange(questionIndex, 'questionType', e.target.value)}
                  >
                    <option value="SINGLE_CHOICE">Single Choice</option>
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                  </select>
                </div>

                <div className="answers-section">
                  <h6 className="mb-3">Answers</h6>
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Answer ${answerIndex + 1}`}
                        value={answer.answerText}
                        onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                        required
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeAnswer(questionIndex, answerIndex)}
                          disabled={question.answers.length === 1}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => addAnswer(questionIndex)}
                  >
                    Add Answer
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline-primary mb-4"
            onClick={addQuestion}
          >
            Add Question
          </button>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push('/surveys')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Survey'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSurvey; 