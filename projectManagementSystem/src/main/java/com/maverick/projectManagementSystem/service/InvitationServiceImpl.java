package com.maverick.projectManagementSystem.service;

import com.maverick.projectManagementSystem.model.Invitation;
import com.maverick.projectManagementSystem.repository.InvitationRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitationServiceImpl implements InvitationService{

    @Autowired
    private InvitationRepository invitationRepository;
    @Autowired
    private EmailService emailService;

    @Override
    public void sendInvitation(String email, Long projectId) throws MessagingException {

        String invitationToken = UUID.randomUUID().toString();
        Invitation invite = new Invitation();
        invite.setEmail(email);
        invite.setToken(invitationToken);
        invite.setProjectId(projectId);
        invitationRepository.save(invite);

        String invitationLink = "http://localhost:5173/accept_invitation?token=" + invitationToken;

        emailService.sendEmailWithToken(email, invitationLink);
    }

    @Override
    public Invitation acceptInvitation(String token, Long userId) throws Exception {

        Invitation invitation = invitationRepository.findByToken(token);
        if(invitation == null){
            throw new Exception("Invalid Invitation token");
        }

        return invitation;
    }

    @Override
    public String getTokenByUserMail(String userEmail) {

        Invitation inv = invitationRepository.findByEmail(userEmail);
        return inv.getToken();
    }

    @Override
    public void deleteToken(String token) {

        Invitation inv = invitationRepository.findByToken(token);
        invitationRepository.delete(inv);
    }
}
