// Validates input coordiantes are well formed and within long/lat range 
// Note: cannot use + operate to concatenate js lists 
function validate(point) {

    // Check valid regex (format: latitude , longitude)
    // Note: regex does not allow (\d.)
    const pattern = /^\s*[\+\-]?\s*0*(([1-8]?\d)(\.\d+)?|90(\.0*)?)\s*,\s*[\+\-]?\s*0*(([1-9]?\d)(\.\d+)?|(1[0-7]?\d)(\.\d+)?|180(\.0*)?)\s*$/
    const regex = new RegExp(pattern)
    return regex.test(point)
}

// Query document after elements rendered
window.onload = () => {

    const formElem = document.querySelector(".main-form");
    const coordInput1 = document.querySelector("#point1"); 
    const coordInput2 = document.querySelector("#point2"); 

    formElem.addEventListener("submit", (event) => {
        event.preventDefault();

        is_valid_point1 = validate(coordInput1.value)
        is_valid_point2 = validate(coordInput2.value)

        // Both points validated 
        if (is_valid_point1 && is_valid_point2) {
        
            formElem.submit()
        
        } else {

            if (!is_valid_point1) {
                coordInput1.classList.add("is-invalid")
                coordInput1.classList.remove("is-valid")
            } else {
                coordInput1.classList.add("is-valid")
                coordInput1.classList.remove("is-invalid")
            }

            if (!is_valid_point2) {
                coordInput2.classList.add("is-invalid")
                coordInput2.classList.remove("is-valid")
            } else {
                coordInput2.classList.add("is-valid")
                coordInput2.classList.remove("is-invalid")
            }
        }
    })
}
