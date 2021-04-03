$(document).ready(function () {
  var hikingApi;
  var searchApi;
  var autoLat;
  var autoLon;
  var maxResults;
  var distanceAway;
  var sortBy;
  var minLength;
  var zip;
  var zipApi;
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
        const { name, location, length, summary, url } = data.trails[i];
        $("#table tbody").append(
          `<tr><td><a href="${url}" target="_blank">${name}</a></td><td>${location}</td><td>${length} miles</td><td>${summary}</td></tr>`
        );
      }
    });
  }

  // Make an API call to determine the user's latitude and longitude using their IP address

  $.getJSON("https://ipapi.co/json/", function (json) {
    const { latitude, longitude, city, region } = json;
    $("#near").append(city + ", " + region);
    let reqString = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=30&maxResults=10&sort=quality&minLength=0&key=200378576-e3a2e829fd81fdf927812e2b50cb841b`;

    // Using the lat and lon, make an API call to retrieve nearby trails and append them to the html table as table rows

    getTrails(reqString);
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
    let zip = $("#enter-zip").val();
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

  const updateTrails = (dropdownId) => {
    let result = document.getElementById(dropdownId).value;
    $("tbody tr").remove();
    maxResults = result;
    hikingApi = `https://www.hikingproject.com/data/get-trails?lat=${
      clicked ? lat : autoLat
    }&lon=${
      clicked ? lon : autoLon
    }&maxDistance=${distanceAway}&maxResults=${maxResults}&sort=${sortBy}&minLength=${minLength}&key=200378576-e3a2e829fd81fdf927812e2b50cb841b`;
    getTrails(hikingApi);
  };

  $("#maxResults").change(updateTrails("maxResults"));

  // Removes table data and makes a new API call with new value when the distance away dropdown is changed

  $("#distanceAway").change(function () {
    let result = document.getElementById("distanceAway").value;
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
