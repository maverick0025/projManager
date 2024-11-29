package com.maverick.projectManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.*;
import java.lang.reflect.Array;
import java.util.ArrayList;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter
    @Getter
    private String fullName;
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) //password will not be visible in api response
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "assignee", cascade = CascadeType.ALL) //one user has many issues
    private List<Issue> assignedIssues = new ArrayList<>();

    private int projectSize; //whenever a project is created by user, by free plan, we can give user can create some 3 or 4 free projects else many with paid plan

}
