package com.ejemplouno.ejemplo1.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("Usuario no encontrado con id: "+id);
    }
}
