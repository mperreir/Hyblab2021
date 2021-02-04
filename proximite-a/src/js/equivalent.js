//images logos
import logo0 from '../img/LOGO OK_logo principal.png'
import logo1 from '../img/LOGO OK_logo vert.png'
import logo2 from '../img/LOGO OK_logo bleu.png'
import logo3 from '../img/LOGO OK_logo jaune.png'
import logo4 from '../img/LOGO OK_logo orange.png'
import logo5 from '../img/LOGO OK_logo rose.png'
//images persos
import fetard_img from '../img/Perso-hyblab-03.png'
import sportif_img from '../img/Perso-hyblab-02.png'
import gourmet_img from '../img/Perso-hyblab-04.png'
import culture_img from '../img/Perso-hyblab-05.png'
import famille_img from '../img/Perso-hyblab-06.png'
import { Spinner } from "react-bootstrap";

//images fonds
import fond0 from '../img/HOVER-moyen de transport-tache-01.png'
import fond1 from '../img/HOVER-moyen de transport-tache-02.png'
import fond2 from '../img/HOVER-moyen de transport-tache-03.png'
import fond3 from '../img/HOVER-moyen de transport-tache-04.png'
import fond4 from '../img/HOVER-moyen de transport-tache-05.png'
import fond5 from '../img/HOVER-moyen de transport-tache-06.png'



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
themePicto.set(0, require('../img/pictogrammes_position.png'));
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


var themePerso = new Map();
themePerso.set(0, { fetard_img }.fetard_img)
themePerso.set(1,{fetard_img}.fetard_img)
themePerso.set(2, {sportif_img}.sportif_img)
themePerso.set(3, {gourmet_img}.gourmet_img)
themePerso.set(4, { culture_img }.culture_img)
themePerso.set(5, { famille_img }.famille_img)

var themeLogo = new Map();
themeLogo.set(0, {logo0}.logo0 )
themeLogo.set(1, {logo1}.logo1 )
themeLogo.set(2, {logo2}.logo2 )
themeLogo.set(3, {logo3}.logo3 )
themeLogo.set(4, {logo4}.logo4 )
themeLogo.set(5, {logo5}.logo5 )

var themeFond = new Map();
themeFond.set(0, { fond0}.fond0)
themeFond.set(1, { fond1}.fond1)
themeFond.set(2, { fond2}.fond2)
themeFond.set(3, { fond3}.fond3)
themeFond.set(4, { fond4}.fond4)
themeFond.set(5, { fond5}.fond5)

var txtattribut = new Map();
txtattribut.set(0, "Salut, je m’appelle Alex ! Tu aimes rencontrer tes amis dans des bars, déguster des planches apéros et sortir danser ? Alors, suis-moi !?");
txtattribut.set(1, "Salut, je m’appelle Alex ! Tu aimes rencontrer tes amis dans des bars, déguster des planches apéros et sortir danser ? Alors, suis-moi !");
txtattribut.set(2, "Moi, c’est Camille. Tu aimes relever des défis, te surpasser, ou même prendre soin de toi ? Alors suis-moi ! Je vais te faire découvrir des endroits où tu pourras t’exercer.");
txtattribut.set(3, "Moi, c’est François ! Tu aimes les plaisirs de la table ? Je connais tous les restaurants du coin !");
txtattribut.set(4, "Moi, c’est Zoé ! Tu es féru d’arts et de culture, curieux ? Tu as envie de découvrir le patrimoine qui t’entoure ? Allez, viens avec moi !");
txtattribut.set(5, "Salut ! Moi, c’est Mehdi. Elle, c’est Lina et lui, c’est notre chien Spike. Je connais plein de coins sympas où se rendre en famille ! Ça te dit de venir avec nous ?");

export default { equiv, moyenEquiv, themeEquiv, themePicto, themetxt, txtattribut, themeLogo, themeFond, themePerso}




