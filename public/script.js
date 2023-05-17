const details = document.querySelectorAll("details");

if (document.querySelector('details')) {
    // Fetch all the details elements
    const details = document.querySelectorAll('details');

    // Add onclick listeners
    details.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            // Close all details that are not targetDetail
            details.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                }
            });
        });
    });
}
function scrollFunction() {
  const element = document.getElementById("info");
  element.scrollIntoView({behavior: "smooth"});
}

// console.log(window.navigator.onLine)