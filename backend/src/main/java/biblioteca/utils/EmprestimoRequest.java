package biblioteca.utils;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public class EmprestimoRequest {

    @NotNull
    private Long usuarioId;

    @NotNull
    private Long livroId;

    @NotNull
    private LocalDate dataDevolucao; 

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getLivroId() {
        return livroId;
    }

    public void setLivroId(Long livroId) {
        this.livroId = livroId;
    }

    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

    public void setDataDevolucao(LocalDate dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }
}