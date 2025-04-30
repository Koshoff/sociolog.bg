import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const SurveyDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const { user } = useAuth();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`/api/surveys/${id}`);
        setSurvey(response.data);
        
        // Initialize selected answers
        const initialAnswers = {};
        response.data.questions.forEach(question => {
          initialAnswers[question.id] = [];
        });
        setSelectedAnswers(initialAnswers);
      } catch (err) {
        setError('Failed to load survey. Please try again later.');
        console.error('Error fetching survey:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();

    // Connect to WebSocket for real-time updates
    const socket = new SockJS('/ws');
    const client = Stomp.over(socket);
    client.connect({}, () => {
      client.subscribe(`/topic/survey/${id}/votes`, (message) => {
        const updatedVoteCount = JSON.parse(message.body);
        setSurvey(prevSurvey => ({
          ...prevSurvey,
          voteCount: updatedVoteCount
        }));
      });
    });

    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, [id]);

  const handleAnswerChange = (questionId, answerId, isMultipleChoice) => {
    setSelectedAnswers(prev => {
      if (isMultipleChoice) {
        // For multiple choice questions
        const currentAnswers = prev[questionId] || [];
        if (currentAnswers.includes(answerId)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter(id => id !== answerId)
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, answerId]
          };
        }
      } else {
        // For single choice questions
        return {
          ...prev,
          [questionId]: [answerId]
        };
      }
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      // Submit each answer
      for (const [questionId, answerIds] of Object.entries(selectedAnswers)) {
        for (const answerId of answerIds) {
          await axios.post(`/api/votes/survey/${id}/answer/${answerId}`);
        }
      }
      
      // Redirect to survey list after successful submission
      history.push('/surveys');
    } catch (err) {
      setError('Failed to submit your answers. Please try again.');
      console.error('Error submitting answers:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        {error}
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="alert alert-warning mt-4" role="alert">
        Survey not found.
      </div>
    );
  }

  return (
    <div className="survey-detail">
      <h2 className="mb-3">{survey.title}</h2>
      <p className="lead mb-4">{survey.description}</p>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">Created by {survey.createdBy.username}</small>
            </div>
            <div>
              <span className="badge badge-primary">{survey.voteCount} votes</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {survey.questions.map((question, index) => (
          <div key={question.id} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Question {index + 1}: {question.questionText}</h5>
              
              <div className="answers mt-3">
                {question.answers.map(answer => (
                  <div key={answer.id} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type={question.questionType === 'MULTIPLE_CHOICE' ? 'checkbox' : 'radio'}
                      name={`question-${question.id}`}
                      id={`answer-${answer.id}`}
                      value={answer.id}
                      checked={selectedAnswers[question.id]?.includes(answer.id) || false}
                      onChange={() => handleAnswerChange(
                        question.id, 
                        answer.id, 
                        question.questionType === 'MULTIPLE_CHOICE'
                      )}
                    />
                    <label className="form-check-label" htmlFor={`answer-${answer.id}`}>
                      {answer.answerText}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

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
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Survey'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyDetail; 