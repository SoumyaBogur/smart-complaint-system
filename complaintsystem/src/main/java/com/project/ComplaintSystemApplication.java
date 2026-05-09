package com.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.project")
public class ComplaintSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(ComplaintSystemApplication.class, args);
    }
}