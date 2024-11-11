package com.maverick.projectManagementSystem.service;

import com.maverick.projectManagementSystem.model.Chat;
import com.maverick.projectManagementSystem.model.Project;
import com.maverick.projectManagementSystem.model.User;

import java.util.List;

public interface ProjectService {

    Project createProject(Project project, User user) throws Exception;
    List<Project> getProjectByTeam(User user, String category, String tag) throws Exception;

    Project getProjectById(Long projectId) throws Exception;

    void deleteProject(Long projectId, Long userId) throws Exception;
    //user id because, owner should only delete the project not any other person.

    Project updateProject(Project updatedProject, Long id) throws Exception;

    void addUserToProject(Long projectId, Long userId) throws Exception;

    void removeUserFromProject(Long projectId, Long userId) throws Exception;

    Chat getChatByProjectId(Long projectId) throws Exception;

    List<Project> searchProject(String keyword, User user) throws Exception;


}
