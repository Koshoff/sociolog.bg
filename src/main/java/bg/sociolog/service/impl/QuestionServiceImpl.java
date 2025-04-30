package bg.sociolog.service.impl;

import bg.sociolog.entity.Question;
import bg.sociolog.entity.Survey;
import bg.sociolog.repository.QuestionRepository;
import bg.sociolog.service.QuestionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    @Transactional
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    @Transactional
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    @Transactional
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    @Override
    public Optional<Question> findById(Long id) {
        return questionRepository.findById(id);
    }

    @Override
    public List<Question> findBySurvey(Survey survey) {
        return questionRepository.findBySurvey(survey);
    }

    @Override
    public List<Question> findBySurveyOrderById(Survey survey) {
        return questionRepository.findBySurveyOrderById(survey);
    }
} 