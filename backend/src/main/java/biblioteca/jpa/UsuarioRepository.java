package biblioteca.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import biblioteca.model.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);
}

