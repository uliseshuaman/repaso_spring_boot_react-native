package com.ejemplouno.ejemplo1.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private Long id;
    @NotBlank(message="El nombre es obligatorio")
    private String name;

    @NotNull(message = "La edad es obligatorio")
    @Min(value=0, message = "La edad debe ser >= 0")
    private Integer age;
}
