package biblioteca.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Categoria {
	@Id
 	@GeneratedValue(strategy = GenerationType.IDENTITY)
 	private Long id;

	@NotBlank(message = "A categoria precisa ser informada")
 	@Column(nullable = false, unique = true)
	@Size(min=3, message = "A categoria precisa ter pelo menos 3 caracteres")
 	private String nome;

 	@OneToMany(mappedBy = "categoria")
 	private List<Livro> livros;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}

	@JsonIgnore
	public List<Livro> getLivros() {
		return livros;
	}
	
	public void setLivros(List<Livro> livros) {
		this.livros = livros;
	}
}
