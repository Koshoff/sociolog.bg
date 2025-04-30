package bg.sociolog.service;

import bg.sociolog.entity.Question;
import bg.sociolog.entity.Survey;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
    Question createQuestion(Question question);
    Question updateQuestion(Question question);
    void deleteQuestion(Long id);
    Optional<Question> findById(Long id);
    List<Question> findBySurvey(Survey survey);
    List<Question> findBySurveyOrderById(Survey survey);
} 