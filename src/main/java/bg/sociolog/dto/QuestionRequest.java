package bg.sociolog.dto;

import bg.sociolog.entity.Question.QuestionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class QuestionRequest {
    @NotBlank
    private String questionText;

    @NotNull
    private QuestionType questionType;

    private List<AnswerRequest> answers;

    // Default constructor
    public QuestionRequest() {
    }

    // All-args constructor
    public QuestionRequest(String questionText, QuestionType questionType, List<AnswerRequest> answers) {
        this.questionText = questionText;
        this.questionType = questionType;
        this.answers = answers;
    }

    // Getters and Setters
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

    public List<AnswerRequest> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerRequest> answers) {
        this.answers = answers;
    }
} 