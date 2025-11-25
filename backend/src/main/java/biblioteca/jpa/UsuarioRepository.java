package biblioteca.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import biblioteca.model.RoleEnum;
import biblioteca.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);

    long countByRole(RoleEnum role);
}
