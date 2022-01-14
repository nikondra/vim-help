function render(param) {
    if (state.visual === "after-level") {
        countStatistic()
        // update all DATA
        let speed = (statistics.speed/1000).toFixed(1)
        let normalSpeed = parseInt(60 / speed)
        let percentage = 100 - parseInt(localStorage.currentPercentage)
        let tempo = (speed == 0.0) ? '' : `(<span style="animation: blink ${speed}s linear infinite;">visually the tempo looks like this</span>)`
        let sectionSpeed = (speed) ? `<br>on average ${speed} sec. per key ${tempo}` : ``
        afterLevelComponents.current = `correctly: ${localStorage.currentCorrect} (${percentage}%), ${normalSpeed} characters per minute
            ${sectionSpeed}
            <br><br> ${offerTransitionToLevel(percentage, speed)}`
    }
    // get current visual state
    let currentVisual = getAvailableContent("visual")
    // clear page
    let arrPageContainer = document.querySelectorAll("div")
    arrPageContainer.forEach(el => el.innerHTML = "")
    // if it was a error
    if (currentVisual === "error") document.querySelector(".current").innerHTML = state.errors["render"]
    // if all is ok
    for (let component in currentVisual) {
        if (typeof currentVisual[component] !== "object") {
            document.querySelector("."+component).innerHTML = currentVisual[component]
        }
        else {
            let tempComponent = currentVisual[component]
            for (let strComponent in tempComponent) {
              //  tempComponent[strComponent] = tempComponent[strComponent].replaceAll('__currentCorrect__', getFromLocalstorage())
                document.querySelector("."+component).innerHTML += `<div>${tempComponent[strComponent]}</div>`
            }
        }
    }
    if (param) {
        document.querySelector(`[data-content="${param}"]`).innerHTML = localStorage[param]
    }
    beautifulUI()
    document.onkeypress = keyHandler
}
