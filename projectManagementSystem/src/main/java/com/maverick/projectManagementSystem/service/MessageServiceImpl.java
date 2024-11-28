package com.maverick.projectManagementSystem.service;

import com.maverick.projectManagementSystem.model.Chat;
import com.maverick.projectManagementSystem.model.Message;
import com.maverick.projectManagementSystem.model.User;
import com.maverick.projectManagementSystem.repository.MessageRepository;
import com.maverick.projectManagementSystem.repository.UserRepository;
import com.maverick.projectManagementSystem.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService{

    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectService projectService;

    @Override
    public Message sendMessage(Long senderId, Long projectId, String content) throws Exception {

        User sender = userRepository.findById(senderId).orElseThrow(()-> new Exception("User not found"));

        Chat chat = projectService.getProjectById(projectId).getChat();

        Message message = new Message();
        message.setChat(chat);
        message.setSender(sender);
        message.setContent(content);
        message.setCreatedAt(LocalDateTime.now());
        Message savedMessage = messageRepository.save(message);

        chat.getMessages().add(savedMessage);
        return savedMessage;

    }

    @Override
    public List<Message> getMessagesByProjectId(Long projectId) throws Exception {

        Chat chat = projectService.getChatByProjectId(projectId);
//        List<Message> messages = messageRepository.findByChatOrderByCreatedAtAsc(chat.getId());
        List<Message> messages = messageRepository.findByChatOrderByCreatedAtAsc(chat);
        return messages;
    }
}
