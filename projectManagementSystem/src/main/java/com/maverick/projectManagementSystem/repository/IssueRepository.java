package com.maverick.projectManagementSystem.repository;

import com.maverick.projectManagementSystem.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    public List<Issue> findByProjectId(Long id);
}
