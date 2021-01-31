
export function slide(onStart, onContinue, slides) {
    let start = true;
    let i = 0;
    const batiment_return = document.getElementById("batiment_return");

    batiment_return.style.display = "none";
    document.querySelectorAll(".batiment_button").forEach((el) => {
        if(slides == null || slides[slides.length-1] !== el.parentElement.id)
            el.addEventListener('click', () => {
                document.getElementById("batiment").className = "batiment_pause" + i;
                setTimeout(function () {
                    document.getElementById("batiment").className = "batiment_move" + (++i);
                    console.log(i)
                    if (i <= 0) batiment_return.style.display = "none";
                    else {
                        batiment_return.style.display = null;
                        if (start) {
                            onStart();
                            start = false;
                        }
                    }
                }, 50);

            });
    });

    batiment_return.addEventListener('click', () => {
        document.getElementById("batiment").className = "batiment_pause" + i;
        setTimeout(function () {
            document.getElementById("batiment").className = "batiment_back" + (i--);
            if (i <= 0) {
                batiment_return.style.display = "none";
            }

            const el = document.querySelector(".show > .batiment_button");

            onContinue(el, slides, false);

        }, 50);
    });

    document.querySelectorAll(".batiment_button").forEach((el, index, list) => {
        if (slides == null || el.parentElement.id !== slides[0]) {
            el.parentElement.setAttribute("class", "hide_start");
        }
        if(slides == null || slides[slides.length-1] !== el.parentElement.id)
            el.addEventListener("click", () => {
                onContinue(el, slides, true);
            });
    });
}
