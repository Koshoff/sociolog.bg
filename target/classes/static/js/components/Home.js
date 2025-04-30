import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredSurveys, setFeaturedSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedSurveys = async () => {
      try {
        const response = await axios.get('/api/surveys');
        setFeaturedSurveys(response.data.slice(0, 3)); // Get first 3 surveys
      } catch (error) {
        console.error('Error fetching featured surveys:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSurveys();
  }, []);

  return (
    <div className="home">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to Sociolog.bg</h1>
        <p className="lead">
          Create and participate in sociological surveys. Share your opinion and discover what others think.
        </p>
        <hr className="my-4" />
        <p>Join our community and start creating surveys today!</p>
        <Link className="btn btn-primary btn-lg" to="/register" role="button">
          Get Started
        </Link>
      </div>

      <div className="featured-surveys mt-5">
        <h2>Featured Surveys</h2>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {featuredSurveys.map(survey => (
              <div key={survey.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{survey.title}</h5>
                    <p className="card-text">{survey.description}</p>
                    <Link to={`/survey/${survey.id}`} className="btn btn-primary">
                      Take Survey
                    </Link>
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
    </div>
  );
};

export default Home; 