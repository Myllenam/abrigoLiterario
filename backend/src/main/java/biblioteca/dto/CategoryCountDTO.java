package biblioteca.dto;

public class CategoryCountDTO {
    private String name;
    private long value;

    public CategoryCountDTO(String name, long value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public long getValue() {
        return value;
    }
}