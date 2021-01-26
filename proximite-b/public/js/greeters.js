function greeter_background(){
    persona = read_store('personas').chosen;

    if (persona == "jeune"){
        $('#index_content_greeter').css("background-image", "url('/proximite-b/img/greeter/sans_la_bulle_jeune.svg')");
        $('#persona_text').text("Bonjour Monsieur, vous avez raison, je ne connais pas très bien la ville. Je suis venu visiter avant de m'installer ici, mais par où commencer ? J'hésite entre 2 quartiers");
        $('#greeter_second').text("Bonjour jeune homme, vous avez l'air un petit peu perdu. Je peux peut-être vous aider ?");
        $('.bulle_persona').css("visibility","hidden");
    }
    else if (persona == "famille"){
        $('#index_content_greeter').css("background-image", "url('/proximite-b/img/greeter/sans_la_bulle_famille.svg')");
        $('#persona_text').text("Bonjour, nous venons pour visiter la ville avant de choisir où nous installer. Mais par ou commencer ? Nous ne connaissons pas vraiment la ville et nous hésitons entre 2 logements...");
        $('#greeter_second').text("Bonjour Messieurs-Dames, vous avez l'air un petit peu perdu. Je peux peut-être vous aider ?");
        $('.bulle_persona').css("visibility","hidden");
    }
    else if (persona == "senior"){
        $('#index_content_greeter').css("background-image", "url('/proximite-b/img/greeter/sans_la_bulle_senior.svg')");
        $('#persona_text').text("Bonjour Monsieur, vous avez raison, je ne connais pas très biens la ville, je suis venu visiter avant de choisir ou m'installer, mais par ou commencer ? J'hésite entre 2 quartiers...");
        $('#greeter_second').text("Bonjour Madame, vous avez l'air un petit peu perdu. Je peux peut-être vous aider ?");
        $('.bulle_persona').css("visibility","hidden");
    }
}
function greeter_action(value){
    if (value == 1){
        $('.bulle_persona').css("visibility","visible");        
        $('#greeter_second').text("Moi je connais la ville comme ma poche, je suis né ici ! Quels sont les quartiers qui vous intéressent ?")
        $('.bulle_greeter').css("visibility","hidden");
        $('#greeter_suivant_button').attr("onclick","greeter_action(2)");
    }
    else if (value == 2){
        $('.bulle_persona').css("visibility","hidden");
        $('.bulle_greeter').css("visibility","visible");
        $('#greeter_suivant_button').attr("onclick","greeter_action(3)");
    }
    else if(value == 3){
        go_to('adresses');
    }

}



