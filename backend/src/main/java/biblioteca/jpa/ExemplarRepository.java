package biblioteca.jpa;

import biblioteca.model.Exemplar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExemplarRepository extends JpaRepository<Exemplar, Long> {
}
