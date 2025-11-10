package biblioteca.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import biblioteca.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
