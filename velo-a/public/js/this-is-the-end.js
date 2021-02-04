
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("reinit").addEventListener("click", () => {
        localStorage.clear();
        document.location = "/velo-a/";
    })
});
