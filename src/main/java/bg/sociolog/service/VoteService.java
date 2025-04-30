package bg.sociolog.service;

import bg.sociolog.entity.Survey;
import bg.sociolog.entity.User;
import bg.sociolog.entity.Vote;

import java.util.Optional;

public interface VoteService {
    Vote createVote(Vote vote);
    Optional<Vote> findByUserAndSurvey(User user, Survey survey);
    boolean hasUserVoted(User user, Survey survey);
    long getVoteCountForSurvey(Survey survey);
} 