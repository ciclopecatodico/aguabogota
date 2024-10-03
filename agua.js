


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


function calcYear() {
 
 	var name = document.getElementById("name").value; 
	var estrato = document.getElementById("estrato").value;
	//console.log("estrato: "+estrato);
	//console.log("basicCharge[estrato]: "+basicCharge[estrato]);
	var consume = document.getElementById("consumo").value;
	//console.log("consume: "+consume);
	//console.log("pricem3[estrato]: "+priceM3[estrato]);

	//valor por periodo de dos meses
	var bimonthValue= (consume*priceM3[estrato])+basicCharge[estrato];
	//valor pagado al año
	var yearValue = Math.round(6*(bimonthValue));
	//consumo en m3 al año
	var yearM3 = consume*6;
	//agua que postobon pudo comprar con ese dinero
	var postobonM3 =  Math.round(yearValue/postobon);

	//valor que te habrían cobrado en el último año al precio de postbon
	var postobonYearPrice=12*consume*postobon;
	//años de agua que pude haber tenido si me la cobraran al precio de postobon
	var yearsAtPostobonPrice=Math.round(postobonM3/yearM3);
	var monthsAtPostobonPrice = 12*yearsAtPostobonPrice;
	var monthFactor = Math.round(postobonM3/consume);

	console.log("Valor anual : "+yearValue);
	console.log("monthsAtPostobonPrice: "+monthsAtPostobonPrice);
	console.log("yearsAtPostobonPrice: "+yearsAtPostobonPrice);
	console.log("postobonYearPrice: "+postobonYearPrice);
	console.log("postobonM3: "+postobonM3);


	const info1p = document.getElementById("info1p");
	info1p.innerHTML = `El recuadro azúl los <strong>${miles.format(postobonM3)}m3</strong> que Postobón habría recibido por 
		los <strong>${colCop.format(bimonthValue)}</strong> que pagaste en tu último recibo.<br>
	 El recuadro amarillo son los <strong>${consume}m3</strong> que tu recibiste.<br>
	 Postobón recibe <strong>${miles.format(monthFactor)}</strong> veces más agua que tu por 
	 el mismo dinero!`

	
	const waterGraph = document.getElementById("waterGraph");

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
		height="${waterUW}" x="${xAxe}" y="${(waterPW)-(waterUW)}" 
		fill="#fcd303" />
		<text x="${2*xAxe}" y="20" fill="#ff1401" >Agua de &darr;</text>
		<text x="${1.3*xAxe}" y="${(waterPW)-(waterUW)}" fill="#fcd303" >&larr; Agua de ${name}</text>
		</svg>`;

	const info2p = document.getElementById("info2p");
	info2p.innerHTML += `Si te vendieran el agua al mismo precio que a postob&oacute;n, 
		con los <strong>${colCop.format(yearValue)}</strong> que pagaste en el &uacute;ltimo 
		 a&ntilde;o podr&iacute;as haber recibido <strong>${monthsAtPostobonPrice} meses</strong>
		 el servicio`;

	const monthsGraph = document.getElementById("monthsGraph");

	monthsGraph.innerHTML = `
		<svg  xmlns="http://www.w3.org/2000/svg" width="500" height="${waterPW*2.5}" >
		<rect width="${waterPW*2}" height="${waterPW*2}"
		stroke="black"  stroke-width="1"
		fill-opacity="0.8"
		x="${xAxe}" y="0"
		fill="blue" />
		<rect width="${waterUW*2}" 
		height="${waterUW*2}" x="${xAxe}" y="${(waterPW*2)-(waterUW*2)}" 
		fill="red" />
		</svg>`;

	const info3p = document.getElementById("info3p");
	info3p.innerHTML = `Si te vendieran el agua al mismo precio que a postob&oacute;n, 
		con los <strong>${colCop.format(yearValue)}</strong> que pagaste en el &uacute;ltimo 
		 a&ntilde;o <strong>${yearsAtPostobonPrice}</strong> hogares como el tuyo 
		 hubieran podido recibir agua por un a&ntilde;o!`;
} 