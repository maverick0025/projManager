package com.maverick.projectManagementSystem.controller;

import com.maverick.projectManagementSystem.model.PlanType;
import com.maverick.projectManagementSystem.model.Subscription;
import com.maverick.projectManagementSystem.model.User;
import com.maverick.projectManagementSystem.service.SubscriptionService;
import com.maverick.projectManagementSystem.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;
    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<Subscription> fetchUserSubscription(@RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserProfileByJwt(jwt);
        Subscription subscription = subscriptionService.getUsersSubscription(user.getId());

        return new ResponseEntity<>(subscription, HttpStatus.OK);
    }
    @PatchMapping("/upgrade")
    public ResponseEntity<Subscription> upgradeUserSubscription(@RequestHeader("Authorization") String jwt,
                                                                @RequestParam PlanType planType) throws Exception{

        User user = userService.findUserProfileByJwt(jwt);

        Subscription subscription = subscriptionService.upgradeSubscription(user.getId(), planType);

        return new ResponseEntity<>(subscription, HttpStatus.OK);
    }
}
