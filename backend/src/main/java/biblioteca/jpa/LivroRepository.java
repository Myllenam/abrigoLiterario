package biblioteca.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import biblioteca.model.Livro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    @Query("SELECT l FROM Livro l " +
            "WHERE (:titulo IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :titulo, '%'))) " +
            "AND (:categoria IS NULL OR l.categoria.id = :categoria) " +
            "AND (:autor IS NULL OR l.autor.id = :autor)")
    List<Livro> buscarPorFiltros(@Param("titulo") String titulo,
                                 @Param("categoria") Integer categoria,
                                 @Param("autor") Integer autor);


}
