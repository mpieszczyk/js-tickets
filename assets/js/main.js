(function(){

  function postData() {
    // select form inputs
    $(":input select, textarea").each(function() {
      // inputs simple validation
       if( $(this).val() === "" ) {

         alert("Pola nie mogą być puste")

       } else {
         // create empty object
         var jsonData = {}
         // get data from inputs
         var formData = $("#formCaseAdd").serializeArray()
         // add data to object
         $.each(formData, function() {

           if ( jsonData[this.name] ) {
             if ( !jsonData[this.name].push ) {
               jsonData[this.name] = [jsonData[this.name]]
             }
             jsonData[this.name].push(this.value || '')
           } else {
             jsonData[this.name] = this.value || ''
           }

         });
         // send object to mongoDB
         $.ajax({
           url: "https://api.mongolab.com/api/1/databases/case-add-form/collections/case-add-form-items?apiKey=VLJbjCcSjJW8puhnqe4oFQfJmXAw30Qy",
           type: "POST",
           data: JSON.stringify(jsonData),
           contentType: "application/json;charset=utf-8"
         }).done(function(msg) {
           alert("Dodano!")
         });

       }

    });
  }

  function getData() {
    $.ajax({
      url: "https://api.mongolab.com/api/1/databases/case-add-form/collections/case-add-form-items?apiKey=VLJbjCcSjJW8puhnqe4oFQfJmXAw30Qy"
    }).done(function(tableData) {
      var output
      $.each(tableData, function(key, tableData) {
        output += "<tr class='table-active'>";
        output += "<td style='display: table-cell;'>" + tableData.caseNumber + "</td>"
        output += "<td style='display: table-cell;'>" + tableData.firstName + "</td>"
        output += "<td style='display: table-cell;'>" + tableData.lastName + "</td>"
        output += "<td style='display: table-cell;'>" + tableData.date + "</td>"
        output += "<td style='display: table-cell;'>" + tableData.place + "</td>"
        output += "<td style='display: table-cell;'>" + tableData.person + "</td>"
        output += "<td style='display: table-cell;'>" + tableData.describe + "</td>"
        output += "<td style='display: table-cell;'><i class='fa fa-pencil-square fa-lg' aria-hidden='true'></i>&nbsp;<i class='fa fa-trash fa-lg' aria-hidden='true'></i></td>"
        output += "</tr>"
      })

      $("#tableBodyData").html(output)
      tabPagin()
    })
  }

  // table pagination
  function tabPagin() {
    var table = "#myTab",
    trnum = 0,
    maxRows = parseInt($("#numOfRows").val()),
    totalRows = $(table+" tbody tr").length
    $(table + "tr:gt(0)").each(function() {
      trnum++
      if ( trnum > maxRows ) {
        $(this).hide()
      } else if ( trnum <= maxRows ) {
        $(this).show()
      }
    })
    if( totalRows > maxRows ) {
      var pagenum = Math.ceil(totalRows/maxRows)
      for(var i=1;i<=pagenum;) {
        $(".pagination").append("<li class='page-item' data-page=" + i + ">\<a style='user-select: none;'' class='page-link'>" + i++ + "</a>\</li>").show()
      }
    } else {
      $(".pagination").html("")
      $(table + " tr:gt(0)").show
    }
    $(".pagination li:first-child").addClass("active")
    $(".pagination li").on("click",function(){
      var pagenum = $(this).attr("data-page"),
      trIndex = 0
      $(".pagination li").removeClass("active")
      $(this).addClass("active")
      $(table + " tr:gt(0)").each(function(){
        trIndex++
        if( trIndex > (maxRows*pagenum) || trIndex <= ((maxRows*pagenum)-maxRows) ) {
          $(this).hide()
        } else {
          $(this).show()
        }
      })
    })
  }

  $(document).ready(function() {

    getData();

    // get button
    $("#btn").click(function(e){
      // form reload lock
      e.preventDefault(e)
      postData()
      getData()
      // reset form inputs
      $("#formCaseAdd").find("input, select, textarea").val("");
    });

    $("#numOfRows").on("change", function() {
      tabPagin()
    })

  });


})();
