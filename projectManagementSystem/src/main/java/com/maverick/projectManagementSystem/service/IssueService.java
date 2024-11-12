package com.maverick.projectManagementSystem.service;

import com.maverick.projectManagementSystem.model.Issue;
import com.maverick.projectManagementSystem.model.User;
import com.maverick.projectManagementSystem.request.IssueRequest;

import java.util.List;

public interface IssueService {

    Issue getIssueById(Long issueId) throws Exception;

    List<Issue> getIssueByProjectId(Long projectId) throws Exception;

    Issue createIssue(IssueRequest issue, User user) throws Exception;

//    Optional<Issue> updateIssue(Long issueId, IssueRequest updatedIssue, Long userId) throws IssueException, UserException;

    void deleteIssue(Long issueId, Long userId) throws Exception;

//    List<Issue> getIssuesByAssigneeId(Long assigneeId) throws IssueException;

//    List<Issue> searchIssues(String title, String status, String priority, Long assigneeId) throws IssueException;

    Issue addUserToIssue(Long issueId, Long userId) throws Exception;

    Issue updateStatus(Long issueId, String status) throws Exception;

}
