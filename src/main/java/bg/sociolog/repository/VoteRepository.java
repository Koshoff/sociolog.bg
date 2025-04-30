package bg.sociolog.repository;

import bg.sociolog.entity.Survey;
import bg.sociolog.entity.User;
import bg.sociolog.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserAndSurvey(User user, Survey survey);
    boolean existsByUserAndSurvey(User user, Survey survey);
    long countBySurvey(Survey survey);
} 