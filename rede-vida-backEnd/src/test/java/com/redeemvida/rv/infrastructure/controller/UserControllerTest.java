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
import static org.hamcrest.Matchers.hasSize;

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

    // ==================== VALIDATION TESTS ====================

    @Test
    @DisplayName("Should return 400 when creating user with blank name")
    void shouldReturn400WhenCreatingUserWithBlankName() throws Exception {
        UserCreateDTO invalidUser = new UserCreateDTO(
            "",
            "john.doe@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999998888",
            LocalDateTime.of(1990, 5, 15, 10, 30),
            "São Paulo",
            "SP",
            "O+",
            true,
            "COMMON_USER"
        );

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errorCode").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.name").value("Name is required"));
    }

    @Test
    @DisplayName("Should return 400 when creating user with invalid email")
    void shouldReturn400WhenCreatingUserWithInvalidEmail() throws Exception {
        UserCreateDTO invalidUser = new UserCreateDTO(
            "John Doe",
            "invalid-email",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999998888",
            LocalDateTime.of(1990, 5, 15, 10, 30),
            "São Paulo",
            "SP",
            "O+",
            true,
            "COMMON_USER"
        );

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errorCode").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.email").value("Invalid email format"));
    }

    @Test
    @DisplayName("Should return 400 when creating user with invalid CEP format")
    void shouldReturn400WhenCreatingUserWithInvalidCEPFormat() throws Exception {
        UserCreateDTO invalidUser = new UserCreateDTO(
            "John Doe",
            "john.doe@example.com",
            "1234567",  // CEP inválido - não segue padrão
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999998888",
            LocalDateTime.of(1990, 5, 15, 10, 30),
            "São Paulo",
            "SP",
            "O+",
            true,
            "COMMON_USER"
        );

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errorCode").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.cep").value("CEP must be in format XXXXX-XXX or XXXXXXXX"));
    }

    @Test
    @DisplayName("Should return 400 when creating user with latitude out of range")
    void shouldReturn400WhenCreatingUserWithLatitudeOutOfRange() throws Exception {
        UserCreateDTO invalidUser = new UserCreateDTO(
            "John Doe",
            "john.doe@example.com",
            "12345-678",
            -91.0,
            -46.6333,
            "12345678901",
            "+5511999998888",
            LocalDateTime.of(1990, 5, 15, 10, 30),
            "São Paulo",
            "SP",
            "O+",
            true,
            "COMMON_USER"
        );

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errorCode").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.latitude").value("Latitude must be between -90 and 90"));
    }

    @Test
    @DisplayName("Should return 400 when creating user with invalid CPF format")
    void shouldReturn400WhenCreatingUserWithInvalidCPFFormat() throws Exception {
        UserCreateDTO invalidUser = new UserCreateDTO(
            "John Doe",
            "john.doe@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "1234567890",
            "+5511999998888",
            LocalDateTime.of(1990, 5, 15, 10, 30),
            "São Paulo",
            "SP",
            "O+",
            true,
            "COMMON_USER"
        );

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errorCode").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.cpf").value("CPF must contain exactly 11 digits"));
    }

    @Test
    @DisplayName("Should return 400 when creating user with future birth date")
    void shouldReturn400WhenCreatingUserWithFutureBirthDate() throws Exception {
        UserCreateDTO invalidUser = new UserCreateDTO(
            "John Doe",
            "john.doe@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999998888",
            LocalDateTime.now().plusDays(1),
            "São Paulo",
            "SP",
            "O+",
            true,
            "COMMON_USER"
        );

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errorCode").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.birthDate").value("Birth date must be in the past"));
    }

    @Test
    @DisplayName("Should return 400 when creating user with invalid state format")
    void shouldReturn400WhenCreatingUserWithInvalidStateFormat() throws Exception {
        UserCreateDTO invalidUser = new UserCreateDTO(
            "John Doe",
            "john.doe@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999998888",
            LocalDateTime.of(1990, 5, 15, 10, 30),
            "São Paulo",
            "sp",
            "O+",
            true,
            "COMMON_USER"
        );

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errorCode").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.state").value("State must contain only uppercase letters"));
    }

    @Test
    @DisplayName("Should return 400 when creating user with invalid blood type")
    void shouldReturn400WhenCreatingUserWithInvalidBloodType() throws Exception {
        UserCreateDTO invalidUser = new UserCreateDTO(
            "John Doe",
            "john.doe@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999998888",
            LocalDateTime.of(1990, 5, 15, 10, 30),
            "São Paulo",
            "SP",
            "X+",
            true,
            "COMMON_USER"
        );

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errorCode").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.bloodType").value("Blood type must be A+, A-, B+, B-, AB+, AB-, O+, O-, or ALL"));
    }

    @Test
    @DisplayName("Should return 400 when creating user with invalid user profile")
    void shouldReturn400WhenCreatingUserWithInvalidUserProfile() throws Exception {
        UserCreateDTO invalidUser = new UserCreateDTO(
            "John Doe",
            "john.doe@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999998888",
            LocalDateTime.of(1990, 5, 15, 10, 30),
            "São Paulo",
            "SP",
            "O+",
            true,
            "INVALID_PROFILE"
        );

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errorCode").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.userProfile").value("User profile must be COMMON_USER or INSTITUTION"));
    }

    // ==================== PARAMETER FORMAT TESTS ====================

    @Test
    @DisplayName("Should return 400 when getting user by ID with invalid UUID format")
    void shouldReturn400WhenGettingUserByIdWithInvalidUUIDFormat() throws Exception {
        mockMvc.perform(get("/api/v1/users/{id}", "invalid-uuid"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errorCode").value("INVALID_UUID_FORMAT"))
                .andExpect(jsonPath("$.message").value("Invalid user ID format. Expected UUID format"));
    }

    // ==================== REQUEST BODY TESTS ====================

    @Test
    @DisplayName("Should return 400 when creating user with malformed JSON")
    void shouldReturn400WhenCreatingUserWithMalformedJSON() throws Exception {
        String malformedJson = "{\"name\": \"John Doe\", \"email\": \"john.doe@example.com\""; // JSON inválido - faltando }

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(malformedJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Should return 400 when creating user with empty request body")
    void shouldReturn400WhenCreatingUserWithEmptyRequestBody() throws Exception {
        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(""))
                .andExpect(status().isBadRequest());
    }

    // ==================== EDGE CASES ====================

    @Test
    @DisplayName("Should return empty list when getting all users with no users")
    void shouldReturnEmptyListWhenGettingAllUsersWithNoUsers() throws Exception {
        when(userService.getAllUsers()).thenReturn(Arrays.asList());

        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    @DisplayName("Should return 200 when updating user with partial data")
    void shouldReturn200WhenUpdatingUserWithPartialData() throws Exception {
        UserUpdateDTO partialUpdate = new UserUpdateDTO();
        partialUpdate.setName("Partial Update");

        UserResponseDTO partialResponse = new UserResponseDTO(
            userId,
            "Partial Update",
            "john.doe@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999998888",
            LocalDateTime.of(1990, 5, 15, 10, 30),
            "São Paulo",
            "SP",
            "O+",
            true,
            "COMMON_USER",
            LocalDateTime.now(),
            LocalDateTime.now(),
            true
        );
        
        when(userService.updateUser(eq(userId), any(UserUpdateDTO.class))).thenReturn(Optional.of(partialResponse));

        mockMvc.perform(put("/api/v1/users/{id}", userId.toString())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(partialUpdate)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Partial Update"));
    }
}
