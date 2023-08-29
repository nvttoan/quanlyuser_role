package com.project1.spring.login.models;

import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  // @Enumerated(EnumType.STRING)
  @Column(name = "name")
  private String name;
  @Column(name = "code")
  private String code;
  @Column(name = "description")
  private String description;

  public Role() {

  }

  public Role(String name) {
    this.name = name;
    this.code = code;
    this.description = description;

  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  /**
   * @return String return the code
   */
  public String getCode() {
    return code;
  }

  /**
   * @param code the code to set
   */
  public void setCode(String code) {
    this.code = code;
  }

  /**
   * @return String return the description
   */
  public String getDescription() {
    return description;
  }

  /**
   * @param description the description to set
   */
  public void setDescription(String description) {
    this.description = description;
  }

}