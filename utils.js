// Constants/Functions
const cos = Math.cos
const sin = Math.sin
const earthRadius = 6371 // Radius of earth in km

// TODO: Validates input coordiantes are well formed and within long/lat range 
// Note: cannot use + operate to concatenate js lists 
function validate(coordinates) {

    // Destructure coordinates
    [point1, point2] = coordinates

    // Validate coordinates
    // 1. check valid regex (format: latitude , longitude)
    // Note: regex does not allow (\d.)
    const pattern = /^\s*[\+\-]?\s*0*(([1-8]?\d)?(\.\d+)?|90(\.0*)?)\s*,\s*[\+\-]?\s*0*(([1-9]?\d)?(\.\d+)?|(1[0-7]?\d)(\.\d+)?|180(\.0*)?)\s*$/
    const regex = new RegExp(pattern)
    const is_valid_point1 = regex.test(point1)
    const is_valid_point2 = regex.test(point2)

    if (is_valid_point1 && is_valid_point2) {
        
        // 2. split coordinates
        points = [...point1.split(","), ...point2.split(",")]
        validated_points = []
        
        for (let coord of points) {
            coord.trim()
            validated_points.push(parseFloat(coord))
        }
        return validated_points
    }
    return []
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