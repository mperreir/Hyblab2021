function progressBar(idProgressBar, value) {
    value = value > 1 ? 1 : value;
    value = value < 0 ? 0 : value;

    d3.select(idProgressBar)
        .attr("class", "progressBar")
        .html(`<svg width="353" height="38"><rect x="8" y="8" rx="11" ry="11" width="${(value / 1) * 345}" height="22" style="fill: #f98e12"/></svg>`);
}
