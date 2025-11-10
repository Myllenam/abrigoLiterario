package biblioteca.controller;

import biblioteca.jpa.ExemplarRepository;
import biblioteca.model.Exemplar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exemplar")
public class ExemplarController {
    @Autowired
    private ExemplarRepository exemplarRepository;

    @GetMapping
    public List<Exemplar> listarTodos() {
        return exemplarRepository.findAll();
    }

    @PostMapping
    public Exemplar criarExemplar(@RequestBody Exemplar exemplar) {
        return exemplarRepository.save(exemplar);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exemplar> atualizarExemplar(@PathVariable Long id, @RequestBody Exemplar exemplar) {
        return exemplarRepository.findById(id)
                .map(record -> {
                    record.setLivro(exemplar.getLivro());
                    Exemplar atualizado = exemplarRepository.save(record);
                    return ResponseEntity.ok().body(atualizado);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarLivro(@PathVariable Long id) {
        return exemplarRepository.findById(id)
                .map(record -> {
                    exemplarRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
