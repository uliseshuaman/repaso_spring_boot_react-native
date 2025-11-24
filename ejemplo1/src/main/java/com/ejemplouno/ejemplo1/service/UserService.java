package com.ejemplouno.ejemplo1.service;

import com.ejemplouno.ejemplo1.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto create(UserDto userDto);
    List<UserDto> findAll();
    UserDto findById(Long id);
    UserDto update(Long id, UserDto userDto);
    void delete(Long id);
}
