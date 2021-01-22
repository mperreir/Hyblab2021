let initAddress = function(){
    d3.select(".button-next-address").on("click", function (){
        mySlidr.slide("age-page");

        initAge();
    });
};

new AddressAutocomplete('#address1', function (result) {
    console.log(result);
});