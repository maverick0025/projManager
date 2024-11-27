package com.maverick.projectManagementSystem.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CommentCreateRequest {

    private  Long issueId;
    private String content;
}
