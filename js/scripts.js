const rangeValue = document.querySelector(".slider-container .price-slider");
const rangeInputValue = document.querySelectorAll(".range-input input");

// set the price gap
let priceGap = 500;

// eventListeners
const priceInputValue = document.querySelectorAll(".price-input input");

for (let i = 0; i < priceInputValue.length; i++) {
    priceInputValue[i].addEventListener("input", e => {
        // parse min and max value of the range input
        let minp = parseInt(priceInputValue[0].value);
        let maxp = parseInt(priceInputValue[1].value);
        let diff = maxp - minp;

        if (minp < 0) {
            alert("minimum price cannot be less than 0");
            priceInputValue[0].value = 0;
            minp = 0;
        }
        // validate the input values
        if (maxp > 10000) {
            alert("maximum price cannot be greater than 10000");
            priceInputValue[1].value = 10000;
            maxp = 10000;
        }

        if (minp > maxp - priceGap) {
            priceInputValue[0].value = maxp - priceGap;
            minp = maxp - priceGap;

            if (minp < 0) {
                priceInputValue[0].value = 0;
                minp = 0;
            }
        }

        // check if the price gap is met and max price is within the range
        if (diff >= priceGap && maxp <= rangeInputValue[1].max) {
            if (e.target.className === "min-input") {
                rangeInputValue[0].value = minp;
                let value1 = rangeInputValue[0].max;
                rangeValue.computedStyleMap.left = `${(minp / value1) * 100}%`;
            } else {
                rangeInputvalue[1].value = maxp;
                let value2 = rangeInputvalue[1].max;
                rangevalue.style.right =
                    `${100 - (maxp / value2) * 100}%`;
            }
        }
    });

    // event listener to range input elements
    for (let i = 0; i < rangeInputValue.length; i++) {
        rangeInputValue[i].addEventListener("input", e => {
            let minVal = parseInt(rangeInputValue[0].value);
            let maxVal = parseInt(rangeInputValue[1].value);
            let diff = maxVal - minVal;

            // check if the price gap is exceeded
            if (diff < priceGap) {

                // check if the input is the min range input
                if (e.target.className === "min-range") {
                    rangeInputValue[0].value = maxVal - priceGap;
                } else {
                    rangeInputValue[1].value = minVal + priceGap;
                }
            } else {
                // update price inputs and range progress
                priceInputValue[0].value = minVal;
                priceInputValue[1].value = maxVal;

                rangeValue.style.left = `${(minVal / rangeInputValue[0].max) * 100}%`;
                rangeValue.style.right =
                    `${100 - (maxVal / rangeInputValue[1].max) * 100}%`;
            }
        });
    }
}