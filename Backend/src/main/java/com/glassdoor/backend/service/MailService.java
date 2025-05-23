package com.glassdoor.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    public void sendExamNotification(String to, String jobId) {
        String subject = "You have a new job exam";
        String link = "http://localhost:3000/exam/" + jobId;
        String body = "Dear candidate,\n\nYou have been assigned an exam. Please take it here: " + link + "\n\nGood luck!";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
