package com.bezkoder.spring.login.models;

public class PasswordChangeRequest {
    private String oldPassword;
    private String newPassword;
    private String confirmNewPassword;

    // Định nghĩa các phương thức getter và setter cho các thuộc tính

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmNewPassword() {
        return confirmNewPassword;
    }

    public void setConfirmNewPassword(String confirmNewPassword) {
        this.confirmNewPassword = confirmNewPassword;
    }
}

