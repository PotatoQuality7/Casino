package daw.todirverosol;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Jogo {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)

  private Integer id;

  private String nome;

  private String descricao;

  private String imagem;

  private Float multiplicador;

  private Float lucros;

  private Float perdas;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }

  public String getImagem() {
    return imagem;
  }

  public void setImagem(String imagem) {
    this.imagem = imagem;
  }

  public Float getMultiplicador() {
    return multiplicador;
  }

  public void setMultiplicador(Float multiplicador) {
    this.multiplicador = multiplicador;
  }

  public Float getLucros() {
    return lucros;
  }

  public void setLucros(Float lucros) {
    this.lucros = lucros;
  }

  public Float getPerdas() {
    return perdas;
  }

  public void setPerdas(Float perdas) {
    this.perdas = perdas;
  }

}
