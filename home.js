function showMoreorlessCars() {
    var carsSection = document.getElementById("cars");

    if (carsSection.style.display === "none") {
        carsSection.style.display = "block";
        document.getElementById("btn").textContent = "Show Less";
    } else {
        carsSection.style.display = "none";
        document.getElementById("btn").textContent = "Show More Cars";
    }
}