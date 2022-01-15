function update(obj, val) {
    switch (obj) {
        case 'level':
            state.level = val;
            localStorage.level = val;
            localStorage.currentCorrect = '';
            localStorage.currentInCorrect = '';
            localStorage.currentPercentage = '';
            location.reload();
            break;
        case 'state.visual':
            state.visual = val;
            break;
    }
    render()
}

let numAttemptTypingCommand = 0

function train(obj, val) {
    if (val === "Enter") {
        localStorage.currentCorrect = document.querySelector(".stat not-error").innerText
        localStorage.currentInCorrect = document.querySelector(".stat error").innerText
        localStorage.currentPercentage = document.querySelector(".stat percentage").innerText
        execute(getAvailableContent("command")[val][1])
    } else {
        let tepmForStatistic = []
        if ((symbols[0].length > 1) && (numAttemptTypingCommand - 1 < symbols[0].length)) {
            if (val.split("<->")[0] === symbols[0][numAttemptTypingCommand]) {
                miniState.correct++
                numAttemptTypingCommand++
                if (numAttemptTypingCommand == symbols[0].length) {
                    symbols.shift()
                    if (symbols.length < 1) generateRandom()
                    document.querySelector(".current").innerHTML = symbols[0]
                    numAttemptTypingCommand = 0
                    return false
                }
            } else {
                miniState.incorrect++
                symbols.shift()
                numAttemptTypingCommand = 0
            }
        } else {
            symbols.shift()
            let userType = val.split("<->")[0]
            let needType = val.split("<->")[1]
            tepmForStatistic.push(needType)
            // temporary fix
            if (userType == "") {
                miniState.correct++
            } else {
                if (userType === needType) {miniState.correct++; tepmForStatistic.push(true)}
                if (userType !== needType) {miniState.incorrect++; tepmForStatistic.push(false)}
            }
        }
        tepmForStatistic.push(Date.now())
        unprocessedStatistic.push(tepmForStatistic)
        if (symbols.length < 1) generateRandom()
        let allType = miniState.correct + miniState.incorrect
        document.querySelector(".stat not-error").innerHTML = miniState.correct
        document.querySelector(".stat error").innerHTML = miniState.incorrect
        let percent = miniState.incorrect / allType * 100
        percent = parseFloat(percent.toFixed(2))
        document.querySelector(".stat percentage").innerHTML = `${percent}%`
        document.querySelector(".current").innerHTML = symbols[0]
    }

    if (state.level == "1") {
        let UIfingers = `<img src="./img/base-zero.png" style="
height: 100%;
background-image: url('./img/base-no-color.png'); 
background-size: cover; 
background-position: center center;
" id="fingers">`
        document.querySelector(".info").innerHTML = UIfingers
        let k = symbols[0].toLowerCase()
        let arrKeys = [
            ['`', "~", '1', "!", "q", "a", "z"],                    // 1-l   0
            ['2', "@", "w", "s", "x"],                              // 2-l   1
            ['3', "#", "e", "d", "c"],                              // 3-l   2
            ['4', "$", "r", "f", "v", '5', "%", "t", "g", "b"],     // 4-l   3
            ['6', "^", "y", "h", "n", '7', "&", "y", "j", "n"],     // 1-r   4
            ['8', "*", "i", "k", ","],                              // 2-r   5
            ['9', "(", "o", "l", "."],                              // 3-r   6
            ['0', ")", "p", ";", ":", "/", "?", "-", "_", "=", "+", "[", "{", "]", "}", "\\", "|", "'", '"']
        ]
        let finger = ""
        arrKeys.forEach((column, i) => {
            if (column.indexOf(k) != -1) {
                if (i < 4) finger += (i + 1)
                if (i >= 4) finger += (i + 1) - 4
                if (i < 4) finger += "-l"
                if (i >= 4) finger += "-r"
            }
        })
        document.querySelector("#fingers").src = `./img/base-${finger}-ful.png`
    }
}

function modal(text) {
    // in plan
    alert(text)
}

function execute(param) {
    let command = param.split(" ")[0]
    let obj = param.split(" ")[1].split("=")[0]
    let newValue = param.split(" ")[1].split("=")[1]
    if (command === "update+render") update(obj, newValue)
    if (command === "train") train(obj, newValue)
    if (command === "modal") modal(obj)
}

function getAvailableContent(need) {
    let currentAvailableCommands
    let currentVisual
    switch (state.visual) {
        case "initial":
            currentAvailableCommands = initialAvailableCommands;
            currentVisual = initialComponents;
            break;
        case "pre-level":
            currentAvailableCommands = preLevelAvailableCommands;
            currentVisual = preLevelComponents;
            break;
        case "level":
            currentAvailableCommands = levelAvailableCommands;
            currentVisual = levelComponents;
            break;
        case "after-level":
            currentAvailableCommands = afterLevelAvailableCommands;
            currentVisual = afterLevelComponents;
            break;
        default:
            currentVisual = "error";
            break;
    }
    switch (need) {
        case "command":
            return currentAvailableCommands;
        case "visual":
            return currentVisual;
    }
}

function getAvailableCommands() {
    let currentAvailableCommands = getAvailableContent("command")
    let arrAllowedKey = []
    for (let oneAvailableCommand in currentAvailableCommands) {
        arrAllowedKey.push(oneAvailableCommand)
    }
    return arrAllowedKey
}
