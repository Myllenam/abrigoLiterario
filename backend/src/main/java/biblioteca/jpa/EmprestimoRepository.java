package biblioteca.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import biblioteca.model.Emprestimo;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByUsuarioId(Long usuarioId);
}