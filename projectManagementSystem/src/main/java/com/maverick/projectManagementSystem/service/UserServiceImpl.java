package com.maverick.projectManagementSystem.service;

import com.maverick.projectManagementSystem.configuration.JwtProvider;
import com.maverick.projectManagementSystem.model.User;
import com.maverick.projectManagementSystem.repository.UserRepository;
import org.hibernate.sql.exec.ExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception{
        String email = JwtProvider.getEmailFromToken(jwt);
        if(email.isEmpty()){
            throw new Exception("Invalid JWT. No user associated with this JWT token");
        }

        return findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new Exception("User not found with given email");
        }
        return user;
    }

    @Override
    public User findUserById(Long userId) throws Exception{
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isEmpty()){
            throw new Exception("User not found with given Id");
        }
        return optionalUser.get();
    }

    @Override
    public User updateUsersProjectSize(User user, int number) throws Exception{
        //check if user is actually present
        findUserByEmail(user.getEmail());

        user.setProjectSize(user.getProjectSize()+ number);

        return userRepository.save(user);
    }
}
