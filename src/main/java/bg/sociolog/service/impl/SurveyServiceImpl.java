package bg.sociolog.service.impl;

import bg.sociolog.entity.Survey;
import bg.sociolog.entity.User;
import bg.sociolog.repository.SurveyRepository;
import bg.sociolog.service.SurveyService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyServiceImpl implements SurveyService {

    private final SurveyRepository surveyRepository;

    public SurveyServiceImpl(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    @Override
    @Transactional
    public Survey createSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Survey getSurveyById(Long id) {
        return surveyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Survey not found with id: " + id));
    }

    @Override
    @Transactional
    public Survey updateSurvey(Survey survey) {
        if (!surveyRepository.existsById(survey.getId())) {
            throw new RuntimeException("Survey not found with id: " + survey.getId());
        }
        return surveyRepository.save(survey);
    }

    @Override
    @Transactional
    public void deleteSurvey(Long id) {
        if (!surveyRepository.existsById(id)) {
            throw new RuntimeException("Survey not found with id: " + id);
        }
        surveyRepository.deleteById(id);
    }

    @Override
    public Optional<Survey> findById(Long id) {
        return surveyRepository.findById(id);
    }

    @Override
    public List<Survey> findAll() {
        return surveyRepository.findAll();
    }

    @Override
    public List<Survey> findByUser(User user) {
        return surveyRepository.findByCreatedBy(user);
    }

    @Override
    public List<Survey> findAllByOrderByCreatedAtDesc() {
        return surveyRepository.findAllByOrderByCreatedAtDesc();
    }
} 