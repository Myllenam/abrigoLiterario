package biblioteca.services;

import biblioteca.jpa.UsuarioRepository;
import biblioteca.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario validarCredenciais(String email, String senha) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        if (usuarioOpt.isPresent() && usuarioOpt.get().getSenha().equals(senha)) {
            return usuarioOpt.get();
        }
        return null;
    }

}
