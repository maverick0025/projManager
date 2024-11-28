package com.maverick.projectManagementSystem.controller;

import com.maverick.projectManagementSystem.model.Chat;
import com.maverick.projectManagementSystem.model.Message;
import com.maverick.projectManagementSystem.model.User;
import com.maverick.projectManagementSystem.request.MessageCreateRequest;
import com.maverick.projectManagementSystem.service.MessageService;
import com.maverick.projectManagementSystem.service.ProjectService;
import com.maverick.projectManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private UserService userService;
    @Autowired
    private ProjectService projectService;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody MessageCreateRequest request) throws Exception{

        User user = userService.findUserById(request.getSenderId());

//        Chat chat = projectService.getChatByProjectId(request.getProjectId());
        Chat chat = projectService.getProjectById(request.getProjectId()).getChat();
        if(chat == null){
            throw new Exception("Chats not found for this project");
        }
        Message sentMessage = messageService.sendMessage(request.getSenderId(),
                request.getProjectId(), request.getContent());
        return ResponseEntity.ok(sentMessage);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByProjectId(@PathVariable Long projectId) throws Exception{

        List<Message> messages = messageService.getMessagesByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }

}
