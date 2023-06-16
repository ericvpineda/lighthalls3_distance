// Constants/Functions
const cos = Math.cos
const sin = Math.sin
const earthRadius = 6371 // Radius of earth in km

// Assumes coordinates are already valid
function format_coordinates(coordiantes) {

    // Destructure coordinates
    [point1, point2] = coordiantes

     points = [...point1.split(","), ...point2.split(",")]
     validated_points = []
     
     for (let coord of points) {
         coord.trim()
         validated_points.push(parseFloat(coord))
     }
     return validated_points
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

    unformated_dist = earthRadius * c

    return unformated_dist.toFixed(2) // Returns in km
} 

module.exports = {getHaversineDistance, format_coordinates}