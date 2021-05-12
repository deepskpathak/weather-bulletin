'use strict';

/* Getting Location from Browser */
let browserLocation = function () {
    if (navigator.geolocation) {
        return new Promise(
            (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
        )
    } else {
        return new Promise(
            resolve => resolve({})
        )
    }
}

function getBrowserLocation(){
    let promise = browserLocation().then(function(position){
        if (position.coords) {
            localSave('latitude', position.coords.latitude );
            localSave('longitude', position.coords.longitude );
            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
        } else {
            reject();
        }
    });
    return promise;
}

function getZipcode(){
    return localGet('zipcode');
}

function getCountry(){
    return localGet('country');
}

function getGeoPosition(){
    let latitude = localGet('latitude');
    let longitude = localGet('longitude');
    if(latitude && longitude){
        return {
            latitude: latitude,
            longitude: longitude
        }
    }else{
        return false;
    }
}

function getCachedPosition(){
    // Check for locally saved location
    let zipcode = getZipcode();
    let country = getCountry();
    let position = getGeoPosition();

    if(position){
        return position;
    }else if(zipcode && country){
        return {
            zipcode: zipcode,
            country: country
        };z
    }else{
        return false;
    }
}

function getPosition(){

    // Check if cached
    let cachedPosition = getCachedPosition();
    if(cachedPosition){
        return new Promise(
            resolve => resolve(cachedPosition)
        );
    }else{
        return getBrowserLocation();
    }

}