package com.redeemvida.rv.application.usecase;

import com.redeemvida.rv.domain.dto.UserCreateDTO;
import com.redeemvida.rv.domain.dto.UserResponseDTO;
import com.redeemvida.rv.domain.dto.UserUpdateDTO;
import com.redeemvida.rv.domain.entity.User;
import com.redeemvida.rv.domain.exception.BusinessException;
import com.redeemvida.rv.domain.exception.ResourceNotFoundException;
import com.redeemvida.rv.domain.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserService Tests")
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private UserCreateDTO userCreateDTO;
    private UserUpdateDTO userUpdateDTO;
    private User existingUser;
    private UUID userId;
    private LocalDateTime createdAt;
    private LocalDateTime birthDate;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        birthDate = LocalDateTime.of(1990, 5, 15, 10, 30);
        createdAt = LocalDateTime.now().minusDays(1);

        userCreateDTO = new UserCreateDTO(
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

        userUpdateDTO = new UserUpdateDTO();
        userUpdateDTO.setName("John Updated");
        userUpdateDTO.setEmail("john.updated@example.com");
        userUpdateDTO.setPhone("+5511999999999");
        userUpdateDTO.setReceiveNotifications(false);

        existingUser = new User(
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
            createdAt,
            true
        );
    }

    @Test
    @DisplayName("Should create user successfully when data is valid")
    void shouldCreateUserSuccessfully() {
        when(userRepository.existsByEmail("john.doe@example.com")).thenReturn(false);
        when(userRepository.existsByCpf("12345678901")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(existingUser);

        UserResponseDTO result = userService.createUser(userCreateDTO);

        assertNotNull(result);
        assertEquals(userId, result.getId());
        assertEquals("John Doe", result.getName());
        assertEquals("john.doe@example.com", result.getEmail());
        assertEquals("12345678901", result.getCpf());
        assertEquals("O+", result.getBloodType());
        assertEquals("COMMON_USER", result.getUserProfile());
        assertTrue(result.isActive());

        verify(userRepository, times(1)).existsByEmail("john.doe@example.com");
        verify(userRepository, times(1)).existsByCpf("12345678901");
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("Should throw BusinessException when creating user with existing email")
    void shouldThrowBusinessExceptionWhenCreatingUserWithExistingEmail() {
        when(userRepository.existsByEmail("john.doe@example.com")).thenReturn(true);

        BusinessException exception = assertThrows(BusinessException.class, 
            () -> userService.createUser(userCreateDTO));

        assertEquals("Email already exists", exception.getMessage());
        assertEquals("EMAIL_ALREADY_EXISTS", exception.getErrorCode());

        verify(userRepository, times(1)).existsByEmail("john.doe@example.com");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Should throw BusinessException when creating user with existing CPF")
    void shouldThrowBusinessExceptionWhenCreatingUserWithExistingCpf() {
        when(userRepository.existsByEmail("john.doe@example.com")).thenReturn(false);
        when(userRepository.existsByCpf("12345678901")).thenReturn(true);

        BusinessException exception = assertThrows(BusinessException.class, 
            () -> userService.createUser(userCreateDTO));

        assertEquals("CPF already exists", exception.getMessage());
        assertEquals("CPF_ALREADY_EXISTS", exception.getErrorCode());

        verify(userRepository, times(1)).existsByEmail("john.doe@example.com");
        verify(userRepository, times(1)).existsByCpf("12345678901");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Should get user by ID successfully when user exists")
    void shouldGetUserByIdSuccessfully() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));

        Optional<UserResponseDTO> result = userService.getUserById(userId);

        assertTrue(result.isPresent());
        assertEquals(userId, result.get().getId());
        assertEquals("John Doe", result.get().getName());
        assertEquals("john.doe@example.com", result.get().getEmail());

        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    @DisplayName("Should return empty when getting user by ID that does not exist")
    void shouldReturnEmptyWhenGettingUserByIdThatDoesNotExist() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        Optional<UserResponseDTO> result = userService.getUserById(userId);

        assertFalse(result.isPresent());

        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    @DisplayName("Should get user by email successfully when user exists")
    void shouldGetUserByEmailSuccessfully() {
        when(userRepository.findByEmail("john.doe@example.com")).thenReturn(Optional.of(existingUser));

        Optional<UserResponseDTO> result = userService.getUserByEmail("john.doe@example.com");

        assertTrue(result.isPresent());
        assertEquals(userId, result.get().getId());
        assertEquals("john.doe@example.com", result.get().getEmail());

        verify(userRepository, times(1)).findByEmail("john.doe@example.com");
    }

    @Test
    @DisplayName("Should return empty when getting user by email that does not exist")
    void shouldReturnEmptyWhenGettingUserByEmailThatDoesNotExist() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        Optional<UserResponseDTO> result = userService.getUserByEmail("nonexistent@example.com");

        assertFalse(result.isPresent());

        verify(userRepository, times(1)).findByEmail("nonexistent@example.com");
    }

    @Test
    @DisplayName("Should get all users successfully")
    void shouldGetAllUsersSuccessfully() {
        User user2 = new User(
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

        List<User> users = Arrays.asList(existingUser, user2);
        when(userRepository.findAll()).thenReturn(users);

        List<UserResponseDTO> result = userService.getAllUsers();

        assertEquals(2, result.size());
        assertEquals("John Doe", result.get(0).getName());
        assertEquals("Jane Smith", result.get(1).getName());

        verify(userRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Should return empty list when no users exist")
    void shouldReturnEmptyListWhenNoUsersExist() {
        when(userRepository.findAll()).thenReturn(Arrays.asList());

        List<UserResponseDTO> result = userService.getAllUsers();

        assertTrue(result.isEmpty());

        verify(userRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Should update user successfully when user exists")
    void shouldUpdateUserSuccessfully() {
        User updatedUser = new User(
            userId,
            "John Updated",
            "john.updated@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999999999",
            birthDate,
            "São Paulo",
            "SP",
            "O+",
            false,
            "COMMON_USER",
            createdAt,
            LocalDateTime.now(),
            true
        );

        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userRepository.existsByEmail("john.updated@example.com")).thenReturn(false);
        when(userRepository.update(any(User.class))).thenReturn(updatedUser);

        Optional<UserResponseDTO> result = userService.updateUser(userId, userUpdateDTO);

        assertTrue(result.isPresent());
        assertEquals("John Updated", result.get().getName());
        assertEquals("john.updated@example.com", result.get().getEmail());
        assertEquals("+5511999999999", result.get().getPhone());
        assertFalse(result.get().isReceiveNotifications());

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).existsByEmail("john.updated@example.com");
        verify(userRepository, times(1)).update(any(User.class));
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when updating user that does not exist")
    void shouldThrowResourceNotFoundExceptionWhenUpdatingUserThatDoesNotExist() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, 
            () -> userService.updateUser(userId, userUpdateDTO));

        assertEquals("User not found with id: " + userId, exception.getMessage());
        assertEquals("USER_NOT_FOUND", exception.getErrorCode());

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).update(any(User.class));
    }

    @Test
    @DisplayName("Should throw BusinessException when updating user with existing email")
    void shouldThrowBusinessExceptionWhenUpdatingUserWithExistingEmail() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userRepository.existsByEmail("john.updated@example.com")).thenReturn(true);

        BusinessException exception = assertThrows(BusinessException.class, 
            () -> userService.updateUser(userId, userUpdateDTO));

        assertEquals("Email already exists", exception.getMessage());
        assertEquals("EMAIL_ALREADY_EXISTS", exception.getErrorCode());

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).existsByEmail("john.updated@example.com");
        verify(userRepository, never()).update(any(User.class));
    }

    @Test
    @DisplayName("Should update user with same email without checking existence")
    void shouldUpdateUserWithSameEmailWithoutCheckingExistence() {
        userUpdateDTO.setEmail("john.doe@example.com"); // Same email as existing user

        User updatedUser = new User(
            userId,
            "John Updated",
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
            LocalDateTime.now(),
            true
        );

        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userRepository.update(any(User.class))).thenReturn(updatedUser);

        Optional<UserResponseDTO> result = userService.updateUser(userId, userUpdateDTO);

        assertTrue(result.isPresent());
        assertEquals("John Updated", result.get().getName());
        assertEquals("john.doe@example.com", result.get().getEmail());

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).existsByEmail(anyString());
        verify(userRepository, times(1)).update(any(User.class));
    }

    @Test
    @DisplayName("Should delete user successfully when user exists")
    void shouldDeleteUserSuccessfully() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        doNothing().when(userRepository).deleteById(userId);

        boolean result = userService.deleteUser(userId);

        assertTrue(result);

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when deleting user that does not exist")
    void shouldThrowResourceNotFoundExceptionWhenDeletingUserThatDoesNotExist() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, 
            () -> userService.deleteUser(userId));

        assertEquals("User not found with id: " + userId, exception.getMessage());
        assertEquals("USER_NOT_FOUND", exception.getErrorCode());

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).deleteById(any());
    }

    @Test
    @DisplayName("Should handle partial updates correctly")
    void shouldHandlePartialUpdatesCorrectly() {
        UserUpdateDTO partialUpdate = new UserUpdateDTO();
        partialUpdate.setName("Partial Update");
        // Only name is set, other fields remain null or default values

        User updatedUser = new User(
            userId,
            "Partial Update",
            "john.doe@example.com", // Original email preserved
            "12345-678", // Original CEP preserved
            -23.5505, // Original latitude preserved
            -46.6333, // Original longitude preserved
            "12345678901", // Original CPF preserved
            "+5511999998888", // Original phone preserved
            birthDate, // Original birth date preserved
            "São Paulo", // Original city preserved
            "SP", // Original state preserved
            "O+", // Original blood type preserved
            true, // Original notification preference preserved
            "COMMON_USER", // Original user profile preserved
            createdAt,
            LocalDateTime.now(),
            true // Original active status preserved
        );

        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userRepository.update(any(User.class))).thenReturn(updatedUser);

        Optional<UserResponseDTO> result = userService.updateUser(userId, partialUpdate);

        assertTrue(result.isPresent());
        assertEquals("Partial Update", result.get().getName());
        assertEquals("john.doe@example.com", result.get().getEmail()); // Unchanged
        assertEquals("+5511999998888", result.get().getPhone()); // Unchanged

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).update(any(User.class));
    }
}
