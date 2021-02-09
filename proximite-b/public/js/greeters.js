function greeter_background() {
    persona = read_store('personas').chosen;

    if (persona == "jeune") {
        $('#div_bulle_greeter').append("<img class='bulle' id='bulle_greeter' src='img/greeter/bulle_greeters1.svg' />")

        $('#bulle_persona').css("visibility", "hidden");
        $('#bulle_persona').append("<img class='bulle' src='img/greeter/bulle_jeune.svg' />")
        $('#div_persona_img').append("<img id = 'etu_img' src='img/greeter/jeune.svg#svgView(preserveAspectRatio(none))'/>")
    }
    else if (persona == "famille") {
        $('#div_bulle_greeter').append("<img class='bulle' id='bulle_greeter' src='img/greeter/bulle_greeters2.svg' />")

        $('#bulle_persona').css("visibility", "hidden");
        $('#bulle_persona').append("<img class='bulle' src='img/greeter/bulle_famille.svg' />")
        $('#div_persona_img').append("<img id = 'family_img' src='img/greeter/famille.svg#svgView(preserveAspectRatio(none))'/>")
    }
    else if (persona == "senior") {
        $('#div_bulle_greeter').append("<img class='bulle' id='bulle_greeter' src='img/greeter/bulle_greeters3.svg' />")

        $('#bulle_persona').css("visibility", "hidden");
        $('#bulle_persona').append("<img class='bulle' src='img/greeter/bulle_senior.svg' />")
        $('#div_persona_img').append("<img id = 'mamie_img' src='img/greeter/mamie.svg#svgView(preserveAspectRatio(none))'/>")
    }
}
function greeter_action(value) {
    persona = read_store('personas').chosen;
    if (value == 1) {
        $('#bulle_persona').css("visibility", "visible");
        $('#div_bulle_greeter').css("visibility", "hidden");
        $('#div_bulle_greeter').empty();
        $('#greeter_suivant_button').attr("onclick", "greeter_action(2)");
        if (persona == "jeune") {
            $('#div_bulle_greeter').append("<img class='bulle' id='bulle_greeter' src='img/greeter/bulle_greeter_jeune.svg' />")
        }
        if (persona == "famille") {
            $('#div_bulle_greeter').append("<img class='bulle' id='bulle_greeter' src='img/greeter/bulle_greeter_famille.svg' />")
        }
        if (persona == "senior") {
            $('#div_bulle_greeter').append("<img class='bulle' id='bulle_greeter' src='img/greeter/bulle_greeter_senior.svg' />")
        }
    }
    else if (value == 2) {
        $('#bulle_persona').css("visibility", "hidden");
        $('#div_bulle_greeter').css("visibility", "visible");
        $('#greeter_suivant_button').attr("onclick", "greeter_action(3)");
    }
    else if (value == 3) {
        go_to('adresses');
    }

}



