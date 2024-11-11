package com.maverick.projectManagementSystem.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private JavaMailSender javaMailSender;
    @Override
    public void sendEmailWithToken(String userEmail, String projectLink) throws MessagingException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String subject = "Project Invitation";
        String body = "Click the link: "+ projectLink +" to join the project";

        helper.setSubject(subject);
        helper.setText(body);
        helper.setTo(userEmail);

        try{
            javaMailSender.send(mimeMessage);
        }catch (MailSendException e){
            throw new MailSendException("Failed to send mail");
        }
    }
}
