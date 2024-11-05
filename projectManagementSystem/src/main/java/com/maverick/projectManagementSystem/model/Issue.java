package com.maverick.projectManagementSystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User assignee;

    @ManyToOne
    private Project project;

}
