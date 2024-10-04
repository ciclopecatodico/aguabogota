


const priceM3 = [0, 1014.25, 2028.50, 2873.71, 3380.84, 5240.30, 5578.39];

const basicCharge = [0, 5346.40, 10692.78, 15148.10, 17821.30, 39919.72, 48830.36];

const postobon = 28;

let colCop = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
});

const miles = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

var name ="";
var consume = 0;
var bimonthValue= 0;
var yearValue = 0;
var yearM3 = 0;
var postobonM3=0;
var postobonYearPrice=0;
var yearsAtPostobonPrice=0;
var monthsAtPostobonPrice = 0;

var monthFactor = 0;

function calcYear() {
	
	info1p.innerHTML="";
	const monthsGraph = document.getElementById("monthsGraph");
	monthsGraph.innerHTML="";
	const info2p = document.getElementById("info2p");
	info2p.innerHTML="";
	const info3p = document.getElementById("info3p");
	info3p.innerHTML="";
 
 	name = document.getElementById("name").value; 
	var estrato = document.getElementById("estrato").value;
	//console.log("estrato: "+estrato);
	//console.log("basicCharge[estrato]: "+basicCharge[estrato]);
	consume = document.getElementById("consumo").value;
	//console.log("consume: "+consume);
	//console.log("pricem3[estrato]: "+priceM3[estrato]);

	//valor por periodo de dos meses
	bimonthValue = (consume*priceM3[estrato])+basicCharge[estrato];
	//valor pagado al año
	yearValue = Math.round(6*(bimonthValue));
	//consumo en m3 al año
	yearM3 = consume*6;
	//agua que postobon pudo comprar con ese dinero
	 postobonM3 =  Math.round(yearValue/postobon);

	//valor que te habrían cobrado en el último año al precio de postbon
	var postobonYearPrice=12*consume*postobon;
	//años de agua que pude haber tenido si me la cobraran al precio de postobon
	yearsAtPostobonPrice=Math.round(postobonM3/yearM3);
	monthsAtPostobonPrice = 12*yearsAtPostobonPrice;
	monthFactor = Math.round(postobonM3/consume);

	console.log("Valor anual : "+yearValue);
	console.log("monthsAtPostobonPrice: "+monthsAtPostobonPrice);
	console.log("yearsAtPostobonPrice: "+yearsAtPostobonPrice);
	console.log("postobonYearPrice: "+postobonYearPrice);
	console.log("postobonM3: "+postobonM3);

	fillWather();

	info2p.innerHTML += `Si te vendieran el agua al mismo precio que a postob&oacute;n, <strong>28 pesos el M3</strong>,
		con los <strong>${colCop.format(yearValue)}</strong> que pagaste en el &uacute;ltimo 
		 a&ntilde;o podr&iacute;as haber recibido <strong>${miles.format(monthsAtPostobonPrice)} meses</strong>
		 el servicio<br>
		 O <strong>${yearsAtPostobonPrice}</strong> hogares como el tuyo 
		 hubieran podido recibir agua por <strong>un año! </strong>`;

	monthsGraph.innerHTML = ``;
	info3p.innerHTML = ``;

	document.getElementById('waterForm').hidden = true;
	document.getElementById('hideButton').hidden = false;
	document.getElementById('infograpy').hidden = false;
} 


function fillWather(){

	//limpiar graficos:
	const waterGraph = document.getElementById("waterGraph");
	waterGraph.innerHTML="";
	const info1p = document.getElementById("info1p");

	let widhtMax = window.screen.width;
	let heightMax = widhtMax;
	//calculando altura agua postobón
	let waterPW=2*Math.sqrt(postobonM3);
	let waterPH=waterPW;
	//#fe3b99
	//#3260a8
	//#bf0f0f
	//agua postobon: #123586
	//agua usuario: #fcd303
	let waterUW  = 2*Math.sqrt(consume);
	//ancho de pantalla
	
	//inicio imagen
	console.log("widhtMax:"+widhtMax);
	let xAxe = (widhtMax-waterPW)/3;


	waterGraph.innerHTML = `
	<svg  xmlns="http://www.w3.org/2000/svg" width="${widhtMax}" height="${waterPH+20}" >
	<rect width="${waterPW}" height="${waterPH}"
	stroke="black"  stroke-width="1"
	x="${xAxe}" y="0"
	fill="#123586" />
	
	<image href="postobonlogo.jpg" width="${waterPW}" x="${xAxe}"  y="30" />
	<rect width="${waterUW}" 
	height="${waterUW}" x="${(waterPW+xAxe)-waterUW}" y="${(waterPW)-(waterUW)}" 
	fill="#fcd303" />
	<text x="${xAxe}" y="20" fill="#ff1401" font-size="20px" >Agua para &darr;</text>
	<text x="${xAxe+10}" y="${waterPW-5}" fill="#fcd303" font-size="16px" >Agua para ${name} &rarr;</text>
	</svg>`;

	info1p.innerHTML = `El recuadro azúl son los <strong>${miles.format(postobonM3)}m3</strong> que Postobón habría recibido por 
		los <strong>${colCop.format(bimonthValue)}</strong> que pagaste en tu último recibo.<br>
	 El recuadro amarillo son los <strong>${consume}m3</strong> que tu recibiste.<br>
	 Postobón recibe <strong>${miles.format(monthFactor)}</strong> veces más agua que tu por 
	 el mismo dinero!`


}

function showForm(){
	document.getElementById('waterForm').hidden = false;
	document.getElementById('hideButton').hidden = true;
	document.getElementById('infograpy').hidden = true;
}