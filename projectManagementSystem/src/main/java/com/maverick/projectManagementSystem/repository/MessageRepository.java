package com.maverick.projectManagementSystem.repository;

import com.maverick.projectManagementSystem.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

        List<Message> findByChatOrderByCreatedAtAsc(Long chatId);
}
