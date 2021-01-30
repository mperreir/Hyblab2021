
async function bootstrap() {
    movingBatiment();
    paneHide();

    Array.from(document.getElementsByClassName("rect")).forEach(togglePath);
    Array.from(document.getElementsByClassName("text")).forEach(togglePath);

}

bootstrap();


function togglePath(el, index) {
    el.addEventListener("mouseover",() => {
        const r = document.getElementById("r-"+index);
        r.style.visibility = "visible";
        const t = document.getElementById("t-"+index);
        t.style.visibility = "visible";

        let tOvering = false;
        let rOvering = false;

        t.addEventListener("mouseenter",() => {
            tOvering = true;
        });
        r.addEventListener("mouseenter",() => {
            rOvering = true;
        });

        r.addEventListener("mouseleave",() => {
            tOvering = false;

            setTimeout(function(){
                document.addEventListener('mousemove', (e) => {

                    if (!inRect(e.x, e.y, r.getBoundingClientRect())) {
                        r.style.visibility = "hidden";
                        t.style.visibility = "hidden";
                    }
                }, {once: true});
            }, 10);
        });
    });
}

function inRect(x, y, rect) {
    return (x >= rect.left+10 && x <= rect.right-10) &&
        (y >= rect.top+10 && y <= rect.bottom-10);
}

function movingBatiment() {
    let i = 0;
    const batiment_return = document.getElementById("batiment_return");

    batiment_return.style.display = "none";
    Array.from(document.getElementsByClassName("batiment_button")).forEach((el) => {
        el.addEventListener('click', () => {
            document.getElementById("batiment").className = "batiment_pause" + i;
            setTimeout(function(){
                document.getElementById("batiment").className = "batiment_move" + (++i);
                console.log(i)
                if (i <= 0) batiment_return.style.display = "none";
                else batiment_return.style.display = null;
            }, 50);

        });
    });
    batiment_return.addEventListener('click', () => {
        document.getElementById("batiment").className = "batiment_pause" + i;
        setTimeout(function(){
            document.getElementById("batiment").className = "batiment_back" + (i--);

            if (i <= 0) {
                batiment_return.style.display = "none";
                document.getElementById("pane").setAttribute("class", "show");

            }
        }, 50);

    });
}

function paneHide() {
    document.querySelectorAll("#pane .batiment_button").forEach((el) => {
        el.addEventListener("click", () => {
            document.getElementById("pane").setAttribute("class", "hide");
        });
    })
}
