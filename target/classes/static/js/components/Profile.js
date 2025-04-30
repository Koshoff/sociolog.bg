import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [userSurveys, setUserSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSurveys = async () => {
      try {
        const response = await axios.get(`/api/surveys/user/${user.id}`);
        setUserSurveys(response.data);
      } catch (err) {
        setError('Failed to load your surveys. Please try again later.');
        console.error('Error fetching user surveys:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSurveys();
  }, [user.id]);

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
    <div className="profile">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Profile</h2>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="col-md-6 text-md-right">
              <Link to="/create-survey" className="btn btn-primary">
                Create New Survey
              </Link>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mb-3">Your Surveys</h3>
      {userSurveys.length === 0 ? (
        <div className="alert alert-info">
          You haven't created any surveys yet.
        </div>
      ) : (
        <div className="row">
          {userSurveys.map(survey => (
            <div key={survey.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{survey.title}</h5>
                  <p className="card-text">{survey.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/survey/${survey.id}`} className="btn btn-primary">
                      View Survey
                    </Link>
                    <span className="badge badge-primary">{survey.voteCount} votes</span>
                  </div>
                </div>
                <div className="card-footer text-muted">
                  Created on {new Date(survey.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile; 