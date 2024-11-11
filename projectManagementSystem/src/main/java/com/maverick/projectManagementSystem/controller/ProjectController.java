package com.maverick.projectManagementSystem.controller;

import com.maverick.projectManagementSystem.model.Chat;
import com.maverick.projectManagementSystem.model.Invitation;
import com.maverick.projectManagementSystem.model.Project;
import com.maverick.projectManagementSystem.model.User;
import com.maverick.projectManagementSystem.repository.InvitationRepository;
import com.maverick.projectManagementSystem.request.InvitationRequest;
import com.maverick.projectManagementSystem.response.MessageResponse;
import com.maverick.projectManagementSystem.service.InvitationService;
import com.maverick.projectManagementSystem.service.ProjectService;
import com.maverick.projectManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private InvitationService invitationService;

    @GetMapping
    public ResponseEntity<List<Project>> fetchProjects(
            @RequestParam(required = false) String category,
            @RequestParam(required =  false) String tag,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        List<Project> projs = projectService.getProjectByTeam(user, category, tag);

        return new ResponseEntity<>(projs, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> fetchProjectById(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        userService.findUserProfileByJwt(jwt);
        Project proj = projectService.getProjectById(projectId);

        return new ResponseEntity<>(proj, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Project project
    ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Project newProj = projectService.createProject(project, user);
        return new ResponseEntity<>(newProj, HttpStatus.OK);
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(
            @RequestHeader("Authorization") String jwt,
            @RequestParam Long projectId,
            @RequestBody Project project
    ) throws Exception {

        userService.findUserProfileByJwt(jwt);
        Project updateProject = projectService.updateProject(project, projectId);
        return new ResponseEntity<>(updateProject, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<MessageResponse> deleteProject(
            @RequestHeader("Authorization") String jwt,
            @RequestParam Long projectId
    ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        projectService.deleteProject(projectId, user.getId());
        MessageResponse mr = new MessageResponse("Project deleted successfully");
        return new ResponseEntity<>(mr, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Project>> searchProjects(
            @RequestParam(required = false) String keyword,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        List<Project> projs = projectService.searchProject(keyword, user);
        return new ResponseEntity<>(projs, HttpStatus.OK);
    }

    @GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat> fetchChatByProjectById(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        userService.findUserProfileByJwt(jwt);
        Chat chat = projectService.getChatByProjectId(projectId);

        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @PostMapping("/invite")
    public ResponseEntity<MessageResponse> sendInvitationToJoinProject(
            @RequestHeader("Authorization") String jwt,
            @RequestBody InvitationRequest request
    ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        invitationService.sendInvitation(request.getEmail(), request.getProjectId());
        MessageResponse mr = new MessageResponse("User invitation sent");
        return new ResponseEntity<>(mr, HttpStatus.OK);
    }

    @GetMapping("/accept_invitation")
    public ResponseEntity<Invitation> acceptInvitationToProject(
            @RequestHeader("Authorization") String jwt,
            @RequestParam String token
    ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Invitation inv = invitationService.acceptInvitation(token, user.getId());
        projectService.addUserToProject(inv.getProjectId(), user.getId());

        return new ResponseEntity<>(inv, HttpStatus.ACCEPTED);
    }

}
