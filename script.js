document.addEventListener("DOMContentLoaded", () => {

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

card.addEventListener("mouseenter", () => {
card.style.boxShadow = "0 0 25px gold";
});

card.addEventListener("mouseleave", () => {
card.style.boxShadow = "none";
});

});

});
