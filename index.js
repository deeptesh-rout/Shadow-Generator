const preview = document.getElementById("preview");
const styles = document.getElementById("styles");
const ranges = document.querySelectorAll(".settings input");
const copyButton = document.getElementById("copy-styles");

// Cache the DOM elements to avoid repeated access
const xShadowInput = document.getElementById("x-shadow");
const yShadowInput = document.getElementById("y-shadow");
const blurRadiusInput = document.getElementById("blur-r");
const spreadRadiusInput = document.getElementById("spread-r");
const shadowColorInput = document.getElementById("shadow-color");
const shadowOpacityInput = document.getElementById("shadow-opacity");
const shadowInsetInput = document.getElementById("inset-shadow");
const borderRadiusInput = document.getElementById("border-r");

// Add event listener to each range input with debounce
ranges.forEach((slider) => {
    slider.addEventListener("input", debounce(generateStyles, 100));
});

// Function to generate and update styles
function generateStyles() {
    const xShadow = xShadowInput.value;
    const yShadow = yShadowInput.value;
    const blurRadius = blurRadiusInput.value;
    const spreadRadius = spreadRadiusInput.value;
    const shadowColor = shadowColorInput.value;
    const shadowOpacity = shadowOpacityInput.value;
    const shadowInset = shadowInsetInput.checked;
    const borderRadius = borderRadiusInput.value;

    // Create the box shadow CSS property value
    const boxShadow = `${shadowInset ? "inset " : ""}${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(shadowColor, shadowOpacity)}`;

    // Update the preview element styles
    preview.style.boxShadow = boxShadow;
    preview.style.borderRadius = `${borderRadius}px`;

    // Update textarea with generated styles
    styles.textContent = `box-shadow: ${boxShadow};\nborder-radius: ${borderRadius}px;`;
}

// Function to convert hex color and opacity to rgba format
function hexToRgba(shadowColor, shadowOpacity) {
    const r = parseInt(shadowColor.substr(1, 2), 16);
    const g = parseInt(shadowColor.substr(3, 2), 16);
    const b = parseInt(shadowColor.substr(5, 2), 16);

    return `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
}

// Function to copy the generated styles
function copyStyles() {
    styles.select();
    document.execCommand("copy");
    copyButton.innerText = "Copied!";
    setTimeout(() => {
        copyButton.innerText = "Copy Styles";
    }, 500);
}

// Debounce function to limit the rate at which a function can fire
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}

// Initial styles generation
generateStyles();

// Event listener for the copy button
copyButton.addEventListener("click", copyStyles);
