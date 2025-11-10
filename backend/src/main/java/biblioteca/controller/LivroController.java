package biblioteca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import biblioteca.jpa.LivroRepository;
import biblioteca.model.Livro;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    @Autowired
    private LivroRepository livroRepository;

    @GetMapping()
    public List<Livro> listarLivros(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) Integer categoria,
            @RequestParam(required = false) Integer autor) {
        return livroRepository.buscarPorFiltros(
                titulo != null && !titulo.isEmpty() ? titulo : "",
                categoria,
                autor);
    }

    @PostMapping
    public Livro criarLivro(@RequestBody Livro livro) {
        return livroRepository.save(livro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizarLivro(@PathVariable Long id, @RequestBody Livro livro) {
        return livroRepository.findById(id)
                .map(record -> {
                    record.setTitulo(livro.getTitulo());
                    record.setAutor(livro.getAutor());
                    record.setCategoria(livro.getCategoria());
                    record.setUrlCapa(livro.getUrlCapa());
                    record.setDescricao(livro.getDescricao());
                    Livro atualizado = livroRepository.save(record);
                    return ResponseEntity.ok().body(atualizado);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarLivro(@PathVariable Long id) {
        return livroRepository.findById(id)
                .map(record -> {
                    livroRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}

