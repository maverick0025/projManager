package com.maverick.projectManagementSystem.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvitationRequest {

    private String email;
    private long projectId;
}
