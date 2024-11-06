package com.maverick.projectManagementSystem.service;

import com.maverick.projectManagementSystem.model.User;

public interface UserService {

    User findUserProfileByJwt(String jwt);

    User findUserByEmail(String email);

    User findUserById(Long userId);

    User updateUsersProjectSize(User user, int number);


}
