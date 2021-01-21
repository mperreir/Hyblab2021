let initAge = function(){
    d3.select(".button-next-age").on("click", function (){
        mySlidr.slide("access-page");
        initAccess();
    });
};