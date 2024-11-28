package com.maverick.projectManagementSystem.service;

import com.maverick.projectManagementSystem.model.PlanType;
import com.maverick.projectManagementSystem.model.Subscription;
import com.maverick.projectManagementSystem.model.User;

public interface SubscriptionService {

    Subscription createSubscription(User user);

    Subscription getUsersSubscription(Long userId) throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType) throws Exception;

    boolean isValid(Subscription subscription);

}
