var globalData;
var selectedData;
$(document).ready(function() {
  $.ajax({
    url: "/json/",
    method: "GET",
    error: function(){
      alert("Failed");
    },
    success: function(data) {
      globalData = data
      $("tr").has("td").remove();
      data.sort(function(a, b){
        return new Date(b["date"]) - new Date(a["date"]);
      });
      data.forEach(function(dict){
        if (dict["rating"] == "malicious"){
          var rating = "malicious";
        } else if (dict["rating"] == "high-risk") {
          var rating = "high-risk";
        } else if (dict["rating"] == "medium-risk") {
          var rating = "medium-risk";
        } else if (dict["rating"] == "low-risk") {
          var rating = "low-risk";
        } else if (dict["rating"] == "clean") {
          var rating = "clean";
        }
        $("#table").append(
          "<tr class=" + rating + ">"
            + "<td>" + dict["date"] + "</td>"
            + "<td>" + dict["filename"] + "</td>"
            + "<td>" + dict["action"] + "</td>"
            + "<td>" + dict["submit-type"] + "</td>"
            + "<td>" + dict["rating"] + "</td>"
          + "</tr>"
        );
      });
    }
  });



  var render_table = function(newData){
    $("tr").has("td").remove();
    newData.forEach(function(dict){
      if (dict["rating"] == "malicious"){
        var rating = "malicious";
      } else if (dict["rating"] == "high-risk") {
        var rating = "high-risk";
      } else if (dict["rating"] == "medium-risk") {
        var rating = "medium-risk";
      } else if (dict["rating"] == "low-risk") {
        var rating = "low-risk";
      } else if (dict["rating"] == "clean") {
        var rating = "clean";
      }
      $("#table").append(
        "<tr class=" + rating + ">"
          + "<td>" + dict["date"] + "</td>"
          + "<td>" + dict["filename"] + "</td>"
          + "<td>" + dict["action"] + "</td>"
          + "<td>" + dict["submit-type"] + "</td>"
          + "<td>" + dict["rating"] + "</td>"
        + "</tr>"
      );
    });
  };


  $(".date").on("click", function(){
    selectedData.sort(function(a, b){
      return new Date(b["date"]) - new Date(a["date"]);
    });
    render_table(selectedData);
  });

  $(".filename").on("click", function(){
    selectedData.sort(function(a, b){
      return a["filename"].localeCompare(b["filename"]);
    });
    render_table(selectedData);
  });

  $(".action").on("click", function(){
    selectedData.sort(function(a, b){
      return a["action"].localeCompare(b["action"]);
    });
    render_table(selectedData);
  });

  $(".submit-type").on("click", function(){
    selectedData.sort(function(a, b){
      return a["submit-type"].localeCompare(b["submit-type"]);
    });
    render_table(selectedData);
  });

  $(".rating").on("click", function(){
    selectedData.sort(function(a, b){
      return a["rating"].localeCompare(b["rating"]);
    });
    render_table(selectedData);
  });

  $(".time-period").on("change", function(){
    selectedData = [];
    if ($(".time-period option:selected").val() === "24-hours"){
      var now = new Date();
      now.setDate(now.getDate() - 1);
      var oneDayAgo = new Date(now);

      globalData.forEach(function(dict){
        if (new Date(dict["date"]) > oneDayAgo){
          selectedData.push(dict);
        }
      });
      render_table(selectedData);

    } else if ($(".time-period option:selected").val() === "7-days") {
      var now = new Date();
      now.setDate(now.getDate() - 7);
      var sevenDaysAgo = new Date(now);

      globalData.forEach(function(dict){
        if (new Date(dict["date"]) > sevenDaysAgo){
          selectedData.push(dict);
        }
      });
      render_table(selectedData);

    } else if ($(".time-period option:selected").val() === "4-weeks") {
      var now = new Date();
      now.setDate(now.getDate() - 28);
      var fourWeeksAgo = new Date(now);

      globalData.forEach(function(dict){
        if (new Date(dict["date"]) > fourWeeksAgo){
          selectedData.push(dict);
        }
      });
      render_table(selectedData);
    } else if ($(".time-period option:selected").val() === "all-data") {
      selectedData = globalData
      render_table(selectedData);
    }
  });

});
