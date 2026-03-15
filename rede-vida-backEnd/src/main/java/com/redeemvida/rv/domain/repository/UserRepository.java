package com.redeemvida.rv.domain.repository;

import com.redeemvida.rv.domain.entity.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository {
    User save(User user);
    Optional<User> findById(UUID id);
    Optional<User> findByEmail(String email);
    Optional<User> findByCpf(String cpf);
    void deleteById(UUID id);
    boolean existsByEmail(String email);
    boolean existsByCpf(String cpf);
    User update(User user);
    List<User> findAll();
}
