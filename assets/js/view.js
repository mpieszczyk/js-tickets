(function(){

  function hideForm() {

    $("#formHide").click(function(e){
      e.preventDefault();

      if($(this).html() == "ZWIŃ FORMULARZ") {
        $(this).html("ROZWIŃ FORMULARZ");
      } else {
        $(this).html("ZWIŃ FORMULARZ")
      };

      $("#formCaseAdd").find(".row").toggleClass("d-none");

    })

  };

  hideForm();

})();
