package com.redeemvida.rv.application.usecase;

import com.redeemvida.rv.domain.dto.UserCreateDTO;
import com.redeemvida.rv.domain.dto.UserResponseDTO;
import com.redeemvida.rv.domain.dto.UserUpdateDTO;
import com.redeemvida.rv.domain.entity.User;
import com.redeemvida.rv.domain.exception.BusinessException;
import com.redeemvida.rv.domain.exception.ResourceNotFoundException;
import com.redeemvida.rv.domain.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponseDTO createUser(UserCreateDTO userCreateDTO) {
        if (userRepository.existsByEmail(userCreateDTO.getEmail())) {
            throw new BusinessException("Email already exists", "EMAIL_ALREADY_EXISTS");
        }
        if (userRepository.existsByCpf(userCreateDTO.getCpf())) {
            throw new BusinessException("CPF already exists", "CPF_ALREADY_EXISTS");
        }

        User user = new User(
            null,
            userCreateDTO.getName(),
            userCreateDTO.getEmail(),
            userCreateDTO.getCep(),
            userCreateDTO.getLatitude(),
            userCreateDTO.getLongitude(),
            userCreateDTO.getCpf(),
            userCreateDTO.getPhone(),
            userCreateDTO.getBirthDate(),
            userCreateDTO.getCity(),
            userCreateDTO.getState(),
            userCreateDTO.getBloodType(),
            userCreateDTO.isReceiveNotifications(),
            userCreateDTO.getUserProfile(),
            LocalDateTime.now(),
            LocalDateTime.now(),
            true
        );

        User savedUser = userRepository.save(user);
        return convertToResponseDTO(savedUser);
    }

    public Optional<UserResponseDTO> getUserById(UUID id) {
        return userRepository.findById(id)
                .map(this::convertToResponseDTO);
    }

    public Optional<UserResponseDTO> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::convertToResponseDTO);
    }

    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<UserResponseDTO> updateUser(UUID id, UserUpdateDTO userUpdateDTO) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isEmpty()) {
            throw new ResourceNotFoundException("User not found with id: " + id, "USER_NOT_FOUND");
        }

        User user = existingUser.get();

        if (userUpdateDTO.getEmail() != null && !userUpdateDTO.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userUpdateDTO.getEmail())) {
                throw new BusinessException("Email already exists", "EMAIL_ALREADY_EXISTS");
            }
        }

        if (userUpdateDTO.getCpf() != null && !userUpdateDTO.getCpf().equals(user.getCpf())) {
            if (userRepository.existsByCpf(userUpdateDTO.getCpf())) {
                throw new BusinessException("CPF already exists", "CPF_ALREADY_EXISTS");
            }
        }

        User updatedUser = new User(
            user.getId(),
            userUpdateDTO.getName() != null ? userUpdateDTO.getName() : user.getName(),
            userUpdateDTO.getEmail() != null ? userUpdateDTO.getEmail() : user.getEmail(),
            userUpdateDTO.getCep() != null && !userUpdateDTO.getCep().isEmpty() ? userUpdateDTO.getCep() : user.getCep(),
            userUpdateDTO.getLatitude() != 0 ? userUpdateDTO.getLatitude() : user.getLatitude(),
            userUpdateDTO.getLongitude() != 0 ? userUpdateDTO.getLongitude() : user.getLongitude(),
            userUpdateDTO.getCpf() != null ? userUpdateDTO.getCpf() : user.getCpf(),
            userUpdateDTO.getPhone() != null ? userUpdateDTO.getPhone() : user.getPhone(),
            userUpdateDTO.getBirthDate() != null ? userUpdateDTO.getBirthDate() : user.getBirthDate(),
            userUpdateDTO.getCity() != null ? userUpdateDTO.getCity() : user.getCity(),
            userUpdateDTO.getState() != null ? userUpdateDTO.getState() : user.getState(),
            userUpdateDTO.getBloodType() != null ? userUpdateDTO.getBloodType() : user.getBloodType(),
            userUpdateDTO.isReceiveNotifications() ? userUpdateDTO.isReceiveNotifications() : user.isReceiveNotifications(),
            userUpdateDTO.getUserProfile() != null ? userUpdateDTO.getUserProfile() : user.getUserProfile(),
            user.getCreatedAt(),
            LocalDateTime.now(),
            userUpdateDTO.isActive() ? userUpdateDTO.isActive() : user.isActive()
        );

        User savedUser = userRepository.update(updatedUser);
        return Optional.of(convertToResponseDTO(savedUser));
    }

    public boolean deleteUser(UUID id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found with id: " + id, "USER_NOT_FOUND");
        }
        userRepository.deleteById(id);
        return true;
    }

    private UserResponseDTO convertToResponseDTO(User user) {
        return new UserResponseDTO(
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
            user.getUpdatedAt(),
            user.isActive()
        );
    }
}
