(function(){

  $("#btn").click(function(e){

    $(":input select, textarea").each(function() {

       if($(this).val() === "") {

         alert("Pola nie mogą być puste");

       } else {

         var jsonData = {};
         var formData = $("#formCaseAdd").serializeArray();

         $.each(formData, function() {

           if (jsonData[this.name]) {
             if (!jsonData[this.name].push) {
               jsonData[this.name] = [jsonData[this.name]];
             }
             jsonData[this.name].push(this.value || '');
           } else {
             jsonData[this.name] = this.value || '';
           }

         });

         $("#formCaseAdd").find("input, select, textarea").val("");

         console.log(jsonData);

         e.preventDefault();

       }

    });

  });

})();
