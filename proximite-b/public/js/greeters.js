function greeter_background(){
    persona = read_store('personas').chosen;

    if (persona == "jeune"){
        $('#bulle_persona').css("visibility","hidden");
        $('#div_persona_img').append("<img id = 'etu_img' src='/proximite-b/img/greeter/etudiant.svg#svgView(preserveAspectRatio(none))'/>")
    }
    else if (persona == "famille"){
        $('#bulle_persona').css("visibility","hidden");
        $('#div_persona_img').append("<img id = 'family_img' src='/proximite-b/img/greeter/famille.svg#svgView(preserveAspectRatio(none))'/>")

    }
    else if (persona == "senior"){
        $('#bulle_persona').css("visibility","hidden");
        $('#div_persona_img').append("<img id = 'mamie_img' src='/proximite-b/img/greeter/mamie.svg#svgView(preserveAspectRatio(none))'/>")

    }
}
function greeter_action(value){
    if (value == 1){
        $('#bulle_persona').css("visibility","visible");        
        $('#greeter_second').text("Moi je connais la ville comme ma poche, je suis né ici ! Quels sont les quartiers qui vous intéressent ?")
        $('#div_bulle_greeter').css("visibility","hidden");
        $('#greeter_suivant_button').attr("onclick","greeter_action(2)");
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



