package com.redeemvida.rv.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.redeemvida.rv.application.usecase.UserService;
import com.redeemvida.rv.domain.dto.UserCreateDTO;
import com.redeemvida.rv.domain.dto.UserResponseDTO;
import com.redeemvida.rv.domain.dto.UserUpdateDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserController.class)
@DisplayName("UserController Tests")
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserCreateDTO validUserCreateDTO;
    private UserResponseDTO userResponseDTO;
    private UserUpdateDTO validUserUpdateDTO;
    private UUID userId;
    private List<UserResponseDTO> allUsers;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        
        userId = UUID.randomUUID();
        LocalDateTime birthDate = LocalDateTime.of(1990, 5, 15, 10, 30);
        LocalDateTime createdAt = LocalDateTime.now();
        LocalDateTime updatedAt = LocalDateTime.now();

        validUserCreateDTO = new UserCreateDTO(
            "John Doe",
            "john.doe@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999998888",
            birthDate,
            "São Paulo",
            "SP",
            "O+",
            true,
            "COMMON_USER"
        );

        userResponseDTO = new UserResponseDTO(
            userId,
            "John Doe",
            "john.doe@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999998888",
            birthDate,
            "São Paulo",
            "SP",
            "O+",
            true,
            "COMMON_USER",
            createdAt,
            updatedAt,
            true
        );

        validUserUpdateDTO = new UserUpdateDTO();
        validUserUpdateDTO.setName("John Updated");
        validUserUpdateDTO.setEmail("john.updated@example.com");
        validUserUpdateDTO.setCep("98765-432");
        validUserUpdateDTO.setLatitude(-23.5505);
        validUserUpdateDTO.setLongitude(-46.6333);
        validUserUpdateDTO.setCpf("98765432109");
        validUserUpdateDTO.setPhone("+5511999998889");
        validUserUpdateDTO.setBirthDate(birthDate);
        validUserUpdateDTO.setCity("Rio de Janeiro");
        validUserUpdateDTO.setState("RJ");
        validUserUpdateDTO.setBloodType("A+");
        validUserUpdateDTO.setReceiveNotifications(true);
        validUserUpdateDTO.setUserProfile("ADMIN_USER");

        allUsers = Arrays.asList(userResponseDTO);
    }

    @Test
    @DisplayName("Should create user successfully when valid data is provided")
    void shouldCreateUserSuccessfully() throws Exception {
        when(userService.createUser(any(UserCreateDTO.class))).thenReturn(userResponseDTO);

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validUserCreateDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(userId.toString()))
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"))
                .andExpect(jsonPath("$.bloodType").value("O+"))
                .andExpect(jsonPath("$.userProfile").value("COMMON_USER"))
                .andExpect(jsonPath("$.active").value(true));
    }

    @Test
    @DisplayName("Should get user by ID successfully")
    void shouldGetUserByIdSuccessfully() throws Exception {
        when(userService.getUserById(userId)).thenReturn(Optional.of(userResponseDTO));

        mockMvc.perform(get("/api/v1/users/{id}", userId.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId.toString()))
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"));
    }

    @Test
    @DisplayName("Should return 404 when user ID not found")
    void shouldReturn404WhenUserNotFound() throws Exception {
        when(userService.getUserById(userId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/users/{id}", userId.toString()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Should get user by email successfully")
    void shouldGetUserByEmailSuccessfully() throws Exception {
        when(userService.getUserByEmail("john.doe@example.com")).thenReturn(Optional.of(userResponseDTO));

        mockMvc.perform(get("/api/v1/users/email/{email}", "john.doe@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId.toString()))
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"));
    }

    @Test
    @DisplayName("Should return 404 when user email not found")
    void shouldReturn404WhenUserEmailNotFound() throws Exception {
        when(userService.getUserByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/users/email/{email}", "nonexistent@example.com"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Should get all users successfully")
    void shouldGetAllUsersSuccessfully() throws Exception {
        when(userService.getAllUsers()).thenReturn(allUsers);

        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value(userId.toString()))
                .andExpect(jsonPath("$[0].name").value("John Doe"))
                .andExpect(jsonPath("$[0].email").value("john.doe@example.com"));
    }

    @Test
    @DisplayName("Should update user successfully")
    void shouldUpdateUserSuccessfully() throws Exception {
        UserResponseDTO updatedResponse = new UserResponseDTO(
            userId,
            "John Updated",
            "john.updated@example.com",
            "98765-432",
            -23.5505,
            -46.6333,
            "98765432109",
            "+5511999998889",
            LocalDateTime.of(1990, 5, 15, 10, 30),
            "Rio de Janeiro",
            "RJ",
            "A+",
            true,
            "ADMIN_USER",
            LocalDateTime.now(),
            LocalDateTime.now(),
            true
        );
        
        when(userService.updateUser(eq(userId), any(UserUpdateDTO.class))).thenReturn(Optional.of(updatedResponse));

        mockMvc.perform(put("/api/v1/users/{id}", userId.toString())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validUserUpdateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John Updated"))
                .andExpect(jsonPath("$.email").value("john.updated@example.com"))
                .andExpect(jsonPath("$.bloodType").value("A+"))
                .andExpect(jsonPath("$.userProfile").value("ADMIN_USER"));
    }

    @Test
    @DisplayName("Should return 404 when updating non-existent user")
    void shouldReturn404WhenUpdatingNonExistentUser() throws Exception {
        when(userService.updateUser(eq(userId), any(UserUpdateDTO.class))).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/v1/users/{id}", userId.toString())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validUserUpdateDTO)))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Should delete user successfully")
    void shouldDeleteUserSuccessfully() throws Exception {
        mockMvc.perform(delete("/api/v1/users/{id}", userId.toString()))
                .andExpect(status().isNoContent());
    }
}
