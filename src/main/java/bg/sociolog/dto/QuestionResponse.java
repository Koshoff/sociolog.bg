package bg.sociolog.dto;

import bg.sociolog.entity.Question.QuestionType;
import bg.sociolog.dto.AnswerResponse;
import java.util.List;

public class QuestionResponse {
    private Long id;
    private String questionText;
    private QuestionType questionType;
    private List<AnswerResponse> answers;

    // Default constructor
    public QuestionResponse() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public QuestionType getQuestionType() {
        return questionType;
    }

    public void setQuestionType(QuestionType questionType) {
        this.questionType = questionType;
    }

    public List<AnswerResponse> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerResponse> answers) {
        this.answers = answers;
    }
} 