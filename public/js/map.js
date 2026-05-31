



 
    mapboxgl.accessToken = mapToken;
    console.log(mapToken);
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
        
    // console.log(coordinates);
    // console.log(listing.geometry);
    // console.log(listing.geometry.coordinates);

     // Create a default Marker and add it to the map.
    const marker = new mapboxgl.Marker({ color : "red" })
        .setLngLat(listing.geometry.coordinates) // map pa marker us location pa dekhana ha jha user na location di or api sa uska longittude or latitude aye to ham  us laongitutde or latitude ko marker ma add krda ga  -->Listing.geometry.coordinate
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h4>${listing.location}</h4><p>Exact Location Provided After Booking</p>`
        )
        .setMaxWidth("300px"))
        .addTo(map);
