package bg.sociolog.service;

import bg.sociolog.dto.AnswerResponse;
import bg.sociolog.entity.Answer;
import bg.sociolog.entity.Question;

import java.util.List;
import java.util.Optional;

public interface AnswerService {
    Answer createAnswer(Answer answer);
    Answer updateAnswer(Answer answer);
    void deleteAnswer(Long id);
    Optional<Answer> findById(Long id);
    List<Answer> findByQuestion(Question question);
    List<Answer> findByQuestionOrderById(Question question);
    void incrementVoteCount(Long answerId);
    List<AnswerResponse> getAnswersForQuestion(Question question);
} 