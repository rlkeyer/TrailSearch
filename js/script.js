$(document).ready(function() {
    var hikingApi 
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
        $.getJSON(apiUrl, function(data) {
        var len = data.trails.length;
        for (var i = 0; i < len; i++) {
            autoName = data.trails[i].name;
            autoLocation = data.trails[i].location;
            autoLength = data.trails[i].length;
            autoSummary = data.trails[i].summary;
            autoImage = data.trails[i].imgSqSmall;
            autoUrl = data.trails[i].url;
            $('#table tbody').append('<tr><td>'+ '<a href=' + autoUrl + ' target="_blank">' + autoName + '</a>' + '</td><td>'+autoLocation+'</td><td>'+autoLength+' '+'miles'+'</td><td>'+autoSummary+'</td>'/*<td>'+'<img src='+autoImage+'>'+'</td>''<td>'+autoUrl+'</td>*/+'</tr>');
            console.log(hikingApi);
        }
      });
    }

    // Make an API call to determine the user's latitude and longitude using their IP address

    $.getJSON("https://ipapi.co/json/", function(json) {
      autoLat = (json.latitude);
      autoLon = (json.longitude);
      autoCity = (json.city);
      autoRegion = (json.region);
      $("#near").append(autoCity + ", " + autoRegion);
      maxResults = 10;
      distanceAway = 30;
      sortBy = "quality";
      minLength = 0;
      hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + autoLat + "&lon=" + autoLon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");

      // Using the lat and lon, make an API call to retrieve nearby trails and append them to the html table as table rows 

          getTrails(hikingApi);
    });

        $('#zip').click( function() {
        $('#enter-zip').toggle();
        $('#zip').toggle();
        $('#cancel').toggle();
        $('#search').toggle();
    })

    $('#cancel').click( function() {
        $('#enter-zip').toggle();
        $('#zip').toggle();
        $('#cancel').toggle();
        $('#search').toggle();
        
    })

    $('#search').click( function() {
        zip = $('#enter-zip').val();
        console.log(zip);
        $('tbody tr').remove();
        clicked = true;
        $.getJSON("https://api.zippopotam.us/US/" + zip, function(search) {
            lat = search.places[0].latitude;
            lon = search.places[0].longitude;
            city = search.places[0]["place name"];
            region = search.places[0].state;
            $("#near").empty();
            $("#near").html("Near: ")
            $("#near").append(city + ", " + region);
            searchApi = ("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");

            getTrails(searchApi);
        })
    })

    // Working on adding a function that will allow user to search via ZIP code

    /*zipApi = "http://api.zippopotam.us/US/" + zip;

    if (value) {
        $.getJSON(zipApi, function(zipData) {

        })
    }*/

    // Removes table data and makes a new API call with new value when the results dropdown is changed

    $("#results").change(function() {
        var result = document.getElementById("results").value;
        $('tbody tr').remove();
        console.log(result);
        switch (result) {
            case "10":
                maxResults = 10;
                break;
            case "20":
                maxResults = 20;
                break;
            case "30":
                maxResults = 30;
                break;
            case "40":
                maxResults = 40;
                break;
            case "50":
                maxResults = 50;
                break;
        }

        if (clicked == true) {
            hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");
        }

        else {
            hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + autoLat + "&lon=" + autoLon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");
        }


        getTrails(hikingApi);
    })

// Removes table data and makes a new API call with new value when the distance away dropdown is changed

    $("#distance-away").change(function() {
        console.log("changed");
        var result = document.getElementById("distance-away").value;
        $('tbody tr').remove();
        switch (result) {
            case "10":
                distanceAway = 10;
                break;
            case "20":
                distanceAway = 20;
                break;
            case "30":
                distanceAway = 30;
                break;
            case "40":
                distanceAway = 40;
                break;
            case "50":
                distanceAway = 50;
                break;
        }

        if (clicked == true) {
            hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");
        }

        else {
            hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + autoLat + "&lon=" + autoLon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");
        }

        getTrails(hikingApi);
    })

// Removes table data and makes a new API call with new value when the sort by dropdown is changed

    $("#sort-by").change(function() {
        var result = document.getElementById("sort-by").value;
        $('tbody tr').remove();
        console.log(result);
        switch (result) {
            case "quality":
                sortBy = "quality";
                break;
            case "distance":
                sortBy = "distance";
                break;
        }

        if (clicked == true) {
            hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");
        }

        else {
            hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + autoLat + "&lon=" + autoLon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");
        }

        getTrails(hikingApi);
    })

// Removes table data and makes a new API call with new value when the min length dropdown is changed

    $("#min-length").change(function() {
        var result = document.getElementById("min-length").value;
        $('tbody tr').remove();
        console.log(result);
        switch (result) {
            case "0":
                minLength = 0;
                break;
            case "2":
                minLength = 2;
                break;
            case "5":
                minLength = 5;
                break;
            case "10":
                minLength = 10;
                break;
        }

        if (clicked == true) {
            hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");
        }

        else {
            hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + autoLat + "&lon=" + autoLon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");
        }

        getTrails(hikingApi);
    })


    
});


