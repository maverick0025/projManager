package com.maverick.projectManagementSystem.service;

import com.maverick.projectManagementSystem.model.Invitation;
import jakarta.mail.MessagingException;

public interface InvitationService {

    public void sendInvitation(String email, Long projectId) throws MessagingException;

    public Invitation acceptInvitation(String token, Long userId) throws Exception;

    public String getTokenByUserMail(String userEmail);

    public void deleteToken(String token);
}
