package com.maverick.projectManagementSystem.request;

import com.maverick.projectManagementSystem.model.User;
import lombok.Data;

@Data
public class MessageCreateRequest {

    private Long senderId;
    private Long projectId;
    private String content;

}
