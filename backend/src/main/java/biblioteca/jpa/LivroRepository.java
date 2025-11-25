package biblioteca.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import biblioteca.model.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long> {
        @Query("SELECT l FROM Livro l " +
                        "WHERE (:titulo IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :titulo, '%'))) " +
                        "AND (:categoria IS NULL OR l.categoria.id = :categoria) " +
                        "AND (:autor IS NULL OR l.autor.id = :autor)")
        List<Livro> buscarPorFiltros(@Param("titulo") String titulo,
                        @Param("categoria") Integer categoria,
                        @Param("autor") Integer autor);

        @Query("""
                        SELECT l.categoria.nome AS name, COUNT(l) AS total
                        FROM Livro l
                        GROUP BY l.categoria.nome
                        """)
        List<CategoryCountProjection> countByCategoria();

        interface CategoryCountProjection {
                String getName();

                Long getTotal();
        }

}
