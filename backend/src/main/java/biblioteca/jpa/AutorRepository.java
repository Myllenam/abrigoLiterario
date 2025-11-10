package biblioteca.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import biblioteca.model.Autor;

public interface AutorRepository extends JpaRepository<Autor, Long> {
}

