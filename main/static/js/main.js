var globalData;
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



  var render_table = function(){
    globalData.forEach(function(dict){
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
    $("tr").has("td").remove();
    globalData.sort(function(a, b){
      return new Date(b["date"]) - new Date(a["date"]);
    });
    render_table();
  });

  $(".filename").on("click", function(){
    $("tr").has("td").remove();
    globalData.sort(function(a, b){
      return a["filename"].localeCompare(b["filename"]);
    });
    render_table();
  });

  $(".action").on("click", function(){
    $("tr").has("td").remove();
    globalData.sort(function(a, b){
      return a["action"].localeCompare(b["action"]);
    });
    render_table();
  });

  $(".submit-type").on("click", function(){
    $("tr").has("td").remove();
    globalData.sort(function(a, b){
      return a["submit-type"].localeCompare(b["submit-type"]);
    });
    render_table();
  });

  $(".rating").on("click", function(){
    $("tr").has("td").remove();
    globalData.sort(function(a, b){
      return a["rating"].localeCompare(b["rating"]);
    });
    render_table();
  });

});
