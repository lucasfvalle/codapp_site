window.addEventListener("DOMContentLoaded", function (event) {
    menu_btn = document.getElementById('toggle-btn');
    menu = document.getElementById('menu-list');
    menu_btn.addEventListener("click", () =>{
        menu.classList.toggle('active');
    });
});
    