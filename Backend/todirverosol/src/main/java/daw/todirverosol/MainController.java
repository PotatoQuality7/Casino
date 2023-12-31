package daw.todirverosol;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path="/demo")
public class MainController {

	@Autowired
	private JogadorRepository jogadorRepository;

	@PostMapping(path="/add") 
	public String adicionarJogador(@RequestBody Jogador jogador) {
		jogadorRepository.save(jogador);
    	return "Saved\n";
	}

	@PutMapping(path="/update/{id}") 
	public String atualizarJogador(@PathVariable Integer id, @RequestBody Jogador jogador) {
	    jogador.setId(id);
		jogadorRepository.save(jogador);    
	    return "Atualizado\n";
	}

	@GetMapping(path="/findAll")
		public @ResponseBody Iterable<Jogador> getAllJogadores() {
		return jogadorRepository.findAll();
	}

	@GetMapping(path="/findById/{id}")
		public @ResponseBody Object getById(@PathVariable Integer id) {
		return jogadorRepository.findById(id);
	}

	@DeleteMapping(path="/deleteAll")
	public @ResponseBody String delete() {
		jogadorRepository.deleteAll();
		return "Tudo apagado\n";
	}

	@DeleteMapping(path="/deleteById/{id}")
	public @ResponseBody String deleteById(@PathVariable Integer id) {
		jogadorRepository.deleteById(id);
		return "Usuario apagado\n";
	}
  
}
