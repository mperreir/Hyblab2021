function greeter_background(){
    persona = read_store('personas').chosen;

    if (persona == "jeune"){
        $('#div_bulle_greeter').append("<img class='bulle' id='bulle_greeter' src='/proximite-b/img/greeter/bulle_greeters1.png' />")

        $('#bulle_persona').css("visibility","hidden");
        $('#bulle_persona').append("<img class='bulle' src='/proximite-b/img/greeter/bulle_jeune.png' />")
        $('#div_persona_img').append("<img id = 'etu_img' src='/proximite-b/img/greeter/jeune.svg#svgView(preserveAspectRatio(none))'/>")
    }
    else if (persona == "famille"){
        $('#div_bulle_greeter').append("<img class='bulle' id='bulle_greeter' src='/proximite-b/img/greeter/bulle_greeters2.png' />")

        $('#bulle_persona').css("visibility","hidden");
        $('#bulle_persona').append("<img class='bulle' src='/proximite-b/img/greeter/bulle_famille.png' />")
        $('#div_persona_img').append("<img id = 'family_img' src='/proximite-b/img/greeter/famille.svg#svgView(preserveAspectRatio(none))'/>")
    }
    else if (persona == "senior"){
        $('#div_bulle_greeter').append("<img class='bulle' id='bulle_greeter' src='/proximite-b/img/greeter/bulle_greeters3.png' />")

        $('#bulle_persona').css("visibility","hidden");
        $('#bulle_persona').append("<img class='bulle' src='/proximite-b/img/greeter/bulle_senior.png' />")
        $('#div_persona_img').append("<img id = 'mamie_img' src='/proximite-b/img/greeter/mamie.svg#svgView(preserveAspectRatio(none))'/>")
    }
}
function greeter_action(value){
    persona = read_store('personas').chosen;
    if (value == 1){
        $('#bulle_persona').css("visibility","visible");        
        $('#div_bulle_greeter').css("visibility","hidden");
        $('#div_bulle_greeter').empty();
        $('#greeter_suivant_button').attr("onclick","greeter_action(2)");
        if(persona == "jeune"){
            $('#div_bulle_greeter').append("<img class='bulle' src='/proximite-b/img/greeter/bulle_greeter_jeune.png' />")
        }
        if(persona == "famille"){
            $('#div_bulle_greeter').append("<img class='bulle' src='/proximite-b/img/greeter/bulle_greeter_famille.png' />")
        }
        if(persona == "senior"){
            $('#div_bulle_greeter').append("<img class='bulle' src='/proximite-b/img/greeter/bulle_greeter_senior.png' />")
        }
    }
    else if (value == 2){
        $('#bulle_persona').css("visibility","hidden");
        $('#div_bulle_greeter').css("visibility","visible");
        $('#greeter_suivant_button').attr("onclick","greeter_action(3)");
    }
    else if(value == 3){
        go_to('adresses');
    }

}



