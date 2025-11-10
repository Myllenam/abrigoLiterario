package biblioteca.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "O título do livro precisa ser informado")
    @Size(min = 2, message = "O título do livro precisa ter ao menos 2 caracteres")
    private String titulo;

    @Column(nullable = false)
    @NotBlank(message = "A URL da capa do livro precisa ser informada")
    @Size(min = 5, message = "Url Inválida")
    private String urlCapa;

    @Column(nullable = false)
    @NotBlank(message = "A descrição do livro precisa ser informada")
    @Size(min = 10, max = 1000, message = "A descrição precisa ter entre 10 e 1000 caracteres")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private Autor autor;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @OneToMany(mappedBy = "livro")
    private List<Exemplar> exemplar;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Autor getAutor() {
        return autor;
    }

    public void setAutor(Autor autor) {
        this.autor = autor;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getUrlCapa() {
        return urlCapa;
    }

    public void setUrlCapa(String urlCapa) {
        this.urlCapa = urlCapa;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @JsonIgnore
    public List<Exemplar> getExemplar() {
        return exemplar;
    }

    public void setExemplar(List<Exemplar> exemplar) {
        this.exemplar = exemplar;
    }
}
