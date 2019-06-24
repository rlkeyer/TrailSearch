$(document).ready(function() {
    var hikingApi;
    var lat;
    var lon;
    var city;
    var region;
    var maxResults;
    var distanceAway;
    var sortBy;
    var minLength;

    // Make an API call to determine the user's latitude and longitude using their IP address

    $.getJSON("https://ipapi.co/json/", function(json) {
      lat = (json.latitude);
      lon = (json.longitude);
      city = (json.city);
      region = (json.region);
      $("#near").append(city + ", " + region);
      maxResults = 10;
      distanceAway = 10;
      sortBy = "quality";
      minLength = 0;
      hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");

    // Using the lat and lon, make an API call to retrieve nearby trails and append them to the html table as table rows 

      $.getJSON(hikingApi, function(data) {
        var len = data.trails.length;
        for (var i = 0; i < len; i++) {
            var name = data.trails[i].name;
            var location = data.trails[i].location;
            var length = data.trails[i].length;
            var summary = data.trails[i].summary;
            var image = data.trails[i].imgSqSmall;
            var url = data.trails[i].url;
            $('#table tbody').append('<tr><td>'+name+'</td><td>'+location+'</td><td>'+length+' '+'miles'+'</td><td>'+summary+'</td>'/*<td>'+'<img src='+image+'>'+'</td>''<td>'+url+'</td>*/+'</tr>');
        }
      });
    });

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

        hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");

        $.getJSON(hikingApi, function(data) {
            var len = data.trails.length;
            for (var i = 0; i < len; i++) {
                var name = data.trails[i].name;
                var location = data.trails[i].location;
                var length = data.trails[i].length;
                var summary = data.trails[i].summary;
                var image = data.trails[i].imgSqSmall;
                var url = data.trails[i].url;
                $('#table tbody').append('<tr><td>'+name+'</td><td>'+location+'</td><td>'+length+' '+'miles'+'</td><td>'+summary+'</td>'/*<td>'+'<img src='+image+'>'+'</td>''<td>'+url+'</td>*/+'</tr>');
            }
    
          });
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

        hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");

        $.getJSON(hikingApi, function(data) {
            var len = data.trails.length;
            for (var i = 0; i < len; i++) {
                var name = data.trails[i].name;
                var location = data.trails[i].location;
                var length = data.trails[i].length;
                var summary = data.trails[i].summary;
                var image = data.trails[i].imgSqSmall;
                var url = data.trails[i].url;
                $('#table tbody').append('<tr><td>'+name+'</td><td>'+location+'</td><td>'+length+' '+'miles'+'</td><td>'+summary+'</td>'/*<td>'+'<img src='+image+'>'+'</td>''<td>'+url+'</td>*/+'</tr>');
            }
    
          });
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

        hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");

        $.getJSON(hikingApi, function(data) {
            var len = data.trails.length;
            for (var i = 0; i < len; i++) {
                var name = data.trails[i].name;
                var location = data.trails[i].location;
                var length = data.trails[i].length;
                var summary = data.trails[i].summary;
                var image = data.trails[i].imgSqSmall;
                var url = data.trails[i].url;
                $('#table tbody').append('<tr><td>'+name+'</td><td>'+location+'</td><td>'+length+' '+'miles'+'</td><td>'+summary+'</td>'/*<td>'+'<img src='+image+'>'+'</td>''<td>'+url+'</td>*/+'</tr>');
            }
    
          });
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

        hikingApi = ("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distanceAway + "&maxResults=" + maxResults + "&sort=" + sortBy + "&minLength=" + minLength + "&key=200378576-e3a2e829fd81fdf927812e2b50cb841b");

        $.getJSON(hikingApi, function(data) {
            var len = data.trails.length;
            for (var i = 0; i < len; i++) {
                var name = data.trails[i].name;
                var location = data.trails[i].location;
                var length = data.trails[i].length;
                var summary = data.trails[i].summary;
                var image = data.trails[i].imgSqSmall;
                var url = data.trails[i].url;
                $('#table tbody').append('<tr><td>'+name+'</td><td>'+location+'</td><td>'+length+' '+'miles'+'</td><td>'+summary+'</td>'/*<td>'+'<img src='+image+'>'+'</td>''<td>'+url+'</td>*/+'</tr>');
            }
    
          });
    })


    
});


