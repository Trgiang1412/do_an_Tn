const button = document.querySelector('.slider')
const filter = document.querySelector('#method-filter')
const cart = document.querySelector('.product-cards')
const logout = document.querySelector('.icon-2')


button.addEventListener("click", () => {
    if (filter.style.display === "block") {
        filter.style.display = "none";
        cart.style.marginTop = "10rem"
    } else {
        filter.style.display = "block";
        cart.style.marginTop = "25rem";
    }
});

logout.addEventListener("click", () => {
    localStorage.removeItem('token')
})