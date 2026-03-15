package com.redeemvida.rv.infrastructure.controller;

import com.redeemvida.rv.application.usecase.UserService;
import com.redeemvida.rv.domain.dto.UserCreateDTO;
import com.redeemvida.rv.domain.dto.UserResponseDTO;
import com.redeemvida.rv.domain.dto.UserUpdateDTO;
import com.redeemvida.rv.domain.exception.BusinessException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@Validated
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserCreateDTO userCreateDTO) {
        UserResponseDTO createdUser = userService.createUser(userCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable UUID id) {
        if (id == null) {
            throw new BusinessException("User ID is required", "ID_REQUIRED");
        }
        Optional<UserResponseDTO> user = userService.getUserById(id);
        return user.map(response -> new ResponseEntity<>(response, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserResponseDTO> getUserByEmail(
            @PathVariable @NotBlank(message = "Email is required") 
            @Email(message = "Invalid email format") String email) {
        Optional<UserResponseDTO> user = userService.getUserByEmail(email);
        return user.map(response -> new ResponseEntity<>(response, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable UUID id, @Valid @RequestBody UserUpdateDTO userUpdateDTO) {
        if (id == null) {
            throw new BusinessException("User ID is required", "ID_REQUIRED");
        }
        Optional<UserResponseDTO> updatedUser = userService.updateUser(id, userUpdateDTO);
        return updatedUser.map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        if (id == null) {
            throw new BusinessException("User ID is required", "ID_REQUIRED");
        }
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
