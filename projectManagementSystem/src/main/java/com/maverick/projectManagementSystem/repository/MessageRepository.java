package com.maverick.projectManagementSystem.repository;

import com.maverick.projectManagementSystem.model.Chat;
import com.maverick.projectManagementSystem.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

//        List<Message> findByChatOrderByCreatedAtAsc(Long chatId);
        List<Message> findByChatOrderByCreatedAtAsc(Chat chat);

}
