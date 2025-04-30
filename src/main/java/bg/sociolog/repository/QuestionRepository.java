package bg.sociolog.repository;

import bg.sociolog.entity.Question;
import bg.sociolog.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findBySurvey(Survey survey);
    List<Question> findBySurveyOrderById(Survey survey);
} 