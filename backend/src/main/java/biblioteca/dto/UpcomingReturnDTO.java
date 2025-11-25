package biblioteca.dto;

public class UpcomingReturnDTO {
    private Long id;
    private String titulo;
    private String leitor;
    private String dataDevolucao;
    private String status;

    public UpcomingReturnDTO(Long id, String titulo, String leitor, String dataDevolucao, String status) {
        this.id = id;
        this.titulo = titulo;
        this.leitor = leitor;
        this.dataDevolucao = dataDevolucao;
        this.status = status;
    }

    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getLeitor() { return leitor; }
    public String getDataDevolucao() { return dataDevolucao; }
    public String getStatus() { return status; }
}