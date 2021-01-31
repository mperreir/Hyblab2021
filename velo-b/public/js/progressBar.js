function progressBar(idProgressBar, value) {
    value = value > 100 ? 100 : value;
    value = value < 0 ? 0 : value;
    d3.select(idProgressBar)
        .attr("class", "progressBar")
        .html(`<svg xmlns="http://www.w3.org/2000/svg" width="353" height="38">
                    <rect x="8" y="8" rx="11" ry="11" width="${(value / 100) * 353}" height="22" style="fill: #f98e12"></rect>
                </svg>`);
}
