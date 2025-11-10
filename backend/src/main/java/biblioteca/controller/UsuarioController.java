package biblioteca.controller;

import java.util.List;

import biblioteca.services.UsuarioService;
import biblioteca.utils.LoginRequest;
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

import biblioteca.jpa.UsuarioRepository;
import biblioteca.model.Usuario;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
        return usuarioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Usuario criarUsuario(@RequestBody @Valid Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> validarLogin(@RequestBody LoginRequest loginRequest) {
        Usuario user = usuarioService.validarCredenciais(loginRequest.getEmail(), loginRequest.getSenha());
        if (user != null) {
            user.setSenha("");
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body("Credenciais inválidas.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Integer id, @RequestBody @Valid Usuario usuario) {
        return usuarioRepository.findById(id)
                .map(record -> {
                    record.setNome(usuario.getNome());
                    record.setEmail(usuario.getEmail());
                    record.setSenha(usuario.getSenha());
                    Usuario atualizado = usuarioRepository.save(record);
                    return ResponseEntity.ok(atualizado);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarUsuario(@PathVariable Integer id) {
        return usuarioRepository.findById(id)
                .map(record -> {
                    usuarioRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
