// Constants/Functions
const cos = Math.cos
const sin = Math.sin
const earthRadius = 6371 // Radius of earth in km

// TODO: Validates input coordiantes are well formred and within range
// Note:
// - cannot use + operate to concatenate js lists 
function validate(coordinates) {
    [point1, point2] = coordinates

    coord1 = point1.split(",")
    coord2 = point2.split(",")

    return [parseFloat(coord1[0]), parseFloat(coord1[1]),
    parseFloat(coord2[0]), parseFloat(coord2[1])]
}

// Get air distance between two points in km
// Assumes that coordinates are floats and validated
function getHaversineDistance(lat1, long1, lat2, long2) {

    convert_to_radians = (Math.PI / 180)
    
    phi1 = lat1 * convert_to_radians
    phi2 = lat2 * convert_to_radians
    
    delta_phi = (lat2 - lat1) * convert_to_radians
    delta_lambda = (long2 - long1) * convert_to_radians

    a = sin(delta_phi / 2) ** 2 + cos(phi1) * cos(phi2) * sin(delta_lambda / 2) ** 2
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return earthRadius * c // Returns in km
} 

module.exports = {validate, getHaversineDistance}