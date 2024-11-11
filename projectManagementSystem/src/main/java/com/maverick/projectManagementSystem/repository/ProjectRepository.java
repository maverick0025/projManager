package com.maverick.projectManagementSystem.repository;

import com.maverick.projectManagementSystem.model.Project;
import com.maverick.projectManagementSystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface ProjectRepository extends JpaRepository<Project, Long> {

//    List<Project> findByOwner(User user); //fetch user created projects

    List<Project> findByNameContainingAndTeamContains(String partialName, User user); //for searching proj

//    @Query("SELECT p FROM PROJECT p join p.team t where t=:user")
//    List<Project> findProjectByTeam(@Param("user") User user);

    List<Project> findByTeamContainingOrOwner(User user, User owner);


}
