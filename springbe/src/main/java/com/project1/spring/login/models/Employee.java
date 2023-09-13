// package com.project1.spring.login.models;

// import javax.persistence.Column;
// import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
// import javax.persistence.Id;
// import javax.persistence.Table;

// @Entity
// @Table(name = "employees")
// public class Employee {
// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private long id;
// @Column(name = "first_name")
// private String firstName;
// @Column(name = "last_name")
// private String lastName;
// @Column(name = "age")
// private long age;
// @Column(name = "email_id")
// private String emailId;

// public Employee() {

// }

// public Employee(String firstName, String lastName, long age, String emailId)
// {
// super();
// this.firstName = firstName;
// this.lastName = lastName;
// this.age = age;
// this.emailId = emailId;
// }

// /**
// * @return long return the id
// */
// public long getId() {
// return id;
// }

// /**
// * @param id the id to set
// */
// public void setId(long id) {
// this.id = id;
// }

// /**
// * @return String return the firstName
// */
// public String getFirstName() {
// return firstName;
// }

// /**
// * @param firstName the firstName to set
// */
// public void setFirstName(String firstName) {
// this.firstName = firstName;
// }

// /**
// * @return String return the lastName
// */
// public String getLastName() {
// return lastName;
// }

// /**
// * @param lastName the lastName to set
// */
// public void setLastName(String lastName) {
// this.lastName = lastName;
// }

// /**
// * @return String return the emailId
// */
// public String getEmailId() {
// return emailId;
// }

// /**
// * @param emailId the emailId to set
// */
// public void setEmailId(String emailId) {
// this.emailId = emailId;
// }

// /**
// * @return long return the age
// */
// public long getAge() {
// return age;
// }

// /**
// * @param age the age to set
// */
// public void setAge(long age) {
// this.age = age;
// }

// }
