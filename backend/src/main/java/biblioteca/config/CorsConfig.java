package biblioteca.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Aplica para todas as rotas da API
                .allowedOrigins("http://localhost:5173")  // Permite apenas a origem do front-end (ajuste para o seu caso)
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Métodos permitidos
                .allowedHeaders("*")  // Permite todos os cabeçalhos
                .allowCredentials(true);  // Permite o envio de cookies/credenciais
    }
}
