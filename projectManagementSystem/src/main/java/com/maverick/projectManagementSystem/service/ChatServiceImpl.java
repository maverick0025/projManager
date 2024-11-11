package com.maverick.projectManagementSystem.service;

import com.maverick.projectManagementSystem.model.Chat;
import com.maverick.projectManagementSystem.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ChatServiceImpl implements ChatService{

    @Autowired
    private ChatRepository chatRepository;
    @Override
    public Chat createChat(Chat chat) {

        chatRepository.save(chat);
        return chat;
    }
}
