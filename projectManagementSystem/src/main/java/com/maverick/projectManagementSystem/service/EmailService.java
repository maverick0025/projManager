package com.maverick.projectManagementSystem.service;

import jakarta.mail.MessagingException;
import org.springframework.mail.MailException;

public interface EmailService {

    void sendEmailWithToken(String userEmail, String projectlink) throws MessagingException;
}
