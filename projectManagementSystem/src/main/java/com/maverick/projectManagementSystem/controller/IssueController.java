package com.maverick.projectManagementSystem.controller;

import com.maverick.projectManagementSystem.model.Issue;
import com.maverick.projectManagementSystem.service.IssueService;
import com.maverick.projectManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        Issue iss = issueService.getIssueById(issueId);
        return new ResponseEntity<>(iss, HttpStatus.OK);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> fetchIssuesByProjectId(@PathVariable Long projectId) throws Exception{

        List<Issue> liss = issueService.getIssueByProjectId(projectId);
        return new ResponseEntity<>(liss, HttpStatus.OK);
    }


}
