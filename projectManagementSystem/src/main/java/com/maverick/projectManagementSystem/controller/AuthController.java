package com.maverick.projectManagementSystem.controller;

import com.maverick.projectManagementSystem.configuration.JwtProvider;
import com.maverick.projectManagementSystem.model.User;
import com.maverick.projectManagementSystem.repository.UserRepository;
import com.maverick.projectManagementSystem.request.LoginRequest;
import com.maverick.projectManagementSystem.response.AuthResponse;
import com.maverick.projectManagementSystem.service.CustomUserDetailsImpl;
import com.maverick.projectManagementSystem.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    //signup and signin

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsImpl customUserDetailsImpl;

    @Autowired
    private SubscriptionService subscriptionService;

    //for registering the first time user
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUser(@RequestBody User user) throws Exception {
        //check if the user is already present in our db

        User userExists = userRepository.findByEmail(user.getEmail());

        if(userExists != null){
            AuthResponse resp = new AuthResponse();
            resp.setMessage("User Already registered");
            resp.setJwt("Login to get JWT");


            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
//            throw new Exception("User already registered. Try sign in.");
        }

        User newUser = new User();
        newUser.setFullName(user.getFullName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(newUser);
        subscriptionService.createSubscription(savedUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = JwtProvider.generateToken(authentication);

        AuthResponse response = new AuthResponse();
        response.setMessage("Sign up successful");
        response.setJwt(jwt);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> userSignIn(@RequestBody LoginRequest request){

        //check for validating username and password;
        Authentication authentication = authenticate(request.getEmail(), request.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = JwtProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse();
        response.setJwt(jwt);
        response.setMessage("Sign in successful");

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    private Authentication authenticate(String email, String password){

        UserDetails userDetails = customUserDetailsImpl.loadUserByUsername(email);
        if(userDetails == null){
            throw new BadCredentialsException("Invalid username");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    }
}
