(function(){

  function postData() {
    // select form inputs
    $(":input select, textarea").each(function() {
      // inputs simple validation
       if($(this).val() === "") {

         alert("Pola nie mogą być puste");

       } else {
         // get data from inputs
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
         // send data to mongoDB
         $.ajax({
           url: "https://api.mongolab.com/api/1/databases/case-add-form/collections/case-add-form-items?apiKey=VLJbjCcSjJW8puhnqe4oFQfJmXAw30Qy",
           type: "POST",
           data: JSON.stringify(jsonData),
           contentType: "application/json;charset=utf-8"
         }).done(function(msg) {
           alert("Dodano!");
         });

       }

    });
  }

  function getData() {
    $.ajax({
      url: "https://api.mongolab.com/api/1/databases/case-add-form/collections/case-add-form-items?apiKey=VLJbjCcSjJW8puhnqe4oFQfJmXAw30Qy"
    }).done(function(data) {
      console.log(data);
    });
  }

  // get button
  $("#btn").click(function(e){
    // form reload lock
    e.preventDefault();

    postData();

    // reset form inputs
    $("#formCaseAdd").find("input, select, textarea").val("");

    getData();

  });

})();
