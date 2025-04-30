import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('/api/surveys');
        setSurveys(response.data);
      } catch (err) {
        setError('Failed to load surveys. Please try again later.');
        console.error('Error fetching surveys:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

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

  return (
    <div className="survey-list">
      <h2 className="mb-4">Available Surveys</h2>
      {surveys.length === 0 ? (
        <div className="alert alert-info">
          No surveys available at the moment.
        </div>
      ) : (
        <div className="row">
          {surveys.map(survey => (
            <div key={survey.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{survey.title}</h5>
                  <p className="card-text">{survey.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/survey/${survey.id}`} className="btn btn-primary">
                      Take Survey
                    </Link>
                    <small className="text-muted">
                      {survey.voteCount} votes
                    </small>
                  </div>
                </div>
                <div className="card-footer text-muted">
                  Created by {survey.createdBy.username}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyList;

 