// SEARCH BUTTON
document.getElementById("searchBtn")
.addEventListener("click", function () {

    alert("Searching listings...");
});


// FILTER BUTTONS
const allBtn = document.getElementById("allBtn");
const houseBtn = document.getElementById("houseBtn");
const apartmentBtn = document.getElementById("apartmentBtn");

const cards = document.querySelectorAll(".property-card");


// SHOW ALL
allBtn.addEventListener("click", function () {

    cards.forEach(function(card) {
        card.style.display = "block";
    });
});


// SHOW HOUSES
houseBtn.addEventListener("click", function () {

    cards.forEach(function(card) {

        if(card.classList.contains("house")) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});


// SHOW APARTMENTS
apartmentBtn.addEventListener("click", function () {

    cards.forEach(function(card) {

        if(card.classList.contains("apartment")) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});


// DETAILS BUTTONS
const detailButtons =
document.querySelectorAll(".detailsBtn");

detailButtons.forEach(function(button) {

    button.addEventListener("click", function () {

        alert("Property details coming soon!");
    });
});