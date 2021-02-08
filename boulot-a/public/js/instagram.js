
const instaslide = function(section,data) {

  var instaPicture = section.querySelector("#instaPicture");
  var description = section.querySelector("#description");
  var instagram = section.querySelector("#instagram");
  var category = section.querySelector("#category");

  instagram.style.transform = "scale(1)";
  instaPicture.src = data.image;
  category.innerText= data.name;
  description.innerText = data.shortDescr;
}
