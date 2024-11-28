package com.maverick.projectManagementSystem.service;

import com.maverick.projectManagementSystem.model.Issue;
import com.maverick.projectManagementSystem.model.Project;
import com.maverick.projectManagementSystem.model.User;
import com.maverick.projectManagementSystem.repository.IssueRepository;
import com.maverick.projectManagementSystem.request.IssueRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueServiceImpl implements IssueService{

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Override
    public Issue getIssueById(Long issueId) throws Exception {
        Optional<Issue> issue = issueRepository.findById(issueId);
        if(issue.isPresent()){
            return issue.get();
        }
        throw new Exception("No issues found for the issue id: "+ issueId);
    }

    @Override
    public List<Issue> getIssueByProjectId(Long projectId) throws Exception {

        return issueRepository.findByProjectId(projectId);
    }

    @Override
    public Issue createIssue(IssueRequest request, User user) throws Exception {

        Project proj = projectService.getProjectById(request.getProjectId());
        Issue issue = new Issue();

        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setStatus(request.getStatus());
//        issue.setProjectId(request.getProjectId());
        issue.setDueDate(request.getDueDate());
        issue.setPriority(request.getPriority());
        issue.setProject(proj);

        return issueRepository.save(issue);
    }

    @Override
    public void deleteIssue(Long issueId, Long userId) throws Exception {

        getIssueById(issueId);

        issueRepository.deleteById(issueId);
    }

    @Override
    public Issue addUserToIssue(Long issueId, Long userId) throws Exception {
        Issue issue = getIssueById(issueId);
        User user = userService.findUserById(userId);
        issue.setAssignee(user);

        return issueRepository.save(issue);
    }

    @Override
    public Issue updateStatus(Long issueId, String status) throws Exception {
        Issue issue = getIssueById(issueId);
        issue.setStatus(status);

        return issueRepository.save(issue);
    }
}
