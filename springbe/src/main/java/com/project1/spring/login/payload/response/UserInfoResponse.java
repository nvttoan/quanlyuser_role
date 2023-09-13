package com.project1.spring.login.payload.response;

import java.util.List;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UserInfoResponse {
	private Long id;
	private String username;
	private String email;
	private String name;
	private String position;
	private Long age;
	private List<String> roles;

	public UserInfoResponse(Long id, String username, String email, String name, String position, Long age,
			List<String> roles) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.name = name;
		this.position = position;
		this.age = age;
		this.roles = roles;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}
}
