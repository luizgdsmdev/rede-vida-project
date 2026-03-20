package com.redeemvida.rv.domain.dto;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class UserUpdateDTOTest {

    private UserUpdateDTO userUpdateDTO;
    private LocalDateTime validBirthDate;

    @BeforeEach
    void setUp() {
        userUpdateDTO = new UserUpdateDTO();
        validBirthDate = LocalDateTime.of(1990, 5, 15, 10, 30);
    }

    @Test
    @DisplayName("Should create UserUpdateDTO with default values")
    void shouldCreateUserUpdateDTOWithDefaultValues() {
        UserUpdateDTO dto = new UserUpdateDTO();
        
        assertNull(dto.getName());
        assertNull(dto.getEmail());
        assertNull(dto.getCep());
        assertEquals(0.0, dto.getLatitude());
        assertEquals(0.0, dto.getLongitude());
        assertNull(dto.getCpf());
        assertNull(dto.getPhone());
        assertNull(dto.getBirthDate());
        assertNull(dto.getCity());
        assertNull(dto.getState());
        assertNull(dto.getBloodType());
        assertFalse(dto.isReceiveNotifications());
        assertNull(dto.getUserProfile());
        assertFalse(dto.isActive());
    }

    @Test
    @DisplayName("Should set and get name correctly")
    void shouldSetAndGetNameCorrectly() {
        String expectedName = "Updated Name";
        userUpdateDTO.setName(expectedName);
        
        assertEquals(expectedName, userUpdateDTO.getName());
    }

    @Test
    @DisplayName("Should set and get email correctly")
    void shouldSetAndGetEmailCorrectly() {
        String expectedEmail = "updated@example.com";
        userUpdateDTO.setEmail(expectedEmail);
        
        assertEquals(expectedEmail, userUpdateDTO.getEmail());
    }

    @Test
    @DisplayName("Should set and get CEP correctly")
    void shouldSetAndGetCepCorrectly() {
        String expectedCep = "54321-987";
        userUpdateDTO.setCep(expectedCep);
        
        assertEquals(expectedCep, userUpdateDTO.getCep());
    }

    @Test
    @DisplayName("Should set and get latitude correctly")
    void shouldSetAndGetLatitudeCorrectly() {
        double expectedLatitude = -22.9068;
        userUpdateDTO.setLatitude(expectedLatitude);
        
        assertEquals(expectedLatitude, userUpdateDTO.getLatitude(), 0.0001);
    }

    @Test
    @DisplayName("Should set and get longitude correctly")
    void shouldSetAndGetLongitudeCorrectly() {
        double expectedLongitude = -43.1729;
        userUpdateDTO.setLongitude(expectedLongitude);
        
        assertEquals(expectedLongitude, userUpdateDTO.getLongitude(), 0.0001);
    }

    @Test
    @DisplayName("Should set and get CPF correctly")
    void shouldSetAndGetCpfCorrectly() {
        String expectedCpf = "98765432100";
        userUpdateDTO.setCpf(expectedCpf);
        
        assertEquals(expectedCpf, userUpdateDTO.getCpf());
    }

    @Test
    @DisplayName("Should set and get phone correctly")
    void shouldSetAndGetPhoneCorrectly() {
        String expectedPhone = "+5521888887777";
        userUpdateDTO.setPhone(expectedPhone);
        
        assertEquals(expectedPhone, userUpdateDTO.getPhone());
    }

    @Test
    @DisplayName("Should set and get birth date correctly")
    void shouldSetAndGetBirthDateCorrectly() {
        userUpdateDTO.setBirthDate(validBirthDate);
        
        assertEquals(validBirthDate, userUpdateDTO.getBirthDate());
    }

    @Test
    @DisplayName("Should set and get city correctly")
    void shouldSetAndGetCityCorrectly() {
        String expectedCity = "Rio de Janeiro";
        userUpdateDTO.setCity(expectedCity);
        
        assertEquals(expectedCity, userUpdateDTO.getCity());
    }

    @Test
    @DisplayName("Should set and get state correctly")
    void shouldSetAndGetStateCorrectly() {
        String expectedState = "RJ";
        userUpdateDTO.setState(expectedState);
        
        assertEquals(expectedState, userUpdateDTO.getState());
    }

    @Test
    @DisplayName("Should set and get blood type correctly")
    void shouldSetAndGetBloodTypeCorrectly() {
        String expectedBloodType = "A-";
        userUpdateDTO.setBloodType(expectedBloodType);
        
        assertEquals(expectedBloodType, userUpdateDTO.getBloodType());
    }

    @Test
    @DisplayName("Should set and get receive notifications correctly")
    void shouldSetAndGetReceiveNotificationsCorrectly() {
        userUpdateDTO.setReceiveNotifications(true);
        
        assertTrue(userUpdateDTO.isReceiveNotifications());
        
        userUpdateDTO.setReceiveNotifications(false);
        
        assertFalse(userUpdateDTO.isReceiveNotifications());
    }

    @Test
    @DisplayName("Should set and get user profile correctly")
    void shouldSetAndGetUserProfileCorrectly() {
        String expectedUserProfile = "INSTITUTION";
        userUpdateDTO.setUserProfile(expectedUserProfile);
        
        assertEquals(expectedUserProfile, userUpdateDTO.getUserProfile());
    }

    @Test
    @DisplayName("Should set and get active correctly")
    void shouldSetAndGetActiveCorrectly() {
        userUpdateDTO.setActive(true);
        
        assertTrue(userUpdateDTO.isActive());
        
        userUpdateDTO.setActive(false);
        
        assertFalse(userUpdateDTO.isActive());
    }

    @Test
    @DisplayName("Should handle multiple field updates")
    void shouldHandleMultipleFieldUpdates() {
        userUpdateDTO.setName("John Updated");
        userUpdateDTO.setEmail("john.updated@example.com");
        userUpdateDTO.setPhone("+5511999999999");
        userUpdateDTO.setReceiveNotifications(false);
        userUpdateDTO.setActive(false);

        assertEquals("John Updated", userUpdateDTO.getName());
        assertEquals("john.updated@example.com", userUpdateDTO.getEmail());
        assertEquals("+5511999999999", userUpdateDTO.getPhone());
        assertFalse(userUpdateDTO.isReceiveNotifications());
        assertFalse(userUpdateDTO.isActive());
    }

    @Test
    @DisplayName("Should handle null values for optional fields")
    void shouldHandleNullValuesForOptionalFields() {
        userUpdateDTO.setName(null);
        userUpdateDTO.setEmail(null);
        userUpdateDTO.setCep(null);
        userUpdateDTO.setCpf(null);
        userUpdateDTO.setPhone(null);
        userUpdateDTO.setBirthDate(null);
        userUpdateDTO.setCity(null);
        userUpdateDTO.setState(null);
        userUpdateDTO.setBloodType(null);
        userUpdateDTO.setUserProfile(null);

        assertNull(userUpdateDTO.getName());
        assertNull(userUpdateDTO.getEmail());
        assertNull(userUpdateDTO.getCep());
        assertNull(userUpdateDTO.getCpf());
        assertNull(userUpdateDTO.getPhone());
        assertNull(userUpdateDTO.getBirthDate());
        assertNull(userUpdateDTO.getCity());
        assertNull(userUpdateDTO.getState());
        assertNull(userUpdateDTO.getBloodType());
        assertNull(userUpdateDTO.getUserProfile());
    }

    @Test
    @DisplayName("Should handle empty string values")
    void shouldHandleEmptyStringValues() {
        userUpdateDTO.setName("");
        userUpdateDTO.setEmail("");
        userUpdateDTO.setCep("");
        userUpdateDTO.setCpf("");
        userUpdateDTO.setPhone("");
        userUpdateDTO.setCity("");
        userUpdateDTO.setState("");
        userUpdateDTO.setBloodType("");
        userUpdateDTO.setUserProfile("");

        assertEquals("", userUpdateDTO.getName());
        assertEquals("", userUpdateDTO.getEmail());
        assertEquals("", userUpdateDTO.getCep());
        assertEquals("", userUpdateDTO.getCpf());
        assertEquals("", userUpdateDTO.getPhone());
        assertEquals("", userUpdateDTO.getCity());
        assertEquals("", userUpdateDTO.getState());
        assertEquals("", userUpdateDTO.getBloodType());
        assertEquals("", userUpdateDTO.getUserProfile());
    }

    @Test
    @DisplayName("Should handle zero values for numeric fields")
    void shouldHandleZeroValuesForNumericFields() {
        userUpdateDTO.setLatitude(0.0);
        userUpdateDTO.setLongitude(0.0);

        assertEquals(0.0, userUpdateDTO.getLatitude(), 0.0001);
        assertEquals(0.0, userUpdateDTO.getLongitude(), 0.0001);
    }

    @Test
    @DisplayName("Should handle negative values for coordinates")
    void shouldHandleNegativeValuesForCoordinates() {
        userUpdateDTO.setLatitude(-23.5505);
        userUpdateDTO.setLongitude(-46.6333);

        assertEquals(-23.5505, userUpdateDTO.getLatitude(), 0.0001);
        assertEquals(-46.6333, userUpdateDTO.getLongitude(), 0.0001);
    }

    @Test
    @DisplayName("Should handle positive values for coordinates")
    void shouldHandlePositiveValuesForCoordinates() {
        userUpdateDTO.setLatitude(23.5505);
        userUpdateDTO.setLongitude(46.6333);

        assertEquals(23.5505, userUpdateDTO.getLatitude(), 0.0001);
        assertEquals(46.6333, userUpdateDTO.getLongitude(), 0.0001);
    }

    @Test
    @DisplayName("Should handle boundary values for coordinates")
    void shouldHandleBoundaryValuesForCoordinates() {
        // Test latitude boundaries
        userUpdateDTO.setLatitude(-90.0);
        assertEquals(-90.0, userUpdateDTO.getLatitude(), 0.0001);

        userUpdateDTO.setLatitude(90.0);
        assertEquals(90.0, userUpdateDTO.getLatitude(), 0.0001);

        // Test longitude boundaries
        userUpdateDTO.setLongitude(-180.0);
        assertEquals(-180.0, userUpdateDTO.getLongitude(), 0.0001);

        userUpdateDTO.setLongitude(180.0);
        assertEquals(180.0, userUpdateDTO.getLongitude(), 0.0001);
    }

    @Test
    @DisplayName("Should handle extreme coordinate values")
    void shouldHandleExtremeCoordinateValues() {
        userUpdateDTO.setLatitude(-89.999999);
        userUpdateDTO.setLongitude(179.999999);

        assertEquals(-89.999999, userUpdateDTO.getLatitude(), 0.000001);
        assertEquals(179.999999, userUpdateDTO.getLongitude(), 0.000001);
    }

    @Test
    @DisplayName("Should handle all valid blood types")
    void shouldHandleAllValidBloodTypes() {
        String[] validBloodTypes = {"A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "ALL"};

        for (String bloodType : validBloodTypes) {
            userUpdateDTO.setBloodType(bloodType);
            assertEquals(bloodType, userUpdateDTO.getBloodType());
        }
    }

    @Test
    @DisplayName("Should handle both valid user profiles")
    void shouldHandleBothValidUserProfiles() {
        userUpdateDTO.setUserProfile("COMMON_USER");
        assertEquals("COMMON_USER", userUpdateDTO.getUserProfile());

        userUpdateDTO.setUserProfile("INSTITUTION");
        assertEquals("INSTITUTION", userUpdateDTO.getUserProfile());
    }

    @Test
    @DisplayName("Should handle phone number formats")
    void shouldHandlePhoneNumberFormats() {
        // With country code
        userUpdateDTO.setPhone("+5511999998888");
        assertEquals("+5511999998888", userUpdateDTO.getPhone());

        // Without country code
        userUpdateDTO.setPhone("11999998888");
        assertEquals("11999998888", userUpdateDTO.getPhone());

        // With international format
        userUpdateDTO.setPhone("+1234567890");
        assertEquals("+1234567890", userUpdateDTO.getPhone());
    }

    @Test
    @DisplayName("Should handle CEP formats")
    void shouldHandleCepFormats() {
        // With hyphen
        userUpdateDTO.setCep("12345-678");
        assertEquals("12345-678", userUpdateDTO.getCep());

        // Without hyphen
        userUpdateDTO.setCep("12345678");
        assertEquals("12345678", userUpdateDTO.getCep());
    }

    @Test
    @DisplayName("Should handle state formats")
    void shouldHandleStateFormats() {
        userUpdateDTO.setState("SP");
        assertEquals("SP", userUpdateDTO.getState());

        userUpdateDTO.setState("RJ");
        assertEquals("RJ", userUpdateDTO.getState());

        userUpdateDTO.setState("MG");
        assertEquals("MG", userUpdateDTO.getState());
    }

    @Test
    @DisplayName("Should handle birth date with time")
    void shouldHandleBirthDateWithTime() {
        LocalDateTime birthDateTime = LocalDateTime.of(1990, 5, 15, 14, 30, 45);
        userUpdateDTO.setBirthDate(birthDateTime);

        assertEquals(birthDateTime, userUpdateDTO.getBirthDate());
    }

    @Test
    @DisplayName("Should handle name with special characters")
    void shouldHandleNameWithSpecialCharacters() {
        String nameWithAccent = "João da Silva";
        userUpdateDTO.setName(nameWithAccent);

        assertEquals(nameWithAccent, userUpdateDTO.getName());
    }

    @Test
    @DisplayName("Should handle city with special characters")
    void shouldHandleCityWithSpecialCharacters() {
        String cityWithAccent = "São José dos Campos";
        userUpdateDTO.setCity(cityWithAccent);

        assertEquals(cityWithAccent, userUpdateDTO.getCity());
    }

    @Test
    @DisplayName("Should maintain independence between instances")
    void shouldMaintainIndependenceBetweenInstances() {
        UserUpdateDTO dto1 = new UserUpdateDTO();
        UserUpdateDTO dto2 = new UserUpdateDTO();

        dto1.setName("Name 1");
        dto2.setName("Name 2");

        assertEquals("Name 1", dto1.getName());
        assertEquals("Name 2", dto2.getName());
    }

    @Test
    @DisplayName("Should allow field updates after initial values")
    void shouldAllowFieldUpdatesAfterInitialValues() {
        // Set initial values
        userUpdateDTO.setName("Initial Name");
        userUpdateDTO.setEmail("initial@example.com");
        userUpdateDTO.setReceiveNotifications(true);

        // Update values
        userUpdateDTO.setName("Updated Name");
        userUpdateDTO.setEmail("updated@example.com");
        userUpdateDTO.setReceiveNotifications(false);

        assertEquals("Updated Name", userUpdateDTO.getName());
        assertEquals("updated@example.com", userUpdateDTO.getEmail());
        assertFalse(userUpdateDTO.isReceiveNotifications());
    }
}
