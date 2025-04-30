package bg.sociolog.service;

import bg.sociolog.entity.Survey;
import bg.sociolog.entity.User;

import java.util.List;
import java.util.Optional;

public interface SurveyService {
    Survey createSurvey(Survey survey);
    List<Survey> getAllSurveys();
    Survey getSurveyById(Long id);
    Survey updateSurvey(Survey survey);
    void deleteSurvey(Long id);
    Optional<Survey> findById(Long id);
    List<Survey> findAll();
    List<Survey> findByUser(User user);
    List<Survey> findAllByOrderByCreatedAtDesc();
} 