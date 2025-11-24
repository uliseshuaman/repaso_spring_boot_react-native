package com.ejemplouno.ejemplo1.controllers;

import com.ejemplouno.ejemplo1.dto.UserDto;
import com.ejemplouno.ejemplo1.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/inicio/users")
@CrossOrigin(origins = "http://127.0.0.1:8081") // permite ese origen
public class UsersController {
    private final UserService userService;

    public UsersController(UserService userService){
        this.userService =userService;
    }

    // Crear usuario
    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
        UserDto created = userService.create(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Listar todos
    @GetMapping
    public ResponseEntity<List<UserDto>> listUsers() {
        List<UserDto> list = userService.findAll();
        return ResponseEntity.ok(list);
    }

    // Obtener por id
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        UserDto dto = userService.findById(id);
        return ResponseEntity.ok(dto);
    }

    // Actualizar (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @Valid @RequestBody UserDto userDto) {
        UserDto updated = userService.update(id, userDto);
        return ResponseEntity.ok(updated);
    }

    // Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoints de ejemplo que ya tenías (opcionales)
    @GetMapping("/info")
    public ResponseEntity<String> defecto() {
        return ResponseEntity.ok("Mensaje de inicio");
    }

    @GetMapping("/primero")
    public ResponseEntity<String> primero() {
        return ResponseEntity.ok("Mensaje desde el primero");
    }

    @GetMapping("/segundo")
    public ResponseEntity<String> segundo() {
        return ResponseEntity.ok("Mensaje desde segundo");
    }
}
