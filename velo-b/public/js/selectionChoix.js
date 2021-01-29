let initSlideSelectionVoiture = function (){
  const idYesBut = 'ic-oui-voit';
  const idNoBut = 'ic-non-voit';
  button(idYesBut,'');
}

let initSlideSelectionVelo = function (){
  const idYesBut = 'ic-oui-velo';
  const idNoBut = 'ic-non-velo';
    
}

let initSlideSelectionBicloo = function (){
  const idYesBut = 'ic-oui-bicloo';
  const idNoBut = 'ic-non-bicloo';
}

let initSlideSelectionTransport = function (){
  const idYesBut ='ic-oui-transport';
  const idNoBut = 'ic-non-transport';
    
}

let button = function (idbutton,page) {

    d3.select(idbutton).on('click', function () {
      overrideAnim({
        targets: idbutton,
        scale: 0
      });
      mySlidr.slide(page);
      if (page == 'infos-selection-voiture') {
        initSlideSelectionVoiture();
      }
      else if (page == 'infos-selection-velo') {
        initSlideSelectionVelo();
      }
      else if (page == 'infos-selection-bycloo') {
        initSlideSelectionBicloo();
      }
      else if (page == 'infos-selection-transport') {
        initSlideSelectionTransport();
      }
    });
  
  }

