package bg.sociolog.controller;

import bg.sociolog.entity.Survey;
import bg.sociolog.entity.User;
import bg.sociolog.entity.Vote;
import bg.sociolog.service.AnswerService;
import bg.sociolog.service.SurveyService;
import bg.sociolog.service.VoteService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/votes")
public class VoteController {

    private final VoteService voteService;
    private final SurveyService surveyService;
    private final AnswerService answerService;
    private final SimpMessagingTemplate messagingTemplate;

    public VoteController(VoteService voteService, SurveyService surveyService, 
                         AnswerService answerService, SimpMessagingTemplate messagingTemplate) {
        this.voteService = voteService;
        this.surveyService = surveyService;
        this.answerService = answerService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/survey/{surveyId}/answer/{answerId}")
    public ResponseEntity<?> vote(@PathVariable Long surveyId,
                                @PathVariable Long answerId,
                                @AuthenticationPrincipal User user) {
        Survey survey = surveyService.getSurveyById(surveyId);
        
        if (voteService.hasUserVoted(user, survey)) {
            return ResponseEntity.badRequest().body("You have already voted for this survey");
        }

        Vote vote = new Vote();
        vote.setUser(user);
        vote.setSurvey(survey);
        voteService.createVote(vote);

        answerService.incrementVoteCount(answerId);

        // Send real-time update
        messagingTemplate.convertAndSend("/topic/survey/" + surveyId + "/votes",
                voteService.getVoteCountForSurvey(survey));

        return ResponseEntity.ok().build();
    }

    @GetMapping("/survey/{surveyId}/count")
    public ResponseEntity<Long> getVoteCount(@PathVariable Long surveyId) {
        Survey survey = surveyService.getSurveyById(surveyId);
        return ResponseEntity.ok(voteService.getVoteCountForSurvey(survey));
    }
} 