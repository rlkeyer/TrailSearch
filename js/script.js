$(document).ready(function () {
  var hikingApi;
  var searchApi;
  var autoLat;
  var autoLon;
  var autoCity;
  var autoRegion;
  var maxResults;
  var distanceAway;
  var sortBy;
  var minLength;
  var zip;
  var zipApi;
  var autoName;
  var autoLocation;
  var autoLength;
  var autoSummary;
  var autoImage;
  var autoUrl;
  var lat;
  var lon;
  var city;
  var region;
  var clicked = false;

  // Set up a function that takes a url and makes an API call to retrieve and display trail data

  function getTrails(apiUrl) {
    $.getJSON(apiUrl, function (data) {
      var len = data.trails.length;
      for (var i = 0; i < len; i++) {
        autoName = data.trails[i].name;
        autoLocation = data.trails[i].location;
        autoLength = data.trails[i].length;
        autoSummary = data.trails[i].summary;
        autoImage = data.trails[i].imgSqSmall;
        autoUrl = data.trails[i].url;
        $("#table tbody").append(
          "<tr><td>" +
            "<a href=" +
            autoUrl +
            ' target="_blank">' +
            autoName +
            "</a>" +
            "</td><td>" +
            autoLocation +
            "</td><td>" +
            autoLength +
            " " +
            "miles" +
            "</td><td>" +
            autoSummary +
            "</td>" /*<td>'+'<img src='+autoImage+'>'+'</td>''<td>'+autoUrl+'</td>*/ +
            "</tr>"
        );
        console.log(hikingApi);
      }
    });
  }

  // Make an API call to determine the user's latitude and longitude using their IP address

  $.getJSON("https://ipapi.co/json/", function (json) {
    autoLat = json.latitude;
    autoLon = json.longitude;
    autoCity = json.city;
    autoRegion = json.region;
    $("#near").append(autoCity + ", " + autoRegion);
    maxResults = 10;
    distanceAway = 30;
    sortBy = "quality";
    minLength = 0;
    hikingApi = `https://www.hikingproject.com/data/get-trails?lat=${autoLat}&lon=${autoLon}&maxDistance=${distanceAway}&maxResults=${maxResults}&sort=${sortBy}&minLength=${minLength}&key=200378576-e3a2e829fd81fdf927812e2b50cb841b`;

    // Using the lat and lon, make an API call to retrieve nearby trails and append them to the html table as table rows

    getTrails(hikingApi);
  });

  $("#zip").click(function () {
    $("#enter-zip").toggle();
    $("#zip").toggle();
    $("#cancel").toggle();
    $("#search").toggle();
  });

  $("#cancel").click(function () {
    $("#enter-zip").toggle();
    $("#zip").toggle();
    $("#cancel").toggle();
    $("#search").toggle();
  });

  $("#search").click(function () {
    zip = $("#enter-zip").val();
    $("tbody tr").remove();
    clicked = true;
    $.getJSON(`https://api.zippopotam.us/US/${zip}`, function () {})
      .done((search) => {
        if (!search) console.log("nothing here");
        lat = search.places[0].latitude;
        lon = search.places[0].longitude;
        city = search.places[0]["place name"];
        region = search.places[0].state;
        $("#near").empty();
        $("#near").html("Near: ");
        $("#near").append(city + ", " + region);
        searchApi = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=${distanceAway}&maxResults=${maxResults}&sort=${sortBy}&minLength=${minLength}&key=200378576-e3a2e829fd81fdf927812e2b50cb841b`;
        getTrails(searchApi);
      })
      .fail(() => {
        $("#near").empty();
        $("#near").html("Invalid ZIP Code...");
      });
  });

  // Removes table data and makes a new API call with new value when the results dropdown is changed

  $("#maxResults").change(function () {
    var result = document.getElementById("maxResults").value;
    $("tbody tr").remove();
    maxResults = result;
    hikingApi = `https://www.hikingproject.com/data/get-trails?lat=${
      clicked ? lat : autoLat
    }&lon=${
      clicked ? lon : autoLon
    }&maxDistance=${distanceAway}&maxResults=${maxResults}&sort=${sortBy}&minLength=${minLength}&key=200378576-e3a2e829fd81fdf927812e2b50cb841b`;
    getTrails(hikingApi);
  });

  // Removes table data and makes a new API call with new value when the distance away dropdown is changed

  $("#distanceAway").change(function () {
    console.log("changed");
    var result = document.getElementById("distanceAway").value;
    $("tbody tr").remove();
    distanceAway = result;
    hikingApi = `https://www.hikingproject.com/data/get-trails?lat=${
      clicked ? lat : autoLat
    }&lon=${
      clicked ? lon : autoLon
    }&maxDistance=${distanceAway}&maxResults=${maxResults}&sort=${sortBy}&minLength=${minLength}&key=200378576-e3a2e829fd81fdf927812e2b50cb841b`;
    getTrails(hikingApi);
  });

  // Removes table data and makes a new API call with new value when the sort by dropdown is changed

  $("#sortBy").change(function () {
    var result = document.getElementById("sortBy").value;
    $("tbody tr").remove();
    sortBy = result;
    hikingApi = `https://www.hikingproject.com/data/get-trails?lat=${
      clicked ? lat : autoLat
    }&lon=${
      clicked ? lon : autoLon
    }&maxDistance=${distanceAway}&maxResults=${maxResults}&sort=${sortBy}&minLength=${minLength}&key=200378576-e3a2e829fd81fdf927812e2b50cb841b`;
    getTrails(hikingApi);
  });

  // Removes table data and makes a new API call with new value when the min length dropdown is changed

  $("#minLength").change(function () {
    var result = document.getElementById("minLength").value;
    $("tbody tr").remove();
    minLength = result;
    hikingApi = `https://www.hikingproject.com/data/get-trails?lat=${
      clicked ? lat : autoLat
    }&lon=${
      clicked ? lon : autoLon
    }&maxDistance=${distanceAway}&maxResults=${maxResults}&sort=${sortBy}&minLength=${minLength}&key=200378576-e3a2e829fd81fdf927812e2b50cb841b`;
    getTrails(hikingApi);
  });
});
