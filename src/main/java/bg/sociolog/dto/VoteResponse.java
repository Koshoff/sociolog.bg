package bg.sociolog.dto;

import java.time.LocalDateTime;

public class VoteResponse {
    private Long id;
    private UserResponse user;
    private LocalDateTime createdAt;

    // Default constructor
    public VoteResponse() {
    }

    // All-args constructor
    public VoteResponse(Long id, UserResponse user, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
} 