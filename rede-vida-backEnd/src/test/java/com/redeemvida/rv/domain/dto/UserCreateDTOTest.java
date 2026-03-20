package com.redeemvida.rv.domain.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class UserCreateDTOTest {

    private ValidatorFactory validatorFactory;
    private Validator validator;
    private UserCreateDTO userCreateDTO;
    private LocalDateTime validBirthDate;

    @BeforeEach
    void setUp() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
        
        validBirthDate = LocalDateTime.of(1990, 5, 15, 10, 30);
        
        userCreateDTO = new UserCreateDTO(
            "John Doe",
            "john.doe@example.com",
            "12345-678",
            -23.5505,
            -46.6333,
            "12345678901",
            "+5511999998888",
            validBirthDate,
            "São Paulo",
            "SP",
            "O+",
            true,
            "COMMON_USER"
        );
    }

    @AfterEach
    void tearDown() {
        validatorFactory.close();
    }

    @Test
    @DisplayName("Should validate user with all valid fields")
    void shouldValidateUserWithAllValidFields() {
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should validate user with CEP without hyphen")
    void shouldValidateUserWithCepWithoutHyphen() {
        userCreateDTO.setCep("12345678");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should validate user with ALL blood type")
    void shouldValidateUserWithAllBloodType() {
        userCreateDTO.setBloodType("ALL");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should validate all blood types")
    void shouldValidateAllBloodTypes() {
        String[] validBloodTypes = {"A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "ALL"};
        
        for (String bloodType : validBloodTypes) {
            userCreateDTO.setBloodType(bloodType);
            Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
            assertTrue(violations.isEmpty(), "Blood type " + bloodType + " should be valid");
        }
    }

    @Test
    @DisplayName("Should validate user with INSTITUTION profile")
    void shouldValidateUserWithInstitutionProfile() {
        userCreateDTO.setUserProfile("INSTITUTION");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should validate user with phone without country code")
    void shouldValidateUserWithPhoneWithoutCountryCode() {
        userCreateDTO.setPhone("11999998888");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should validate user with minimum valid phone length")
    void shouldValidateUserWithMinimumValidPhoneLength() {
        userCreateDTO.setPhone("1234567890");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should validate user with maximum valid phone length")
    void shouldValidateUserWithMaximumValidPhoneLength() {
        userCreateDTO.setPhone("123456789012345");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should validate user with boundary latitude values")
    void shouldValidateUserWithBoundaryLatitudeValues() {
        // Test minimum latitude
        userCreateDTO.setLatitude(-90.0);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty(), "Latitude -90.0 should be valid");

        // Test maximum latitude
        userCreateDTO.setLatitude(90.0);
        violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty(), "Latitude 90.0 should be valid");
    }

    @Test
    @DisplayName("Should validate user with boundary longitude values")
    void shouldValidateUserWithBoundaryLongitudeValues() {
        // Test minimum longitude
        userCreateDTO.setLongitude(-180.0);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty(), "Longitude -180.0 should be valid");

        // Test maximum longitude
        userCreateDTO.setLongitude(180.0);
        violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty(), "Longitude 180.0 should be valid");
    }

    @Test
    @DisplayName("Should validate user with minimum city name length")
    void shouldValidateUserWithMinimumCityNameLength() {
        userCreateDTO.setCity("SP");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should validate user with maximum city name length")
    void shouldValidateUserWithMaximumCityNameLength() {
        String maxCityName = "a".repeat(50);
        userCreateDTO.setCity(maxCityName);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should validate user with maximum email length")
    void shouldValidateUserWithMaximumEmailLength() {
        String maxEmail = "a".repeat(86) + "@example.com"; // 99 characters total
        userCreateDTO.setEmail(maxEmail);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should validate user with minimum name length")
    void shouldValidateUserWithMinimumNameLength() {
        userCreateDTO.setName("AB");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should validate user with maximum name length")
    void shouldValidateUserWithMaximumNameLength() {
        String maxName = "a".repeat(100);
        userCreateDTO.setName(maxName);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertTrue(violations.isEmpty());
    }

    // Negative test cases

    @Test
    @DisplayName("Should reject user with null name")
    void shouldRejectUserWithNullName() {
        userCreateDTO.setName(null);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("Name is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with blank name")
    void shouldRejectUserWithBlankName() {
        userCreateDTO.setName("");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("Name is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with name too short")
    void shouldRejectUserWithNameTooShort() {
        userCreateDTO.setName("A");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("Name must be between 2 and 100 characters"));
    }

    @Test
    @DisplayName("Should reject user with name too long")
    void shouldRejectUserWithNameTooLong() {
        userCreateDTO.setName("a".repeat(101));
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("Name must be between 2 and 100 characters"));
    }

    @Test
    @DisplayName("Should reject user with null email")
    void shouldRejectUserWithNullEmail() {
        userCreateDTO.setEmail(null);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("Email is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with blank email")
    void shouldRejectUserWithBlankEmail() {
        userCreateDTO.setEmail("");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("Email is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with invalid email format")
    void shouldRejectUserWithInvalidEmailFormat() {
        userCreateDTO.setEmail("invalid-email");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("Invalid email format", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with email too long")
    void shouldRejectUserWithEmailTooLong() {
        String tooLongEmail = "a".repeat(90) + "@example.com"; // 103 characters total
        userCreateDTO.setEmail(tooLongEmail);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("Email must be less than 100 characters"));
    }

    @Test
    @DisplayName("Should reject user with null CEP")
    void shouldRejectUserWithNullCep() {
        userCreateDTO.setCep(null);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("CEP is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with blank CEP")
    void shouldRejectUserWithBlankCep() {
        userCreateDTO.setCep("");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("CEP is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with invalid CEP format")
    void shouldRejectUserWithInvalidCepFormat() {
        userCreateDTO.setCep("1234-5678");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("CEP must be in format XXXXX-XXX or XXXXXXXX"));
    }

    @Test
    @DisplayName("Should reject user with latitude below minimum")
    void shouldRejectUserWithLatitudeBelowMinimum() {
        userCreateDTO.setLatitude(-90.1);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("Latitude must be between -90 and 90"));
    }

    @Test
    @DisplayName("Should reject user with latitude above maximum")
    void shouldRejectUserWithLatitudeAboveMaximum() {
        userCreateDTO.setLatitude(90.1);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("Latitude must be between -90 and 90"));
    }

    @Test
    @DisplayName("Should reject user with longitude below minimum")
    void shouldRejectUserWithLongitudeBelowMinimum() {
        userCreateDTO.setLongitude(-180.1);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("Longitude must be between -180 and 180"));
    }

    @Test
    @DisplayName("Should reject user with longitude above maximum")
    void shouldRejectUserWithLongitudeAboveMaximum() {
        userCreateDTO.setLongitude(180.1);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("Longitude must be between -180 and 180"));
    }

    @Test
    @DisplayName("Should reject user with null CPF")
    void shouldRejectUserWithNullCpf() {
        userCreateDTO.setCpf(null);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("CPF is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with blank CPF")
    void shouldRejectUserWithBlankCpf() {
        userCreateDTO.setCpf("");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("CPF is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with invalid CPF format")
    void shouldRejectUserWithInvalidCpfFormat() {
        userCreateDTO.setCpf("123.456.789-01");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("CPF must contain exactly 11 digits"));
    }

    @Test
    @DisplayName("Should reject user with CPF too short")
    void shouldRejectUserWithCpfTooShort() {
        userCreateDTO.setCpf("1234567890");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("CPF must contain exactly 11 digits"));
    }

    @Test
    @DisplayName("Should reject user with CPF too long")
    void shouldRejectUserWithCpfTooLong() {
        userCreateDTO.setCpf("123456789012");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("CPF must contain exactly 11 digits"));
    }

    @Test
    @DisplayName("Should reject user with null phone")
    void shouldRejectUserWithNullPhone() {
        userCreateDTO.setPhone(null);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("Phone is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with blank phone")
    void shouldRejectUserWithBlankPhone() {
        userCreateDTO.setPhone("");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("Phone is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with phone too short")
    void shouldRejectUserWithPhoneTooShort() {
        userCreateDTO.setPhone("123456789");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("Phone must be between 10 and 15 digits"));
    }

    @Test
    @DisplayName("Should reject user with phone too long")
    void shouldRejectUserWithPhoneTooLong() {
        userCreateDTO.setPhone("1234567890123456");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("Phone must be between 10 and 15 digits"));
    }

    @Test
    @DisplayName("Should reject user with phone containing letters")
    void shouldRejectUserWithPhoneContainingLetters() {
        userCreateDTO.setPhone("1234567890a");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("Phone must be between 10 and 15 digits"));
    }

    @Test
    @DisplayName("Should reject user with null birth date")
    void shouldRejectUserWithNullBirthDate() {
        userCreateDTO.setBirthDate(null);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("Birth date is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with future birth date")
    void shouldRejectUserWithFutureBirthDate() {
        userCreateDTO.setBirthDate(LocalDateTime.now().plusDays(1));
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("Birth date must be in the past", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with null city")
    void shouldRejectUserWithNullCity() {
        userCreateDTO.setCity(null);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("City is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with blank city")
    void shouldRejectUserWithBlankCity() {
        userCreateDTO.setCity("");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("City is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with city too short")
    void shouldRejectUserWithCityTooShort() {
        userCreateDTO.setCity("A");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("City must be between 2 and 50 characters"));
    }

    @Test
    @DisplayName("Should reject user with city too long")
    void shouldRejectUserWithCityTooLong() {
        userCreateDTO.setCity("a".repeat(51));
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("City must be between 2 and 50 characters"));
    }

    @Test
    @DisplayName("Should reject user with null state")
    void shouldRejectUserWithNullState() {
        userCreateDTO.setState(null);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("State is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with blank state")
    void shouldRejectUserWithBlankState() {
        userCreateDTO.setState("");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("State is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with state too short")
    void shouldRejectUserWithStateTooShort() {
        userCreateDTO.setState("S");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("State must be exactly 2 characters"));
    }

    @Test
    @DisplayName("Should reject user with state too long")
    void shouldRejectUserWithStateTooLong() {
        userCreateDTO.setState("SPP");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("State must be exactly 2 characters"));
    }

    @Test
    @DisplayName("Should reject user with state in lowercase")
    void shouldRejectUserWithStateInLowercase() {
        userCreateDTO.setState("sp");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("State must contain only uppercase letters"));
    }

    @Test
    @DisplayName("Should reject user with null blood type")
    void shouldRejectUserWithNullBloodType() {
        userCreateDTO.setBloodType(null);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("Blood type is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with blank blood type")
    void shouldRejectUserWithBlankBloodType() {
        userCreateDTO.setBloodType("");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("Blood type is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with invalid blood type")
    void shouldRejectUserWithInvalidBloodType() {
        userCreateDTO.setBloodType("X+");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("Blood type must be A+, A-, B+, B-, AB+, AB-, O+, O-, or ALL"));
    }

    @Test
    @DisplayName("Should reject user with null user profile")
    void shouldRejectUserWithNullUserProfile() {
        userCreateDTO.setUserProfile(null);
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("User profile is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with blank user profile")
    void shouldRejectUserWithBlankUserProfile() {
        userCreateDTO.setUserProfile("");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertEquals("User profile is required", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject user with invalid user profile")
    void shouldRejectUserWithInvalidUserProfile() {
        userCreateDTO.setUserProfile("ADMIN");
        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(1, violations.size());
        assertTrue(violations.iterator().next().getMessage().contains("User profile must be COMMON_USER or INSTITUTION"));
    }

    @Test
    @DisplayName("Should reject user with multiple validation errors")
    void shouldRejectUserWithMultipleValidationErrors() {
        userCreateDTO.setName(""); // Invalid name
        userCreateDTO.setEmail("invalid-email"); // Invalid email
        userCreateDTO.setCep("invalid-cep"); // Invalid CEP

        Set<ConstraintViolation<UserCreateDTO>> violations = validator.validate(userCreateDTO);
        assertEquals(3, violations.size());
    }
}
