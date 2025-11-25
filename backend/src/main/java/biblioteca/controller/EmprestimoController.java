package biblioteca.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import biblioteca.jpa.EmprestimoRepository;
import biblioteca.jpa.LivroRepository;
import biblioteca.jpa.UsuarioRepository;
import biblioteca.model.Emprestimo;
import biblioteca.model.Livro;
import biblioteca.model.Usuario;
import biblioteca.utils.EmprestimoRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private LivroRepository livroRepository;

    @PostMapping
    public ResponseEntity<?> criarEmprestimo(@RequestBody @Valid EmprestimoRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId().intValue())
                .orElse(null);
        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuário não encontrado");
        }

        Livro livro = livroRepository.findById(request.getLivroId())
                .orElse(null);
        if (livro == null) {
            return ResponseEntity.badRequest().body("Livro não encontrado");
        }

        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setUsuario(usuario);
        emprestimo.setLivro(livro);
        emprestimo.setDataEmprestimo(LocalDate.now());
        emprestimo.setDataDevolucao(request.getDataDevolucao());

        Emprestimo salvo = emprestimoRepository.save(emprestimo);
        return ResponseEntity.ok(salvo);
    }

     @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Emprestimo>> listarPorUsuario(@PathVariable Long usuarioId) {
        List<Emprestimo> emprestimos = emprestimoRepository.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(emprestimos);
    }
}