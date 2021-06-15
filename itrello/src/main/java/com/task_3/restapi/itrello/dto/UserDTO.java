package com.task_3.restapi.itrello.dto;


import com.task_3.restapi.itrello.entities.Roles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO implements Serializable {

    private Long id;
    private String email;
    private String fullName;
    private String password;
    private List<Roles> roles;
    private String newPassword;

    public UserDTO(Long id, String email, String fullName, List<Roles> roles) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
    }

    public UserDTO(String password) {
        this.password = password;
    }

    public UserDTO(String password, String newPassword) {
        this.password = password;
        this.newPassword = newPassword;
    }
}
