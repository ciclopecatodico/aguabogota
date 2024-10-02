


const priceM3 = [0, 1014.25, 2028.50, 2873.71, 3380.84, 5240.30, 5578.39];

const basicCharge = [0, 5346.40, 10692.78, 15148.10, 17821.30, 39919.72, 48830.36];

const postobon = 28;

let colCop = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
});


function calcYear() {
 
 	var name = document.getElementById("name").value; 
 	name = `Hola ${name}`;
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


	const info1p = document.getElementById("info1p");
	info1p.innerHTML = `${name} por los mismos <strong>${colCop.format(bimonthValue)}</strong> que 
		pagaste de agua en el &uacute;ltimo recibo por <strong>${consume} m3</strong> que 
		consumiste, postob&oacute;n recibi&oacute; <strong>${postobonM3} m3 </strong>
		esto es <strong>${monthFactor}</strong> veces m&aacute;s que tu!<br><br>`;

	

	
	const waterGraph = document.getElementById("waterGraph");
	//calculando altura agua postobón
	let waterP=Math.sqrt(postobonM3);
	let xAxe = (500-waterP*2)/2;
	//#fe3b99
	//#3260a8
	//#bf0f0f
	//agua postobon: #123586
	let waterHeightU  = Math.sqrt(consume);
	waterGraph.innerHTML = `
		<svg  xmlns="http://www.w3.org/2000/svg" width="500" height="${waterP*2.5}" >
		<rect width="${waterP*2}" height="${waterP*2}"
		stroke="black"  stroke-width="1"
		fill-opacity="0.8"
		x="${xAxe}" y="0"
		fill="#123586" />
		<image href="postobonlogo.jpg" height="200" width="${waterP*2}" x="${xAxe}" />
		<rect width="${waterHeightU*2}" 
		height="${waterHeightU*2}" x="${xAxe}" y="${(waterP*2)-(waterHeightU*2)}" 
		fill="#bf0f0f" />
		</svg>`;

	const info2p = document.getElementById("info2p");
	info2p.innerHTML += `Si te vendieran el agua al mismo precio que a postob&oacute;n, 
		con los <strong>${colCop.format(yearValue)}</strong> que pagaste en el &uacute;ltimo 
		 a&ntilde;o podr&iacute;as haber recibido <strong>${monthsAtPostobonPrice} meses</strong>
		 el servicio`;

	const monthsGraph = document.getElementById("monthsGraph");

	monthsGraph.innerHTML = `
		<svg  xmlns="http://www.w3.org/2000/svg" width="500" height="${waterP*2.5}" >
		<rect width="${waterP*2}" height="${waterP*2}"
		stroke="black"  stroke-width="1"
		fill-opacity="0.8"
		x="${xAxe}" y="0"
		fill="blue" />
		<rect width="${waterHeightU*2}" 
		height="${waterHeightU*2}" x="${xAxe}" y="${(waterP*2)-(waterHeightU*2)}" 
		fill="red" />
		</svg>`;

	const info3p = document.getElementById("info3p");
	info3p.innerHTML = `Si te vendieran el agua al mismo precio que a postob&oacute;n, 
		con los <strong>${colCop.format(yearValue)}</strong> que pagaste en el &uacute;ltimo 
		 a&ntilde;o <strong>${yearsAtPostobonPrice}</strong> hogares como el tuyo 
		 hubieran podido recibir agua por un a&ntilde;o!`;
} 