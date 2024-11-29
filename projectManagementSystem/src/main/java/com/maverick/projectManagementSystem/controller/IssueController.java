package com.maverick.projectManagementSystem.controller;

import com.maverick.projectManagementSystem.model.Issue;
import com.maverick.projectManagementSystem.model.User;
import com.maverick.projectManagementSystem.model.dto.IssueDTO;
import com.maverick.projectManagementSystem.request.IssueRequest;
import com.maverick.projectManagementSystem.response.AuthResponse;
import com.maverick.projectManagementSystem.response.MessageResponse;
import com.maverick.projectManagementSystem.service.IssueService;
import com.maverick.projectManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private UserService userService;

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> fetchIssueById(
            @PathVariable Long issueId
    ) throws Exception{
//        Issue iss = issueService.getIssueById(issueId);
//        return new ResponseEntity<>(iss, HttpStatus.OK);
        return ResponseEntity.ok(issueService.getIssueById(issueId));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> fetchIssuesListByProjectId(@PathVariable Long projectId) throws Exception{

        List<Issue> liss = issueService.getIssueByProjectId(projectId);
        return new ResponseEntity<>(liss, HttpStatus.OK);
    }

    @PostMapping
    public  ResponseEntity<IssueDTO> createIssue(@RequestBody IssueRequest issue,
                                                 @RequestHeader("Authorization") String token)
                                                    throws Exception{

        User tokenUser = userService.findUserProfileByJwt(token);
        User user = userService.findUserById(tokenUser.getId());

            Issue createdIssue = issueService.createIssue(issue, tokenUser);
            IssueDTO issueDTO = new IssueDTO();
            issueDTO.setTitle(createdIssue.getTitle());
            issueDTO.setDescription(createdIssue.getDescription());
            issueDTO.setId(createdIssue.getId());
            issueDTO.setDueDate(createdIssue.getDueDate());
            issueDTO.setPriority(createdIssue.getPriority());
            issueDTO.setPriority(createdIssue.getPriority());
            issueDTO.setProjectId(createdIssue.getProject().getId());
//            issueDTO.setProjectId(createdIssue.getProject());
            issueDTO.setStatus(createdIssue.getStatus());
            issueDTO.setTags(createdIssue.getTags());
            issueDTO.setProject(createdIssue.getProject());


            return ResponseEntity.ok(issueDTO);
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse> deleteIssueById(@PathVariable Long issueId,
                                                        @RequestHeader("Authorization") String token)
                throws Exception{

        User user = userService.findUserProfileByJwt(token);
        issueService.deleteIssue(issueId, user.getId());
        MessageResponse resp = new MessageResponse();
        resp.setMessage("Issue deleted");

        return ResponseEntity.ok(resp);
    }

    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(@PathVariable Long issueId,
                                                @PathVariable Long userId)
        throws Exception{

        Issue issue = issueService.addUserToIssue(issueId, userId);
        return ResponseEntity.ok(issue);
    }

    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue> updateIssueStatus(@PathVariable Long issueId,
                                                   @PathVariable String status)
        throws Exception{
        Issue issue = issueService.updateStatus(issueId, status);
        return ResponseEntity.ok(issue);
    }


}
