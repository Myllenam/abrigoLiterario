package biblioteca.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "O nome do usuário precisa ser informado")
    @Size(min = 2, message = "O nome do usuário deve ter ao menos 2 caracteres")
    private String nome;

    @Column(nullable = false)
    @NotBlank(message = "A senha precisa ser informada")
    @Size(min = 6, message = "A senha deve ter ao menos 2 caracteres")
    private String senha;

    @Column(nullable = false)
    @NotBlank(message = "O email do usuário precisa ser informado")
    @Email(message = "Email inválido")
    private String email;

    @Enumerated(EnumType.STRING)
    @NotNull
    private RoleEnum role;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }
}
