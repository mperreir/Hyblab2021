var equiv = new Map();
equiv.set("Musée" , "tourism=museum");
equiv.set("Cinéma", "amenity=cinema");
equiv.set("Centre Artistique", "amenity=arts_centre");
equiv.set("Théatre", "amenity=theatre");
equiv.set("Lieu de culte", "amenity=place_of_worship");
equiv.set("Historique", "historic");
equiv.set("Boîte de nuit", "amenity=nightclub");
equiv.set("Bar", "amenity=bar");
equiv.set("Jardin de la bière", "amenity=biergarten");
equiv.set("Fast-food", "amenity=fast_food");
equiv.set("Pub", "amenity=pub");
equiv.set("Sport", "sport");
equiv.set("Piscine", "leisure=swimming_pool");
equiv.set("Stade", "building=stadium");
equiv.set("Salle de sport", "building=sports_hall");
equiv.set("Zone de baignade", "leisure=swimming_area");
equiv.set("Centre sportif", "leisure=sports_centre");
equiv.set("Loisirs", "leisure=pitch");
equiv.set("Boutique de sport", "shop=sports");
equiv.set("Ecole", "amenity=school");
equiv.set("Maternelle", "amenity=kindergarten");
equiv.set("Garde d'enfants", "amenity=childcare");
equiv.set("Terrain de jeu", "leisure=playground");
equiv.set("Give box", "amenity=give_box");
equiv.set("Marché", "amenity=marketplace");
equiv.set("Toilettes", "amenity=toilets");
equiv.set("Hôpital", "amenity=hospital");
equiv.set("Pâtisserie", "shop=pastry");
equiv.set("Restaurant", "amenity=restaurant");

var moyenEquiv = new Map();
moyenEquiv.set(0,"foot-walking");
moyenEquiv.set(1, "foot-walking");
moyenEquiv.set(2, "cycling-regular");
moyenEquiv.set(3, "wheelchair");
moyenEquiv.set(4, "foot-walking");
moyenEquiv.set(5, "foot-walking");
moyenEquiv.set(6, "foot-walking");

var themeEquiv = new Map();
themeEquiv.set(0,"default");
themeEquiv.set(1, "fetard");
themeEquiv.set(2, "sportif");
themeEquiv.set(3, "gourmet");
themeEquiv.set(4, "culture");
themeEquiv.set(5, "famille");

var themePicto = new Map();
themePicto.set(0, require('../img/pictogrammes_fete.png'));
themePicto.set(1, require('../img/pictogrammes_fete.png'));
themePicto.set(2, require('../img/pictogrammes_sport.png'));
themePicto.set(3, require('../img/pictogrammes_gourmet.png'));
themePicto.set(4, require('../img/pictogrammes_culture.png'));
themePicto.set(5, require('../img/pictogrammes_famille.png'));

var themetxt = new Map();
themetxt.set(0, "Qu'est-ce-qui t'intéresserait aujourd'hui ?");
themetxt.set(1, "Fast Food, bars, boîtes...");
themetxt.set(2, "Salle de sport, stade, piscine...");
themetxt.set(3, "Restaurant, Pâtisseries...");
themetxt.set(4, "Musée, cinéma, lieu de culte...");
themetxt.set(5, "École, garde d'enfants, loisirs...");

var txtattribut = new Map();
txtattribut.set(0, "Salut, je m’appelle Alex ! Tu aimes rencontrer tes amis dans des bars, déguster des planches apéros et sortir danser ? Alors, suis-moi !?");
txtattribut.set(1, "Salut, je m’appelle Alex ! Tu aimes rencontrer tes amis dans des bars, déguster des planches apéros et sortir danser ? Alors, suis-moi !");
txtattribut.set(2, "Moi, c’est Camille. Tu aimes relever des défis, te surpasser, ou même prendre soin de toi ? Alors suis-moi ! Je vais te faire découvrir des endroits où tu pourras t’exercer.");
txtattribut.set(3, "Moi, c’est François ! Tu aimes les plaisirs de la table ? Je connais tous les restaurants du coin !");
txtattribut.set(4, "Moi, c’est Zoé ! Tu es féru d’arts et de culture, curieux ? Tu as envie de découvrir le patrimoine qui t’entoure ? Allez, viens avec moi !");
txtattribut.set(5, "Salut ! Moi, c’est Mehdi. Elle, c’est Lina et lui, c’est notre chien Spike. Je connais plein de coins sympas où se rendre en famille ! Ça te dit de venir avec nous ?");

export default {equiv, moyenEquiv, themeEquiv, themePicto, themetxt, txtattribut}




