package daw.todirverosol;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Jogador {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)

  private Integer id;

  private String nome;

  private String email;

  private String senha;

  private Integer saldo;

  private Integer[][] valores;

  private String imagem;

  private String lingua;

  private Boolean animacao;

  private Integer som;

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

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getSenha() {
    return senha;
  }

  public void setSenha(String senha) {
    this.senha = senha;
  }

  public Integer getSaldo() {
    return saldo;
  }

  public void setSaldo(Integer saldo) {
    this.saldo = saldo;
  }

  public Integer[][] getValores() {
    return valores;
  }

  public void setValores(Integer[][] valores) {
    this.valores = valores;
  }

  public String getImagem() {
    return imagem;
  }

  public void setImagem(String imagem) {
    this.imagem = imagem;
  }

  public String getLingua() {
    return lingua;
  }

  public void setLingua(String lingua) {
    this.lingua = lingua;
  }

  public Boolean getAnimacao() {
    return animacao;
  }

  public void setAnimacao(Boolean animacao) {
    this.animacao = animacao;
  }
   
  public Integer getSom() {
    return som;
  }

  public void setSom(Integer som) {
    this.som = som;
  } 

}
