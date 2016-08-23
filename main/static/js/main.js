$.ajax({
  url: "/json/",
  method: "GET",
  error: function(){
    alert("Failed");
  },
  success: function(data) {
    $("tr").has("td").remove();
    data.sort(function(a, b){
      return a["date"].localeCompare(b["date"]);
    });
    data.forEach(function(dict){
      if (dict["rating"] == "malicious"){
        var rating = "malicious"
      } else if (dict["rating"] == "high-risk") {
        var rating = "high-risk"
      } else if (dict["rating"] == "medium-risk") {
        var rating = "medium-risk"
      } else if (dict["rating"] == "low-risk") {
        var rating = "low-risk"
      } else if (dict["rating"] == "clean") {
        var rating = "clean"
      }
      $("#table").append(
        "<tr class=" + rating + ">"
          + "<td>" + dict["date"] + "</td>"
          + "<td>" + dict["filename"] + "</td>"
          + "<td>" + dict["action"] + "</td>"
          + "<td>" + dict["submit-type"] + "</td>"
          + "<td>" + dict["rating"] + "</td>"
        + "</tr>"
      )
    })
  }
});
