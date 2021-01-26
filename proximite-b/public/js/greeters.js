function greeter_background(){
    persona = "senior";
    if (persona == "jeune"){
        $('#index_content_greeter').css("background-image", "url('/proximite-b/img/greeter/sans_la_bulle_jeune.svg')");
    }
    else if (persona == "famille"){
        $('#index_content_greeter').css("background-image", "url('/proximite-b/img/greeter/sans_la_bulle_famille.svg')");
    }
    else if (persona == "senior"){
        $('#index_content_greeter').css("background-image", "url('/proximite-b/img/greeter/sans_la_bulle_senior.svg')"); 
    }
}
function greeter_action(value){
    console.log(value)
    if (value == 1){
        console.log('ici')
        $('#second').hide();
        $('#first').show();
    }
}

greeter_background();

