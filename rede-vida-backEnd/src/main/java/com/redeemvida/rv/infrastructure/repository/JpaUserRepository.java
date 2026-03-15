package com.redeemvida.rv.infrastructure.repository;

import com.redeemvida.rv.domain.entity.User;
import com.redeemvida.rv.domain.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class JpaUserRepository implements UserRepository {

    private final Map<UUID, User> users = new ConcurrentHashMap<>();

    @Override
    public User save(User user) {
        if (user.getId() == null) {
            user = new User(
                UUID.randomUUID(),
                user.getName(),
                user.getEmail(),
                user.getCep(),
                user.getLatitude(),
                user.getLongitude(),
                user.getCpf(),
                user.getPhone(),
                user.getBirthDate(),
                user.getCity(),
                user.getState(),
                user.getBloodType(),
                user.isReceiveNotifications(),
                user.getUserProfile(),
                java.time.LocalDateTime.now(),
                java.time.LocalDateTime.now(),
                true
            );
        } else {
            user = new User(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCep(),
                user.getLatitude(),
                user.getLongitude(),
                user.getCpf(),
                user.getPhone(),
                user.getBirthDate(),
                user.getCity(),
                user.getState(),
                user.getBloodType(),
                user.isReceiveNotifications(),
                user.getUserProfile(),
                user.getCreatedAt(),
                java.time.LocalDateTime.now(),
                user.isActive()
            );
        }
        users.put(user.getId(), user);
        return user;
    }

    @Override
    public Optional<User> findById(UUID id) {
        return Optional.ofNullable(users.get(id));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return users.values().stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst();
    }

    @Override
    public Optional<User> findByCpf(String cpf) {
        return users.values().stream()
                .filter(user -> user.getCpf().equals(cpf))
                .findFirst();
    }

    @Override
    public void deleteById(UUID id) {
        users.remove(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return users.values().stream()
                .anyMatch(user -> user.getEmail().equals(email));
    }

    @Override
    public boolean existsByCpf(String cpf) {
        return users.values().stream()
                .anyMatch(user -> user.getCpf().equals(cpf));
    }

    @Override
    public User update(User user) {
        users.put(user.getId(), user);
        return user;
    }

    @Override
    public List<User> findAll() {
        return new ArrayList<>(users.values());
    }
}
