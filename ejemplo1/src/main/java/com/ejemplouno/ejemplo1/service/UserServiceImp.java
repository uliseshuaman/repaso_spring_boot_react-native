package com.ejemplouno.ejemplo1.service;

import com.ejemplouno.ejemplo1.dto.UserDto;
import com.ejemplouno.ejemplo1.exceptions.UserNotFoundException;
import com.ejemplouno.ejemplo1.model.User;
import com.ejemplouno.ejemplo1.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImp implements UserService{
    @Autowired
    private final UserRepository userRepository;

    public UserServiceImp(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    private UserDto toDto(User user){
        return new UserDto(user.getId(), user.getName(), user.getAge());
    }

    private User toEntity(UserDto dto){
        User u = new User();
        u.setId(dto.getId());
        u.setName(dto.getName());
        u.setAge(dto.getAge()!= null ? dto.getAge(): 0);
        return u;
    }
    @Override
    public UserDto create(UserDto userDto) {
        User user = toEntity(userDto);
        //id null para que se genere el ID
        user.setId(null);
        User saved = userRepository.save(user);
        return toDto(saved);
    }

    @Override
    //@Transactional(readOnly = true)
    public List<UserDto> findAll() {
        return userRepository.findAll()
                .stream()
                .map(this :: toDto)//llama a la función toDto y le pasa User, toDto(user)
                .collect(Collectors.toList());
    }

    @Override
    //@Transactional(readOnly = true)
    public UserDto findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return toDto(user);
    }

    @Override
    public UserDto update(Long id, UserDto userDto) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        if (userDto.getName() != null) existing.setName(userDto.getName());
        if (userDto.getAge() != null) existing.setAge(userDto.getAge());
        User updated = userRepository.save(existing);
        return toDto(updated);
    }

    @Override
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
    }
}
