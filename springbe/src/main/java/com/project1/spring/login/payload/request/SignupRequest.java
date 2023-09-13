package com.project1.spring.login.payload.request;

import java.util.Set;

import javax.validation.constraints.*;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@RequiredArgsConstructor
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    @NotBlank
    private String name;
    @NotBlank
    private String position;
    @NotNull
    private Long age;
    private Set<String> role;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

}
