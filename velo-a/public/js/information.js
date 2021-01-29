
async function bootstrap() {
    let i = 0;
    Array.from(document.getElementsByClassName("batiment_button")).forEach((el) => {
        el.onclick = () => {
            document.getElementById("batiment").className = "batiment_move" + (++i);
        }
    });
}

bootstrap();
