import "./styles.css";
import jogador from "../../Login/index.jsx";
import JogadorService from '../../Backend/services/JogadorService.js';
import Canvas from "./script.js";
import { useState, useEffect, React } from "react";

function Documentacao() {

	const [display,setDisplay] = useState("block");

	let conteudo = "";
	
	var biscoito, image, movere;
	var desviar, direitar, reto = 180;
	var retaguarda = false;

	let progresso, meta, seccao = -1;
	let posicao = 0, lock = false, shift = 11.5;

	let carro = {
		y: 300,
		x: 540,
		angulo: 0,
	};
	
	let faixa = [
		0,350,700,-200
	];
	
	let velocidade = 0, desvio = 4, velocidade_limite = 240;

	const voltar = (e) => { 
		window.location = "/Casino";
	}

	const imagens = [
        require("../../Art/Black.png"),
        require("../../Art/Estrada/Faixa.png"),
        require("../../Art/Estrada/Carro.png"),
    ];
	
 	function desviarEsquerda() {
 		carro.angulo += desvio;
 		let buggy = Math.abs(carro.angulo);
		if (buggy == 180 || buggy == 0 || buggy == 360) {
			velocidade *= -1;
			if (buggy == 360)
				carro.angulo = 0;
			lock = false;
			retaguarda = !retaguarda;
			clearInterval(desviar);
		}
		if (retaguarda)
 			afastarCarro(shift);
		 else
 			afastarCarro(-shift);
 	}

 	function desviarDireita() {
 		carro.angulo -= desvio;
 		let buggy = Math.abs(carro.angulo);
		if (buggy == 180 || buggy == 0 || buggy == 360) {
			velocidade *= -1;
			if (buggy == 360)
				carro.angulo = 0;
			reto -= 180;
			lock = false;
			retaguarda = !retaguarda;
			clearInterval(desviar);
		}
		if (retaguarda)
 			afastarCarro(-shift);
		 else
 			afastarCarro(shift);
 	}
 	
	function acelerar() {
		if (velocidade >= velocidade_limite) {
			velocidade = velocidade_limite;
			alert("Velocidade limite");
			return "";
		}
		if (velocidade == 0)
			velocidade = 3;
		velocidade *= 1.25;
	}

	function travar() {
		velocidade = 0;
	}

	function desacelerar() {
		velocidade *= 0.75;
	}

	function documentar() {
		if (!retaguarda) {
			seccao++;
			posicao = 1080;
		}	
		 else {
		   seccao--;
		   if (seccao >= 0)
		   		posicao = -(documentacao[seccao].length*3.6);
		 }
		 
		if (seccao < 0 || seccao >= documentacao.length) {
			return "";
		}
    	conteudo = documentacao[seccao];
		progresso = -50;
		meta = documentacao[seccao].length;
	}

	function afastarEstrada() {
		posicao -= velocidade;
		for (let i = 0; i <= 2; i++) {
			faixa[i] -= velocidade;
			if (faixa[i] < -110 && !retaguarda)
				faixa[i] = 950;
			if (faixa[i] > 950 && retaguarda)
				faixa[i] = -180;
		}

		let fator = Math.abs(velocidade*0.24);
		progresso += fator;

		console.log(progresso+" =/= "+meta);
		
		if (progresso >= meta) {
			//alert("Fim da seccao");
			documentar();
		}
	}

	function afastarCarro(queso) {
		carro.x += queso;
	}

	window.addEventListener("keydown", function(e) {
		if (lock)
			return "";
        switch (e.keyCode) {
            case 37: velocidade = velocidade >= 0? 3 : -3;
            		 desviar = setInterval(desviarEsquerda,100);
                     lock = true;
                     break;
			case 38: acelerar();
					 break;
            case 39: velocidade = velocidade >= 0? 3 : -3;
            		 desviar = setInterval(desviarDireita,100);
                     lock = true;
                     break;
			case 40: desacelerar();
					 break;
}
    });

    
    
	useEffect(() => {
        movere = setInterval(afastarEstrada, 60);
        return () => clearInterval(movere);
    }, [posicao]);

	const documentacao = [
`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at faucibus velit. Pellentesque facilisis nisi quis risus consequat, pulvinar aliquam est consequat. Praesent elementum nulla vel velit scelerisque, faucibus elementum ex lacinia. Pellentesque id augue eu nunc volutpat sagittis. Nam auctor lectus vel arcu eleifend euismod. Nulla ullamcorper ante sem, pharetra hendrerit dolor feugiat at. Pellentesque quis mauris nulla. Mauris pharetra vel risus in hendrerit. Nunc dapibus nulla sed quam hendrerit ultricies. Quisque vel porta est. Sed eu turpis accumsan, placerat ex in, tincidunt enim.

Nulla facilisi. Aliquam vel eros tellus. Suspendisse pretium sed leo vel tristique. Etiam et porta leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus sagittis malesuada ante, eget feugiat quam vulputate vitae. Duis efficitur lorem non ligula tristique, in finibus leo maximus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent suscipit arcu et sem imperdiet, tincidunt iaculis urna fringilla. Nam ullamcorper imperdiet eros vitae commodo. Cras elementum ipsum ut risus pretium, ac volutpat velit rutrum. Aenean mattis, erat in vehicula scelerisque, lectus arcu rhoncus tellus, sit amet ornare ante urna quis diam. Aliquam ullamcorper hendrerit tortor, vitae dapibus massa.`,

`Nam pellentesque, nunc vel fringilla hendrerit, lacus risus fringilla dolor, in lacinia sem urna id turpis. Cras efficitur, libero quis condimentum scelerisque, tortor urna ullamcorper lorem, id mollis ante mi eget ipsum. Nam leo ex, mattis in ipsum vitae, elementum pretium augue. Curabitur laoreet at risus a scelerisque. Etiam condimentum purus diam, a pulvinar est tincidunt vitae. Fusce tempor ornare justo. Phasellus eros dolor, tempor et ante non, egestas aliquam erat. Sed volutpat elementum enim, vitae ultricies felis bibendum a. Vivamus non nulla quis mauris rutrum gravida. Nulla bibendum magna sapien. Vestibulum laoreet, tortor id ultrices facilisis, felis elit sodales ex, a mattis est tortor at tellus. Maecenas hendrerit laoreet iaculis. Etiam purus metus, porttitor ac convallis vel, commodo vel tellus.

Vivamus gravida cursus iaculis. Aenean accumsan facilisis viverra. Quisque odio magna, dignissim sit amet dui eget, consequat consectetur dui. Donec vehicula sed nulla vitae viverra. Curabitur dictum tincidunt tortor, eu suscipit ipsum efficitur ac. Fusce vehicula euismod magna, in imperdiet neque euismod quis. Integer condimentum lectus elit, ut accumsan tortor porttitor non. Duis turpis nunc, tempor in cursus eget, aliquet vitae ante. Mauris sed ex sed lacus volutpat pretium. Curabitur bibendum enim ac pellentesque posuere. Pellentesque convallis odio id mi pretium, nec mollis purus pellentesque. Aliquam vitae nisl bibendum, aliquam libero id, commodo erat.`,

`Etiam vel urna quis ligula consectetur convallis eget ac dui. Suspendisse quis ex molestie, maximus augue quis, consequat leo. Sed malesuada mauris vel mauris placerat, in tempus risus sagittis. Phasellus sagittis urna vel elit tempus maximus. Suspendisse condimentum nec tortor eget posuere. Donec risus nisi, viverra in mi vel, vulputate varius augue. Pellentesque aliquam nisl sit amet neque porttitor elementum. Nam sit amet massa ac dolor cursus tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas tristique sapien lorem, eu cursus libero imperdiet et. In sodales ex nisl, quis dignissim orci viverra sodales. Ut malesuada rhoncus mi, sed pellentesque libero commodo eu. Nulla euismod maximus nibh eget tristique. Vestibulum rutrum lorem massa, non laoreet tellus rutrum ac. Phasellus quis sem vitae sapien viverra venenatis vel quis lacus.

Mauris dictum, nibh vel ullamcorper fringilla, tellus massa interdum leo, quis efficitur purus sem scelerisque metus. Sed et viverra mauris. Phasellus lacus risus, commodo eget magna quis, commodo consectetur diam. Etiam sed ipsum mi. Aliquam bibendum vel tellus sed consectetur. Fusce egestas sapien iaculis finibus dignissim. Sed tempor dignissim lacus, suscipit consequat arcu iaculis ac. Vivamus fringilla diam ut congue ullamcorper. Cras id accumsan tortor. Morbi dictum justo id mi maximus, ac finibus dolor malesuada. Integer ut porta massa, nec volutpat enim. Phasellus rhoncus dictum vehicula.`,

`Curabitur sit amet tortor nisi. Nam mattis tincidunt viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed pellentesque erat vel ligula placerat luctus. Aenean at gravida mauris. Sed sagittis, magna a finibus egestas, nibh lectus tincidunt leo, id dignissim leo ante in magna. Cras in lobortis urna.

Fusce id dictum ex. Sed a ante id mauris tincidunt gravida. Phasellus rutrum, mi id condimentum venenatis, quam odio porta neque, et porta ante sapien quis mi. Phasellus euismod massa ligula, sed tincidunt felis maximus id. Ut rutrum nisi non lectus lobortis, in vestibulum odio vestibulum. Morbi nisi sem, condimentum id aliquam vitae, vestibulum in leo. Praesent metus quam, hendrerit ultrices felis in, bibendum euismod justo. Vivamus non porta risus. Phasellus convallis, dolor quis faucibus fringilla, diam lorem porttitor magna, eget molestie urna odio a massa. Mauris vestibulum ligula vitae lacus fringilla imperdiet. Aliquam fermentum leo purus, a auctor mauris luctus ut. Cras quis nunc massa. Quisque luctus et ex id maximus.`,

`Praesent ac turpis egestas augue elementum volutpat eu vitae massa. Duis lacinia lacus sit amet ligula aliquam, eu suscipit sem finibus. Sed pellentesque condimentum commodo. Maecenas porta enim a quam placerat, at tincidunt metus iaculis. Proin malesuada nisi ex, eu mollis metus sollicitudin ac. Nullam ut consequat felis, semper aliquet diam. Aenean in pretium ex. Mauris suscipit sapien sed urna varius fermentum. Donec vel mauris at enim volutpat elementum.

Nulla facilisi. Vivamus sit amet ligula leo. Nam dapibus nisl eget augue tempus ornare. Aenean iaculis est ut lorem pellentesque, nec faucibus odio pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus tincidunt mauris. Nullam vitae ultricies odio. Mauris tempor diam purus, non bibendum nunc mollis et.`,

`In non auctor neque. Nulla eget suscipit dui. Donec justo purus, aliquet in dui ac, tempor vehicula urna. Etiam ut neque ultrices, dapibus diam id, cursus urna. Vivamus sed eros ac orci euismod porta id quis libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum consequat justo id risus iaculis posuere quis rhoncus massa. Sed at egestas tortor, non lacinia tortor.

In eget varius turpis. Morbi ac erat pulvinar, rutrum lacus molestie, malesuada nibh. Sed pretium iaculis fermentum. Vivamus posuere consequat sem non volutpat. Sed tristique lobortis arcu et consequat. Mauris quis cursus nisl. Maecenas malesuada lobortis risus nec accumsan.`,

`Sed lectus orci, fermentum ac orci et, vehicula aliquet felis. Donec rutrum lacus a ipsum iaculis, non hendrerit ipsum congue. Mauris quis dolor rhoncus nulla consectetur iaculis. Nullam luctus placerat nulla quis vehicula. Nunc non felis interdum, facilisis elit eget, ullamcorper turpis. Donec ut justo enim. Maecenas et leo lorem. Fusce commodo quam nulla, vel tincidunt arcu cursus quis. Suspendisse in enim tincidunt, venenatis erat et, consectetur tortor. Praesent a pretium justo.

Nunc ultricies, turpis in iaculis ultricies, nisi arcu volutpat mi, sed tincidunt sem est vitae ipsum. Sed sit amet dapibus risus, ac fringilla quam. In maximus risus vel erat consequat tincidunt. Donec tincidunt et quam nec tincidunt. Duis congue sed tortor nec efficitur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In porta ex lorem, sed pellentesque neque accumsan nec. Vestibulum ac hendrerit odio. Phasellus fringilla sollicitudin erat at sagittis. Maecenas ultricies in massa et placerat. Vivamus et leo risus. Aenean ut eros tempus, sagittis magna sit amet, commodo mauris.`,

`In hendrerit urna sapien, sed iaculis ex sodales eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc sed urna sagittis, ultricies neque ut, tincidunt metus. Aenean pretium lectus id luctus sollicitudin. Pellentesque in purus tortor. Suspendisse et hendrerit enim. Pellentesque enim est, pulvinar ac tincidunt nec, eleifend ut lorem. Sed iaculis sodales elit ac dignissim. Cras sed ipsum et eros accumsan ultrices. Sed at tortor at odio sagittis dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Quisque at odio sit amet diam dapibus sagittis eget non orci. Vestibulum vitae dui maximus, auctor diam non, bibendum lectus. Integer tempus viverra nisl, at porttitor tortor bibendum consequat.

In tincidunt mi nec est porta, at ultricies velit fringilla. Fusce nibh diam, placerat vitae mi ac, convallis gravida ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam a nunc malesuada, laoreet orci nec, malesuada neque. Aliquam erat volutpat. Nullam nec urna et mi iaculis sagittis porta sit amet dolor. Ut hendrerit, ipsum in pulvinar venenatis, nisi risus fringilla enim, eget malesuada nunc justo eu lectus. Mauris massa nibh, eleifend at ex sit amet, imperdiet elementum nisi. Suspendisse id interdum ex, sit amet tempus nisi. Maecenas eleifend laoreet fermentum.`,

`Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut gravida nunc vel sem volutpat sollicitudin. In hac habitasse platea dictumst. Proin ultricies varius tincidunt. In hac habitasse platea dictumst. Nullam tempus justo non lacinia laoreet. Cras et purus bibendum, volutpat nulla a, viverra eros. Mauris scelerisque posuere gravida. Pellentesque pellentesque molestie turpis, eu semper libero tristique vitae. Quisque tempor luctus fringilla. Pellentesque accumsan rhoncus lorem, ac dictum sapien tristique in. Integer faucibus, elit ac pellentesque finibus, ipsum nunc porta diam, quis sollicitudin dui lectus in sapien. Cras gravida, risus vitae lacinia porttitor, sem augue sagittis felis, eu congue ipsum dui quis mi.

Aenean posuere nibh ac sem convallis, ac faucibus lorem venenatis. Etiam neque enim, dapibus feugiat est nec, tempus mollis odio. Ut posuere eros non risus cursus malesuada. Nulla convallis lorem vitae nisl laoreet, vel blandit leo suscipit. Praesent imperdiet magna eget magna facilisis, a dignissim dolor molestie. Phasellus iaculis ornare neque, sit amet feugiat sapien cursus at. Sed consectetur lacus semper nisl dignissim pretium.`,

`Quisque sit amet enim dolor. Proin rutrum risus turpis, sed ultrices urna porttitor at. Donec sit amet orci ut velit accumsan tristique sed eget elit. Sed finibus libero in volutpat placerat. Sed quis erat non enim eleifend accumsan. Phasellus luctus velit nulla, ut dapibus neque rutrum eget. Etiam iaculis nibh consectetur risus elementum condimentum at sit amet justo. Aenean gravida eros eu dolor sodales molestie. Praesent porttitor odio quis sem ultrices, imperdiet accumsan ligula efficitur.

Nam pellentesque nisl vitae aliquet rutrum. Duis malesuada mi sed turpis aliquet, ac auctor quam lobortis. Proin eu urna sit amet arcu iaculis scelerisque. Donec pellentesque, ipsum quis porta molestie, nisl ligula sagittis ligula, ac luctus augue urna ut felis. Aliquam porttitor dignissim vulputate. Aliquam sed ligula dolor. Morbi viverra enim dui, a lobortis libero auctor eu. Nullam eu finibus ante, eget rutrum ante. Aliquam ultricies laoreet magna, luctus convallis est pharetra non. Cras consectetur enim a facilisis rutrum. Curabitur vel erat in mauris tincidunt convallis ut non libero. Nam maximus interdum purus, quis auctor nisi scelerisque eget. Donec a varius quam. Phasellus dictum quam vel augue hendrerit scelerisque. Proin lacus augue, malesuada ut lectus eget, interdum rutrum metus.`,

`Suspendisse commodo fermentum sapien eget condimentum. Nullam quis velit blandit, posuere lectus in, euismod nisl. Suspendisse vel lobortis turpis. Duis sed tellus in libero sagittis iaculis eget et arcu. Nam scelerisque nisl in nibh porttitor, id efficitur magna egestas. Aliquam a imperdiet neque. Maecenas in tristique nibh, tempor gravida tortor. Sed rhoncus ultricies odio, sed gravida urna malesuada id. Integer sapien lectus, luctus at velit sed, porta imperdiet ligula.

Quisque ullamcorper ipsum vel mauris condimentum, id interdum turpis auctor. Praesent porttitor nunc eu ullamcorper finibus. Nulla dignissim dignissim risus, sed porta tortor accumsan at. Etiam massa est, semper ac volutpat eget, ornare ac arcu. Maecenas lectus mauris, ultricies vel nunc ac, posuere ultricies est. Duis ligula quam, bibendum vitae scelerisque vel, venenatis vel justo. Maecenas eget mi id augue iaculis lobortis. Cras at lobortis ante, molestie sodales nulla. Vivamus tellus massa, lacinia sed gravida sit amet, vehicula quis neque. Curabitur sit amet dui sit amet libero pellentesque semper. Fusce id elementum lacus, tristique mollis diam. In ac sollicitudin risus. Aenean arcu velit, vestibulum vitae nibh quis, dapibus lobortis lacus. Vestibulum pretium pellentesque magna, non elementum risus dictum eu.`,

`Duis odio mi, porttitor ac dignissim ac, congue vel diam. Mauris luctus hendrerit ligula, faucibus accumsan tellus fringilla eget. Maecenas urna neque, volutpat ac blandit et, tristique sit amet mauris. Nulla facilisi. Suspendisse eros mi, luctus sed ultricies non, hendrerit ut turpis. Quisque in venenatis sem. Sed sit amet odio quis enim lobortis aliquam. Ut vestibulum consequat mi ac efficitur. Donec risus ipsum, eleifend vel laoreet ac, laoreet non libero. Aenean mattis nunc nibh, et tristique libero consequat quis. Vestibulum lacinia sit amet lectus ac elementum.

Nam ornare cursus turpis quis efficitur. Curabitur nibh eros, varius eget libero eu, congue dapibus turpis. Morbi consequat volutpat dictum. Suspendisse quis arcu nunc. Nullam convallis pulvinar felis ut vehicula. Maecenas sed accumsan odio, suscipit malesuada eros. Vestibulum cursus eros ut dolor tincidunt, id sollicitudin lectus euismod. Donec facilisis rhoncus hendrerit. Curabitur et ligula quis orci blandit ornare quis et sapien. Vivamus aliquam tellus id luctus ultrices. Praesent vulputate vitae lectus at facilisis.`,

`Maecenas a erat neque. Proin eget ante sem. Vestibulum vehicula arcu id mauris tempus tincidunt. Fusce dui ligula, rhoncus et luctus et, eleifend ut est. Aliquam interdum varius eros, eu condimentum tortor rutrum quis. Proin maximus, libero sed mattis luctus, justo dui placerat orci, in dapibus justo sapien vitae sem. Nullam in sem quis orci convallis tempor. Cras sagittis nisl pulvinar tempor egestas. Morbi non nulla eget enim lobortis laoreet. Curabitur non felis quis tortor suscipit vestibulum. Morbi sit amet feugiat lacus, ac vehicula dolor. Fusce fermentum luctus molestie.

Quisque dolor eros, elementum id egestas eget, imperdiet sagittis lectus. In interdum, nulla at auctor imperdiet, augue justo iaculis justo, id scelerisque magna odio sed diam. Quisque urna odio, ornare at mauris non, dapibus molestie leo. Cras eget turpis neque. Maecenas consectetur, erat in tempus molestie, eros enim iaculis dui, nec facilisis nibh purus at mi. Curabitur vel ligula sed ligula ultricies iaculis. Vestibulum ac leo ex. Duis sed arcu eros. In vel posuere velit, iaculis fringilla erat.`,

`Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris pulvinar hendrerit aliquam. Praesent vel tincidunt risus, in varius mi. Ut laoreet tellus sit amet nulla euismod, vitae imperdiet odio ullamcorper. Morbi egestas arcu sit amet sem semper faucibus. Aenean pulvinar velit non nunc congue accumsan. Morbi id urna id massa dapibus euismod quis at magna. Nunc lectus tortor, aliquam in euismod at, viverra eget diam. Cras maximus ipsum et mattis viverra. Etiam quis nisi sit amet justo sollicitudin ornare tristique at augue. Cras molestie egestas elit, quis porta velit pellentesque in. Aliquam eget semper orci, id pellentesque sem.

Integer gravida fermentum purus ut sollicitudin. Ut efficitur justo quis lorem vehicula ultricies. Cras suscipit urna vel bibendum ullamcorper. Integer rhoncus pellentesque faucibus. Donec efficitur semper dignissim. Vestibulum at turpis at lacus aliquam varius. Sed aliquam, justo a rhoncus tristique, ex risus consequat nibh, et scelerisque sem justo non elit. Praesent efficitur velit felis, ac ullamcorper est pellentesque quis. Nam eget eleifend massa.`,

`Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce ac condimentum nisi. Quisque quis finibus erat, vel consectetur justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum venenatis tincidunt blandit. Donec vel iaculis orci. Donec semper a sem ac eleifend. Morbi ac pretium augue. Curabitur vitae tincidunt orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nunc nisl, accumsan et diam vel, finibus lobortis mauris. Quisque lacus purus, eleifend non imperdiet blandit, lobortis ut magna. Proin ornare ex ac justo pretium, et convallis nisi ultrices.

Integer tincidunt fringilla elit non tincidunt. Aliquam erat volutpat. Aliquam iaculis cursus nulla, ac pretium risus ornare congue. Vivamus varius, tortor ac euismod varius, urna tellus condimentum ligula, at pellentesque ligula justo quis massa. Duis justo enim, vulputate eleifend ullamcorper eget, pretium ut lorem. Praesent fermentum velit id volutpat fermentum. Vivamus id laoreet massa. Cras et eleifend lorem, aliquam dapibus sapien.`
];

	function Menu() {

		const [cor1, setCor1] = useState("yellow");	
		const [cor2, setCor2] = useState("purple");	

		const animacaoBoard = (e) => {
			setCor1(cor1 == "yellow"? "purple" : "yellow");		
			setCor2(cor2 == "yellow"? "purple" : "yellow");		
		}

		useEffect(() => {
			documentar();
	    },[]);
	    
		useEffect(() => {
			biscoito = setInterval(animacaoBoard, 60);
			return () => clearInterval(biscoito);
		}, [cor1, cor2]);



		return (
			<div id="tela-borda" ref={el => {
		            if (el) {
					  let pattern = "repeating-linear-gradient(-45deg, "+cor1+" 5px, "+cor1+", "+cor2+" 10px, "+cor2+", "+cor1+" 15px)";
		              el.style.setProperty("background", pattern, 'important'); }}}>
				<div id="tela">
				{/*	<Canvas /> */}
					<div>
						<img id="full-black" src={imagens[0]} />
						<div id="principal">
							<textarea id="estrada" value={conteudo} ref={el => {
			                    if (el) {
			                      el.style.setProperty("top", posicao+"px", 'important'); }}} disabled>
							</textarea>
						</div>
						<div>
							<img className="faixas faixa-l" src={imagens[1]} ref={el => {
			                    if (el) {
			                      el.style.setProperty("top", faixa[0]+"px", 'important');
							 }}} />
							<img className="faixas faixa-r" src={imagens[1]} ref={el => {
			                    if (el) {
			                      el.style.setProperty("top", faixa[0]+"px", 'important');
							}}} />
							<img className="faixas faixa-l" src={imagens[1]} ref={el => {
			                    if (el) {
			                      el.style.setProperty("top", faixa[1]+"px", 'important');
							 }}} />
							<img className="faixas faixa-r" src={imagens[1]} ref={el => {
			                    if (el) {
			                      el.style.setProperty("top", faixa[1]+"px", 'important');
							}}} />
							<img className="faixas faixa-l" src={imagens[1]} ref={el => {
			                    if (el) {
			                      el.style.setProperty("top", faixa[2]+"px", 'important');
							 }}} />
							<img className="faixas faixa-r" src={imagens[1]} ref={el => {
			                    if (el) {
			                      el.style.setProperty("top", faixa[2]+"px", 'important');
							}}} />
							<img className="faixas faixa-l" src={imagens[1]} ref={el => {
			                    if (el) {
			                      el.style.setProperty("top", faixa[3]+"px", 'important');
							 }}} />
							<img className="faixas faixa-r" src={imagens[1]} ref={el => {
			                    if (el) {
			                      el.style.setProperty("top", faixa[3]+"px", 'important');
							}}} />
						 </div>
						<div>
							<img id="carro" src={imagens[2]} ref={el => {
						        if (el) {
						          el.style.setProperty("top", carro.y+"px", 'important');
						          el.style.setProperty("left", carro.x+"px", 'important');
						          el.style.setProperty("transform", "rotate("+carro.angulo+"deg)", 'important');
							}}} />
						</div>
						 
						<div id="velocidades">
							<button onClick={acelerar}>Acelerar</button>
							<button onClick={travar}>Travar</button>
							<button onClick={desacelerar}>Desacelerar</button>
						</div>
						<button id="voltar" onClick={voltar}>Voltar</button>
					</div>
				</div>
			</div>
		)		
	}

	return (
		<div>
			<title>Tela do Documentacao</title>
			<Menu />
			<div>
			    <div id="cortina-l"></div>
			    <div id="cortina-r"></div>
			</div>
		</div>
	)

}

export default Documentacao;
