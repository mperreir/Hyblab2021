
function geturl(){
	return(window.location.pathname);
}

function last_url(url){
	var path = url.split('/');
	return(path[path.length-1]);
}

function colore(id_div){
	var div = document.getElementById(id_div);
	div.style.background = "white";
}

function show(id_div) {
	document.getElementById(id_div).style.visibility = "visible";	
}

function ecrire(id_div, txt){
	div = document.getElementById(id_div);
	div.textContent = txt;
}

function update(url){
	var path = url.split('/');
	switch(last_url(url)){
		case 'departements' :
			colore('cercle_outer1');
			show('text1');
			break;
		case '2235':
		case '56' :
		case '29' :
			colore('cercle_outer2');
			show('text2');
			break;
		case '1':
		case '2':
		case '3':
			colore('cercle_outer3');
			show('text3');
	}
}

console.log(geturl());
update(geturl());
