package bg.sociolog.repository;

import bg.sociolog.entity.Survey;
import bg.sociolog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
    List<Survey> findByCreatedBy(User user);
    List<Survey> findAllByOrderByCreatedAtDesc();
} 