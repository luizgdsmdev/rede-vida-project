package com.redeemvida.rv.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.redeemvida.rv.infrastructure.repository")
public class DatabaseConfig {
}
