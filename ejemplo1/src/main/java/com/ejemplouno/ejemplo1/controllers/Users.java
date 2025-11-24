package com.ejemplouno.ejemplo1.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inicio")
public class Users {
    @GetMapping
    @ResponseBody
    public String defecto(){
        return "Mensaje de inicio";
    }

    @GetMapping("/primero")
    @ResponseBody
    public String primero(){
        return "Mensaje desde el primero";
    }

    @GetMapping("/segundo")
    @ResponseBody
    public String segundo(){
        return "Mensaje desde segundo";
    }

}
