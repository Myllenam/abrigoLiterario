package biblioteca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import biblioteca.jpa.AutorRepository;
import biblioteca.model.Autor;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/autores")
public class AutorController {

    @Autowired
    private AutorRepository autorRepository;

    @GetMapping
    public List<Autor> listarTodos() {
        return autorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Autor> buscarPorId(@PathVariable Long id) {
        return autorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Autor> criarAutor(@Valid @RequestBody Autor autor) {
        Autor savedAutor = autorRepository.save(autor);
        return ResponseEntity.ok(savedAutor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Autor> atualizarAutor(@PathVariable Long id, @RequestBody @Valid Autor autor) {
        return autorRepository.findById(id)
                .map(record -> {
                    record.setNome(autor.getNome());
                    Autor atualizado = autorRepository.save(record);
                    return ResponseEntity.ok(atualizado);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarAutor(@PathVariable Long id) {
        return autorRepository.findById(id)
                .map(record -> {
                    autorRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
