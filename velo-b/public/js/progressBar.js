function progressBar(idProgressBar, values) {
    let [average, min, max] = values;

    const normalised = constrain(average, min, max);
    const value = normalised < 0 ? 0 : normalised > 1 ? 1 : normalised;

    d3.select(idProgressBar)
        .attr("class", "progressBar")
        .html(`<span>${Number(average).toFixed(2)}</span><svg width="353" height="38"><rect x="8" y="8" rx="11" ry="11" width="${(value / 1) * 345}" height="22"/></svg>`);
}

function constrain(value, min, max) {
    return (value - min) / (max - min);
}
