function animation_background() {
    persona = read_store('personas').chosen;
    if (persona == "jeune") {
        $('.contain_persona').append("<img id ='animation_img' src='img/animation/jeune_banc.svg#svgView(preserveAspectRatio(none))'/>")
    }
    else if (persona == "famille") {
        $('.contain_persona').append("<img id = 'animation_img' src='img/animation/famille_banc.svg#svgView(preserveAspectRatio(none))'/>")

    }
    else if (persona == "senior") {
        $('.contain_persona').append("<img id = 'animation_img' src='img/animation/mamie_banc.svg#svgView(preserveAspectRatio(none))'/>")
    }
}


