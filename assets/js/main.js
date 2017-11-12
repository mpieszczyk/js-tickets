(function(){

  function postData() {
    // select form inputs
    $(":input select, textarea").each(function() {
      // inputs simple validation
       if($(this).val() === "") {

         alert("Pola nie mogą być puste");

       } else {
         // create empty object
         var jsonData = {};
         // get data from inputs
         var formData = $("#formCaseAdd").serializeArray();
         // add data to object
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
         // send object to mongoDB
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
    }).done(function(tableData) {
        // console.log(tableData);
      var output;
      $.each(tableData, function(key, tableData){
        output += "<tr class='table-active'>";
        output += "<td style='display: table-cell;'>" + tableData.caseNumber + "</td>";
        output += "<td style='display: table-cell;'>" + tableData.firstName + "</td>";
        output += "<td style='display: table-cell;'>" + tableData.lastName + "</td>";
        output += "<td style='display: table-cell;'>" + tableData.date + "</td>";
        output += "<td style='display: table-cell;'>" + tableData.place + "</td>";
        output += "<td style='display: table-cell;'>" + tableData.person + "</td>";
        output += "<td style='display: table-cell;'>" + tableData.describe + "</td>";
        output += "</tr>";
      });

      $("#tableBodyData").html(output);
      
    });
  }

  $(document).ready(function(){

    getData();

    // get button
    $("#btn").click(function(e){
      // form reload lock
      e.preventDefault();
      postData();
      getData();
      // reset form inputs
      $("#formCaseAdd").find("input, select, textarea").val("");
    });

  });


})();
