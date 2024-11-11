package com.maverick.projectManagementSystem.service;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.maverick.projectManagementSystem.model.Chat;
import com.maverick.projectManagementSystem.model.Project;
import com.maverick.projectManagementSystem.model.User;
import com.maverick.projectManagementSystem.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.SimpleTimeZone;
import java.util.stream.Collectors;

@Service //because this is our business logic class
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatService chatService;


    @Override
    public Project createProject(Project project, User user) throws Exception {
        Project newProj = new Project();

        newProj.setOwner(user);
        newProj.setName(project.getName());
        newProj.setTags(project.getTags());
        newProj.setCategory(project.getCategory());
        newProj.setDescription(project.getDescription());
        newProj.getTeam().add(user);

        Project savedProj = projectRepository.save(newProj);

        Chat chat = new Chat();
        chat.setProject(newProj);
        Chat newProjChat = chatService.createChat(chat);
        savedProj.setChat(newProjChat);

        return savedProj;
    }

    @Override
    public List<Project> getProjectByTeam(User user, String category, String tag) throws Exception {

        List<Project> projects = projectRepository.findByTeamContainingOrOwner(user, user);

        if(category != null){
            projects = projects.stream().filter((proj)-> proj.getCategory().equals(category))
                    .collect(Collectors.toList());
        }
        if(tag != null){
            projects = projects.stream().filter((proj)-> proj.getTags().contains(tag)).collect(Collectors.toList());
        }

        return projects;
    }

    @Override
    public Project getProjectById(Long projectId) throws Exception {
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if(optionalProject.isEmpty()){
            throw new Exception("Project not found for given id");

        }
        return optionalProject.get();

    }

    @Override
    public void deleteProject(Long projectId, Long userId) throws Exception {
        Project temp = getProjectById(projectId);
//        userService.findUserById(userId);

        projectRepository.deleteById(projectId);

    }

    @Override
    public Project updateProject(Project updatedProject, Long id) throws Exception {
        Project proj = getProjectById(id);
        proj.setName(updatedProject.getName());
        proj.setDescription(updatedProject.getDescription());
        proj.setTags(updatedProject.getTags());

        return projectRepository.save(proj);
    }

    @Override
    public void addUserToProject(Long projectId, Long userId) throws Exception {
        Project proj = getProjectById(projectId);
        User user = userService.findUserById(userId);

        if(!proj.getTeam().contains(user)){
            proj.getChat().getUsers().add(user);
            proj.getTeam().add(user);
        }
        /*else{
            throw new Exception("User already added to the project");
        }*/
        projectRepository.save(proj);

    }

    @Override
    public void removeUserFromProject(Long projectId, Long userId) throws Exception {

        Project proj = getProjectById(projectId);
        User user = userService.findUserById(userId);

        if(proj.getTeam().contains(user)){
            proj.getChat().getUsers().remove(user);
            proj.getTeam().remove(user);
        }

        projectRepository.save(proj);
    }

    @Override
    public Chat getChatByProjectId(Long projectId) throws Exception {

        Project proj = getProjectById(projectId);
        return proj.getChat();
    }

    @Override
    public List<Project> searchProject(String keyword, User user) throws Exception {

        return projectRepository.findByNameContainingAndTeamContains(keyword, user);
    }
}
