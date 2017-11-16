(function() {

//post data to db
    function postData() {
      // select form inputs
      $(":input select, textarea").each(function() {
        // inputs simple validation
        if ($(this).val() === "") {

          alert("Pola nie mogą być puste")

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
            alert("Dodano!")
          });

        }

      });
    }
//=============================================================================
//=============================================================================

// get db data
    function getData() {
      $.ajax({
        url: "https://api.mongolab.com/api/1/databases/case-add-form/collections/case-add-form-items?apiKey=VLJbjCcSjJW8puhnqe4oFQfJmXAw30Qy"
      }).done(function(tableData) {
        var output;
        $.each(tableData, function(key, tableData) {
          output += "<tr class='table-active'>";
          output += "<td style='display: table-cell;'>" + tableData.caseNumber + "</td>";
          output += "<td style='display: table-cell;'>" + tableData.firstName + "</td>";
          output += "<td style='display: table-cell;'>" + tableData.lastName + "</td>";
          output += "<td style='display: table-cell;'>" + tableData.date + "</td>";
          output += "<td style='display: table-cell;'>" + tableData.place + "</td>";
          output += "<td style='display: table-cell;'>" + tableData.person + "</td>";
          output += "<td style='display: table-cell;'>" + tableData.describe + "</td>";
          output += "<td style='display: table-cell;'><i class='fa fa-pencil-square fa-lg' aria-hidden='true'></i>&nbsp;<i class='fa fa-trash fa-lg' aria-hidden='true'></i></td>";
          output += "</tr>";
        })

        $("#tableBodyData").html(output);
        tablePagination();
      })
    }
//=============================================================================
//=============================================================================

// table pagination
    function tablePagination() {

      function hideTabRows() {
        var trnum = 0,
          maxRows = parseInt($("#numOfRows").val()),
          totalRows = $("#myTab tbody tr").length;
        $("#myTab tr:gt(0)").each(function() {
          trnum++
          if (trnum > maxRows) {
            $(this).hide();
          } else if (trnum <= maxRows) {
            $(this).show();
          }
        })
      }

      function addTabPagin() {
        var maxRows = parseInt($("#numOfRows").val()),
          totalRows = $("#myTab tbody tr").length;
        if (totalRows > maxRows) {
          var pagenum = Math.ceil(totalRows / maxRows);
          for (var i = 1; i <= pagenum;) {
            $(".pagination").append("<li class='page-item' data-page=" + i + ">\<a style='user-select: none;'' class='page-link'>" + i++ + "</a>\</li>").show();
          }
        } else {
          $(".pagination").html("");
        }
        $(".pagination li:first-child").addClass("active");
      }

      function changeTabPagin() {
        $(".pagination li").on("click", function() {
          var pagenum = $(this).attr("data-page"),
              maxRows = parseInt($("#numOfRows").val()),
              trIndex = 0;
          $(".pagination li").removeClass("active");
          $(this).addClass("active");
          $("#myTab tr:gt(0)").each(function() {
            trIndex++
            if (trIndex > (maxRows * pagenum) || trIndex <= ((maxRows * pagenum) - maxRows)) {
              $(this).hide();
            } else {
              $(this).show();
            }
          })
        })
      }

      hideTabRows();
      $(".pagination").html("");
      addTabPagin();
      changeTabPagin();

    }
//=============================================================================
//=============================================================================

// table sorting
    function sortTable(table, th) {
    	var rows = $(table).find("tr:gt(0)").toArray().sort(compare($(th).index()));

    	if ($(th).hasClass("asc")) {
          $(th).removeClass("asc").addClass("desc");
          $(th).find("i.fa").removeClass("fa-sort-amount-asc").addClass("fa-sort-amount-desc");
    	    rows = rows.reverse();
    	}
    	else {
    	  $(th).removeClass("desc").addClass("asc");
        $(th).find("i.fa").removeClass("fa-sort-amount-desc").addClass("fa-sort-amount-asc");
    	}

    	for (var i = 0; i < rows.length; i++) {
    		$(table).append(rows[i]);
    	}
    }

//compare values in columns
    function compare(index) {
    	return function(a, b) {
    		var valA = $(a).children("td").eq(index).html();
    		var valB = $(b).children("td").eq(index).html();
    		return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
    	}
    }
//=============================================================================
//=============================================================================

// hide/show form mechanism
    function showForm() {

      $("#formHide").click(function(e) {
        e.preventDefault();
        if($("#buttonLabel").html() == "ZWIŃ FORMULARZ") {
          $("#buttonLabel").html("ROZWIŃ FORMULARZ");
          $(this).find(".fa").removeClass("fa-angle-double-up");
          $(this).find(".fa").addClass("fa-angle-double-down");
        } else {
          $("#buttonLabel").html("ZWIŃ FORMULARZ");
          $(this).find(".fa").removeClass("fa-angle-double-down");
          $(this).find(".fa").addClass("fa-angle-double-up");
        }
        $("#formCaseAdd").find(".row").toggleClass("d-none");
      })
    }
//=============================================================================
//=============================================================================

  $(document).ready(function() {

    showForm();
    getData();

    $("#btn").click(function(e) {
      e.preventDefault(e);
      postData();
      getData();
      $("#formCaseAdd").find("input, select, textarea").val("");
    })

    $("#numOfRows").on("change", function() {
      tablePagination();
    })

    $("th").click(function() {
      $("i.fa").removeClass("fa-sort-amount-desc");
      $("i.fa").removeClass("fa-sort-amount-asc");
      sortTable($("#myTab"), $(this));
    });

  });


})();
