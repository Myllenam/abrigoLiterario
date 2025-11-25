package biblioteca.controller;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import biblioteca.dto.AdminDashboardDTO;
import biblioteca.dto.CategoryCountDTO;
import biblioteca.dto.UpcomingReturnDTO;
import biblioteca.jpa.EmprestimoRepository;
import biblioteca.jpa.LivroRepository;
import biblioteca.jpa.UsuarioRepository;
import biblioteca.model.RoleEnum;
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @GetMapping("/admin")
    public AdminDashboardDTO getAdminDashboard() {
        LocalDate hoje = LocalDate.now();

        long totalBooks = livroRepository.count();
        long borrowedBooks = emprestimoRepository.countByDataDevolucaoGreaterThanEqual(hoje);
        long availableBooks = totalBooks - borrowedBooks;

        long totalUsers = usuarioRepository.count();
        long admins = usuarioRepository.countByRole(RoleEnum.ADMIN);
        long readers = usuarioRepository.countByRole(RoleEnum.LEITOR);

        long lateLoans = emprestimoRepository.countByDataDevolucaoBefore(hoje);

        
        List<CategoryCountDTO> categories = livroRepository.countByCategoria().stream()
                .map(p -> new CategoryCountDTO(p.getName(), p.getTotal()))
                .toList();

        
        List<UpcomingReturnDTO> upcoming = emprestimoRepository
                .findTop5ByDataDevolucaoGreaterThanEqualOrderByDataDevolucaoAsc(hoje)
                .stream()
                .map(e -> new UpcomingReturnDTO(
                        e.getId(),
                        e.getLivro().getTitulo(),
                        e.getUsuario().getNome(),
                        e.getDataDevolucao().toString(),
                        e.getDataDevolucao().isBefore(hoje) ? "Atrasado" : "No prazo"
                ))
                .toList();

        return new AdminDashboardDTO(
                totalBooks,
                borrowedBooks,
                availableBooks,
                totalUsers,
                admins,
                readers,
                lateLoans,
                categories,
                upcoming
        );
    }
}