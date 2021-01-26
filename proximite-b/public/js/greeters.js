function background_from_persona(){
    persona = "famille";
    if (persona == "jeune"){
        $('#index_content_greeter').style.backgroundImage = url('/proximite-b/img/index/sans_la_bulle_jeune.svg'); 
    }
    else if (persona == "famille"){
        $('#index_content_greeter').style.backgroundImage = url('/proximite-b/img/index/sans_la_bulle_famille.svg'); 
    }
    else if (persona == "senior"){
        $('#index_content_greeter').style.backgroundImage = url('/proximite-b/img/index/sans_la_bulle_senior.svg'); 
    }
}

background_from_persona();