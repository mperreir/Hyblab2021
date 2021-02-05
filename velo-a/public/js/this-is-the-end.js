
window.addEventListener('DOMContentLoaded', () => {

    document.getElementById("show-jul").addEventListener("mouseenter", () => {
        document.getElementById("jul").removeAttribute("display");
    });

    document.getElementById("show-jul").addEventListener("mouseout", () => {
        document.getElementById("jul").setAttribute("display", "none");
    });

    document.getElementById("reinit").addEventListener("click", () => {
        localStorage.clear();
        document.location = "/velo-a/";
    })
});
