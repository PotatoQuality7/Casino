const gerente = {
  numCarros: 3,
  codGerente: 2555,
};
const transporte = {
  matricula: ["MMX-932-MC","MAX-163-MP","MCE-524-MC"],
  codGerente: 2555,
  rota: ["Museu-Laulane","Baixa-Magoanine","A. Voador-Magoanine"],
};
const canvas = document.getElementById("papel");
const width = canvas.width = window.innerWidth-50;
let pos = 60;
canvas.height = ((420+pos)*gerente.numCarros);
const ctx = canvas.getContext("2d");

const height = 420;
const max = 17;//6-22
const c = 10;
let linhas = [];
for (let num = 0; num < gerente.numCarros; num++) {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.font = "24px Arial";
    ctx.fillText(transporte.rota[num]+": "+transporte.matricula[0]+", 29/04/2023",0,pos-18);
    ctx.fillStyle = "rgb(254,164,0)";
    ctx.fillRect(0,pos,width,height);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0,pos+height-20,width,20);
    ctx.fillStyle = "rgb(0,0,0)";
    for (let i = 1; i < (height/10)-1; i += 2) {
        for (let j = 1; j <= max; j++) {
             ctx.fillRect(j*(width/(max+1)),pos+(height-22)-(10*i),2,10);
             ctx.font = "12px Arial";
             ctx.fillText((j+5)+"H",(j*(width/(max+1)))-8,pos+height-5);
        }
    }
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 2;
    ctx.strokeRect(1,pos,width-1,height);
    ctx.fillStyle = '#0af';
    for (let i = 1; i <= max; i++) {
         let j = (height-20)-((height-20)*Math.random());
         ctx.beginPath();
         ctx.ellipse(i*(width/(max+1))+2,pos+height-20-j,c,c,0,0,2*Math.PI);
         ctx.fill();
         ctx.closePath();
         linhas.push(Math.trunc((i*(width/(max+1))+10)));
    }
    pos += height+60;
}

canvas.addEventListener("click",mousePosition);
function mousePosition(event) {
  let temp = "";
  for (let j = 0; j < max; j++) {
      if (event.clientX >= linhas[j]-(c/2)-1 && event.clientX <= linhas[j]+(c/2)+1) {
          compararPontos(j);
          break;
      }
  }
}

function associarCor(i,cor) {
  for (let num = i; num >= 0; num--)
      if (i != num && (transporte.rota[i] == transporte.rota[num]))
          return cor[num];
  return 'rgb('+(Math.random()*255)+','+(Math.random()*255)+','+(Math.random()*255)+')';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function compararPontos(j) {
  //barra
    ctx.fillStyle = "rgb(255,0,0)";
    for (let i = 0; i < canvas.height; i++) {
        ctx.fillRect(linhas[j]-11,i,5,1);
        //sleep(100);
    }
    canvas.height = height;
    canvas.style.border = "solid 2px black";
    let altura = [];
    let target = [];
    pos = [];
    let cor = [];
    for (let num = 0; num < gerente.numCarros; num++) {
         altura.push(Math.random()*height);
         pos.push(linhas[j]);
         target[num] = Math.trunc((num+1)*(width/(gerente.numCarros+1)));
         cor[num] = associarCor(num,cor);
    }
    //slide
    let mudanca;
    do {
        mudanca = false;
        for (let num = 0; num < gerente.numCarros; num++) {
             if (target[num] == pos[num])
                 continue;
             mudanca = true;
             ctx.beginPath();
             ctx.fillStyle = '#fff';
             ctx.ellipse(pos[num],height-altura[num],c,c,0,0,2*Math.PI);
             ctx.fill();
             ctx.closePath();
             ctx.beginPath();
             ctx.fillStyle = cor[num];
             ctx.ellipse(pos[num],height-altura[num],c,c,0,0,2*Math.PI);
             ctx.fill();
             ctx.closePath();
             pos[num] += target[num] < pos[num]? -1 : 1;
        }
    } while (mudanca);
    //flatten
    for (let i = 0; i < c; i++) {
        for (let num = 0; num < gerente.numCarros; num++) {
             ctx.beginPath();
             ctx.fillStyle = '#fff';
             ctx.ellipse(pos[num],height-altura[num],c,c-i+1,0,0,2*Math.PI);
             ctx.fill();
             ctx.closePath();
             ctx.beginPath();
             ctx.fillStyle = cor[num];
             ctx.ellipse(pos[num],height-altura[num],c,c-i,0,0,2*Math.PI);
             ctx.fill();
             ctx.closePath();
        }
    }
    //widen
    let t = 0;
    for (let j = 0; j < ((width*0.2)/gerente.numCarros)/2; j++) {
        for (let num = 0; num < gerente.numCarros; num++) {
             ctx.beginPath();
             ctx.fillStyle = '#fff';
             ctx.ellipse(pos[num]-t,height-altura[num],c+(2*t),1,0,0,2*Math.PI);
             ctx.fill();
             ctx.closePath();
             ctx.beginPath();
             ctx.fillStyle = cor[num];
             ctx.ellipse(pos[num]-t,height-altura[num],c+(2*t),1,0,0,2*Math.PI);
             ctx.fill();
             ctx.closePath();
        }
        t++;
    }
    for (let num = 0; num < gerente.numCarros; num++)
         target[num] = height-altura[num];
    //expand
    let i = 0;
    do {
      i++;
      mudanca = false;
      for (let num = 0; num < gerente.numCarros; num++) {
           if (target[num] != 0) {
               mudanca = true;
               ctx.fillStyle = '#fff';
               ctx.fillRect(pos[num]-t,height-altura[num],c+(2*t),i);
               ctx.fillStyle = cor[num];
               ctx.fillRect(pos[num]-t,height-altura[num],c+(2*t),i);
           }
      }
    } while (mudanca);
}
