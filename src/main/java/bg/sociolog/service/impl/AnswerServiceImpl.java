package bg.sociolog.service.impl;

import bg.sociolog.dto.AnswerResponse;
import bg.sociolog.entity.Answer;
import bg.sociolog.entity.Question;
import bg.sociolog.repository.AnswerRepository;
import bg.sociolog.service.AnswerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnswerServiceImpl implements AnswerService {

    private static final Logger log = LoggerFactory.getLogger(AnswerServiceImpl.class);

    private final AnswerRepository answerRepository;

    public AnswerServiceImpl(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    @Override
    @Transactional
    public Answer createAnswer(Answer answer) {
        log.info("Creating answer: {}", answer);
        return answerRepository.save(answer);
    }

    @Override
    @Transactional
    public Answer updateAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    @Override
    @Transactional
    public void deleteAnswer(Long id) {
        answerRepository.deleteById(id);
    }

    @Override
    public Optional<Answer> findById(Long id) {
        return answerRepository.findById(id);
    }

    @Override
    public List<Answer> findByQuestion(Question question) {
        log.info("Finding answers for question: {}", question.getId());
        return answerRepository.findByQuestion(question);
    }

    @Override
    public List<Answer> findByQuestionOrderById(Question question) {
        return answerRepository.findByQuestionOrderById(question);
    }

    @Override
    @Transactional
    public void incrementVoteCount(Long answerId) {
        answerRepository.findById(answerId).ifPresent(answer -> {
            answer.setVoteCount(answer.getVoteCount() + 1);
            answerRepository.save(answer);
        });
    }

    @Override
    public List<AnswerResponse> getAnswersForQuestion(Question question) {
        log.info("Getting answer responses for question: {}", question.getId());
        return findByQuestion(question).stream()
                .map(this::mapToAnswerResponse)
                .collect(Collectors.toList());
    }

    private AnswerResponse mapToAnswerResponse(Answer answer) {
        AnswerResponse response = new AnswerResponse();
        response.setId(answer.getId());
        response.setAnswerText(answer.getText());
        response.setVoteCount(answer.getVoteCount());
        return response;
    }
} 