package com.maverick.projectManagementSystem.repository;

import com.maverick.projectManagementSystem.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    Invitation findByToken(String token);

    Invitation findByEmail(String userEmail);

    Invitation findByProjectId(Long projectId);
}
