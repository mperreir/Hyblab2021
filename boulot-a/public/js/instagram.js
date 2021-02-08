
const instaslide = function(section,data,texte) {

  var instaPicture = section.querySelector("#instaPicture");
  var description = section.querySelector("#description");
  var instagram = section.querySelector("#instagram");
  var lapin   = section.querySelector(".lapin");
  var category =section.querySelector("#category");
  console.log(data.image);
  if(data.image===""){
    instaPicture.src = "data/ILLUSTRATION SVG/CAROUSEL/Illu_"+data.type+".svg";
  }else{
    instaPicture.src = data.image;
  }
  instagram.style.transform = "scale(1)";
  category.innerText= data.name;
  description.innerText = texte;
  lapin.src = 'data/LAPIN%20SVG/Lapin_' +data.type +'.svg'
}
