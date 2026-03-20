package com.redeemvida.rv.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.redeemvida.rv.application.usecase.UserService;
import com.redeemvida.rv.domain.dto.UserCreateDTO;
import com.redeemvida.rv.domain.dto.UserResponseDTO;
import com.redeemvida.rv.domain.dto.UserUpdateDTO;
import com.redeemvida.rv.domain.exception.BusinessException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@DisplayName("UserController Tests")
class UserControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    private UserService userService;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private UserCreateDTO validUserCreateDTO;
    private UserResponseDTO userResponseDTO;
    private UserUpdateDTO userUpdateDTO;
    private UUID userId;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        
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

        userUpdateDTO = new UserUpdateDTO();
        userUpdateDTO.setName("John Updated");
        userUpdateDTO.setPhone("+5511999999999");
        userUpdateDTO.setReceiveNotifications(false);
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

        verify(userService, times(1)).createUser(any(UserCreateDTO.class));
    }

    @Test
    @DisplayName("Should return 400 when creating user with invalid data")
    void shouldReturnBadRequestWhenCreatingUserWithInvalidData() throws Exception {
        UserCreateDTO invalidUser = new UserCreateDTO();
        invalidUser.setName(""); // Invalid: empty name
        invalidUser.setEmail("invalid-email"); // Invalid: bad email format

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isBadRequest());

        verify(userService, never()).createUser(any(UserCreateDTO.class));
    }

    @Test
    @DisplayName("Should get user by ID successfully when user exists")
    void shouldGetUserByIdSuccessfully() throws Exception {
        when(userService.getUserById(userId)).thenReturn(Optional.of(userResponseDTO));

        mockMvc.perform(get("/api/v1/users/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId.toString()))
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"));

        verify(userService, times(1)).getUserById(userId);
    }

    @Test
    @DisplayName("Should return 404 when getting user by ID that does not exist")
    void shouldReturnNotFoundWhenGettingUserByIdThatDoesNotExist() throws Exception {
        when(userService.getUserById(userId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/users/{id}", userId))
                .andExpect(status().isNotFound());

        verify(userService, times(1)).getUserById(userId);
    }

    @Test
    @DisplayName("Should return 400 when getting user with null ID")
    void shouldReturnBadRequestWhenGettingUserWithNullId() throws Exception {
        mockMvc.perform(get("/api/v1/users/{id}", (String) null))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("User ID is required"))
                .andExpect(jsonPath("$.errorCode").value("ID_REQUIRED"));

        verify(userService, never()).getUserById(any());
    }

    @Test
    @DisplayName("Should get user by email successfully when user exists")
    void shouldGetUserByEmailSuccessfully() throws Exception {
        when(userService.getUserByEmail("john.doe@example.com")).thenReturn(Optional.of(userResponseDTO));

        mockMvc.perform(get("/api/v1/users/email/{email}", "john.doe@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId.toString()))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"))
                .andExpect(jsonPath("$.name").value("John Doe"));

        verify(userService, times(1)).getUserByEmail("john.doe@example.com");
    }

    @Test
    @DisplayName("Should return 404 when getting user by email that does not exist")
    void shouldReturnNotFoundWhenGettingUserByEmailThatDoesNotExist() throws Exception {
        when(userService.getUserByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/users/email/{email}", "nonexistent@example.com"))
                .andExpect(status().isNotFound());

        verify(userService, times(1)).getUserByEmail("nonexistent@example.com");
    }

    @Test
    @DisplayName("Should return 400 when getting user with blank email")
    void shouldReturnBadRequestWhenGettingUserWithBlankEmail() throws Exception {
        mockMvc.perform(get("/api/v1/users/email/{email}", ""))
                .andExpect(status().isBadRequest());

        verify(userService, never()).getUserByEmail(any());
    }

    @Test
    @DisplayName("Should return 400 when getting user with invalid email format")
    void shouldReturnBadRequestWhenGettingUserWithInvalidEmailFormat() throws Exception {
        mockMvc.perform(get("/api/v1/users/email/{email}", "invalid-email"))
                .andExpect(status().isBadRequest());

        verify(userService, never()).getUserByEmail(any());
    }

    @Test
    @DisplayName("Should get all users successfully")
    void shouldGetAllUsersSuccessfully() throws Exception {
        UserResponseDTO user2 = new UserResponseDTO(
            UUID.randomUUID(),
            "Jane Smith",
            "jane.smith@example.com",
            "54321-987",
            -22.9068,
            -43.1729,
            "98765432100",
            "+5521888887777",
            LocalDateTime.of(1985, 8, 20, 14, 45),
            "Rio de Janeiro",
            "RJ",
            "A-",
            false,
            "INSTITUTION",
            LocalDateTime.now(),
            LocalDateTime.now(),
            true
        );

        List<UserResponseDTO> users = Arrays.asList(userResponseDTO, user2);
        when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("John Doe"))
                .andExpect(jsonPath("$[1].name").value("Jane Smith"));

        verify(userService, times(1)).getAllUsers();
    }

    @Test
    @DisplayName("Should return empty list when no users exist")
    void shouldReturnEmptyListWhenNoUsersExist() throws Exception {
        when(userService.getAllUsers()).thenReturn(Arrays.asList());

        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(userService, times(1)).getAllUsers();
    }

    @Test
    @DisplayName("Should update user successfully when user exists")
    void shouldUpdateUserSuccessfully() throws Exception {
        UserResponseDTO updatedResponse = new UserResponseDTO(
            userId,
            "John Updated",
            "john.doe@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999999999",
            LocalDateTime.of(1990, 5, 15, 10, 30),
            "São Paulo",
            "SP",
            "O+",
            false,
            "COMMON_USER",
            LocalDateTime.now(),
            LocalDateTime.now(),
            true
        );

        when(userService.updateUser(eq(userId), any(UserUpdateDTO.class))).thenReturn(Optional.of(updatedResponse));

        mockMvc.perform(put("/api/v1/users/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userUpdateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId.toString()))
                .andExpect(jsonPath("$.name").value("John Updated"))
                .andExpect(jsonPath("$.phone").value("+5511999999999"))
                .andExpect(jsonPath("$.receiveNotifications").value(false));

        verify(userService, times(1)).updateUser(eq(userId), any(UserUpdateDTO.class));
    }

    @Test
    @DisplayName("Should return 404 when updating user that does not exist")
    void shouldReturnNotFoundWhenUpdatingUserThatDoesNotExist() throws Exception {
        when(userService.updateUser(eq(userId), any(UserUpdateDTO.class))).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/v1/users/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userUpdateDTO)))
                .andExpect(status().isNotFound());

        verify(userService, times(1)).updateUser(eq(userId), any(UserUpdateDTO.class));
    }

    @Test
    @DisplayName("Should return 400 when updating user with null ID")
    void shouldReturnBadRequestWhenUpdatingUserWithNullId() throws Exception {
        mockMvc.perform(put("/api/v1/users/{id}", (String) null)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userUpdateDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("User ID is required"))
                .andExpect(jsonPath("$.errorCode").value("ID_REQUIRED"));

        verify(userService, never()).updateUser(any(), any());
    }

    @Test
    @DisplayName("Should delete user successfully")
    void shouldDeleteUserSuccessfully() throws Exception {
        doNothing().when(userService).deleteUser(userId);

        mockMvc.perform(delete("/api/v1/users/{id}", userId))
                .andExpect(status().isNoContent());

        verify(userService, times(1)).deleteUser(userId);
    }

    @Test
    @DisplayName("Should return 400 when deleting user with null ID")
    void shouldReturnBadRequestWhenDeletingUserWithNullId() throws Exception {
        mockMvc.perform(delete("/api/v1/users/{id}", (String) null))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("User ID is required"))
                .andExpect(jsonPath("$.errorCode").value("ID_REQUIRED"));

        verify(userService, never()).deleteUser(any());
    }

    @Test
    @DisplayName("Should handle BusinessException correctly")
    void shouldHandleBusinessExceptionCorrectly() throws Exception {
        when(userService.getUserById(userId))
                .thenThrow(new BusinessException("User not found", "USER_NOT_FOUND"));

        mockMvc.perform(get("/api/v1/users/{id}", userId))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("User not found"))
                .andExpect(jsonPath("$.errorCode").value("USER_NOT_FOUND"));

        verify(userService, times(1)).getUserById(userId);
    }
}
