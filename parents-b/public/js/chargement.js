$(document).ready(function(){
  $("#home")[0].style.display = "none";
  $(".shooting-stars")[0].style.display = "none";
  setTimeout(function () {
<<<<<<< HEAD
    $("#chargementI")[0].style.transition = "opacity 1s ease-out";
    $("#chargementI")[0].style.opacity = 0;
    setTimeout(function () {
        document.querySelector("body").className = "background-black";
        $("#home")[0].style.display = "block";
        $("#chargementI")[0].style.display = "none";
    }, 1000);
}, 4000);
=======
    $("#chargementI")[0].style.display = "none";
    document.querySelector("body").className = "background-black";
    $("#home")[0].style.display = "block";
    $(".shooting-stars")[0].style.display = "block";
  }, 4500);
>>>>>>> d28614cac5936c5fce3b5fb7cb82c9f0812e4149
});
