package com.redeemvida.rv.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Rede Vida Project API")
                        .description("A comprehensive blood donation platform API that connects blood donors with recipients and blood banks")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Rede Vida Team")
                                .email("contact@redevida.com")
                                .url("https://github.com/luizgdsmdev/rede-vida-project"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080/api/v1")
                                .description("Development server"),
                        new Server()
                                .url("https://api.redevida.com/api/v1")
                                .description("Production server")
                ));
    }
}
