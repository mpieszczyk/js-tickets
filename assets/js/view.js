(function(){

  function hideForm() {

    $("#formHide").click(function(e){
      e.preventDefault();
      if($("#buttonLabel").html() == "ZWIŃ FORMULARZ") {
        $("#buttonLabel").html("ROZWIŃ FORMULARZ");
        $(".fa").removeClass("fa-angle-double-up");
        $(".fa").addClass("fa-angle-double-down");
      } else {
        $("#buttonLabel").html("ZWIŃ FORMULARZ");
        $(".fa").removeClass("fa-angle-double-down");
        $(".fa").addClass("fa-angle-double-up");
      };
      $("#formCaseAdd").find(".row").toggleClass("d-none");
    })
  };

  function tablePagination() {
    
  }

  hideForm();
  tablePagination()

})();
