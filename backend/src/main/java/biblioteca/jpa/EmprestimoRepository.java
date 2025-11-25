package biblioteca.jpa;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import biblioteca.model.Emprestimo;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByUsuarioId(Long usuarioId);

    long countByDataDevolucaoBefore(LocalDate date);

    long countByDataDevolucaoGreaterThanEqual(LocalDate date);

    List<Emprestimo> findTop5ByDataDevolucaoGreaterThanEqualOrderByDataDevolucaoAsc(LocalDate date);
}