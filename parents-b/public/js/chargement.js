$(document).ready(function() {
    $("#home")[0].style.display = "none";
    $(".shooting-stars")[0].style.display = "none";
    setTimeout(function() {
        $("#chargementI")[0].style.transition = "opacity 1s ease-out";
        $("#chargementI")[0].style.opacity = 0;
        setTimeout(function() {
            document.querySelector("body").className = "background-black";
            $("#home")[0].style.display = "block";
            $("#chargementI")[0].style.display = "none";
            $(".shooting-stars")[0].style.display = "block";
        }, 1000);
    }, 4000);
});
