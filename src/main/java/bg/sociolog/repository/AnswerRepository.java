package bg.sociolog.repository;

import bg.sociolog.entity.Answer;
import bg.sociolog.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByQuestion(Question question);
    List<Answer> findByQuestionOrderById(Question question);
} 