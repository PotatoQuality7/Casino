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
	private JogoRepository jogoRepository;

	@PostMapping(path="/add") 
	public String adicionarJogo(@RequestBody Jogo jogo) {
		jogoRepository.save(jogo);
    	return "Saved\n";
	}

	@PutMapping(path="/update/{id}") 
	public String atualizarJogo(@PathVariable Integer id, @RequestBody Jogo jogo) {
	    jogo.setId(id);
		jogoRepository.save(jogo);    
	    return "Atualizado\n";
	}

	@GetMapping(path="/findAll")
		public @ResponseBody Iterable<Jogo> getAllJogoes() {
		return jogoRepository.findAll();
	}

	@GetMapping(path="/findById/{id}")
		public @ResponseBody Object getById(@PathVariable Integer id) {
		return jogoRepository.findById(id);
	}

	@DeleteMapping(path="/deleteAll")
	public @ResponseBody String delete() {
		jogoRepository.deleteAll();
		return "Tudo apagado\n";
	}

	@DeleteMapping(path="/deleteById/{id}")
	public @ResponseBody String deleteById(@PathVariable Integer id) {
		jogoRepository.deleteById(id);
		return "Usuario apagado\n";
	}
  
}
