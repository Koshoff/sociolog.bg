package bg.sociolog.dto;

import jakarta.validation.constraints.NotBlank;

public class AnswerRequest {
    @NotBlank
    private String answerText;

    // Default constructor
    public AnswerRequest() {
    }

    // All-args constructor
    public AnswerRequest(String answerText) {
        this.answerText = answerText;
    }

    // Getter and Setter
    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }
} 