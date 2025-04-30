package bg.sociolog.controller;

import bg.sociolog.dto.QuestionRequest;
import bg.sociolog.entity.Survey;
import bg.sociolog.entity.User;
import bg.sociolog.service.SurveyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {

    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping
    public ResponseEntity<Survey> createSurvey(@RequestBody Survey survey,
                                             @AuthenticationPrincipal User user) {
        survey.setCreatedBy(user);
        return ResponseEntity.ok(surveyService.createSurvey(survey));
    }

    @GetMapping
    public ResponseEntity<List<Survey>> getAllSurveys() {
        return ResponseEntity.ok(surveyService.getAllSurveys());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Survey> getSurveyById(@PathVariable Long id) {
        return ResponseEntity.ok(surveyService.getSurveyById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Survey> updateSurvey(@PathVariable Long id,
                                             @RequestBody Survey survey) {
        survey.setId(id);
        return ResponseEntity.ok(surveyService.updateSurvey(survey));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSurvey(@PathVariable Long id) {
        surveyService.deleteSurvey(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user")
    public ResponseEntity<List<Survey>> getSurveysByUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(surveyService.findByUser(user));
    }
} 