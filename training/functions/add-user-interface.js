let allowed
let i = 0
let tempContainer = document.querySelector(".info").innerHTML
let isParameteredCommand = false
function keyHandler(e) {
    // beautiful UI
    if (!isParameteredCommand) {
        document.querySelectorAll('.available kb').forEach(el => {
            el.classList.remove("yellow")
        })
        allowed = getAvailableCommands()
    }
    // if "any button" available
    if (allowed[0] === "any button") {
        // if "train"
        if (state.visual === "level") {
            // to pause train
            if (e.key === "Enter") {
                execute(`train key=Enter`)
                // train
            } else {
                execute(`train key=${e.key}<->${document.querySelector(".current").innerText}`)
            }
        }
        else if (state.visual === "after-level") {
            if (e.key === "Enter") {
                // to reset
                location.reload()
            } else {
                // continue the train
                let executeCommand = document.querySelector(`.available kb:first-child`).innerText
                let currentAvailableCommands = getAvailableContent("command")[executeCommand][1]
                execute(currentAvailableCommands)
            }
        } else {
            // if simple "any button"
            let executeCommand = document.querySelector(`.available kb:first-child`).innerText
            let currentAvailableCommands = getAvailableContent("command")[executeCommand][1]
            execute(currentAvailableCommands)
        }
    } else {
        // in any keys
        if (isParameteredCommand) {
            allowed.forEach(el => {
                if (el[i] == e.key) {
                    let executeCommand = document.querySelector('.yellow').innerText
                    let currentAvailableCommands = getAvailableContent("command")[executeCommand][1]+e.key
                    execute(currentAvailableCommands)
                }
            })
        } else {
            allowed = allowed.filter(el => (el[i] === e.key))
        }
        if ((allowed.length < 1) && (!isParameteredCommand)) {
            i = 0
            document.querySelector(".info").innerHTML = `<error>${state.errors["typing"]}</error>`
            setTimeout(() => {
                document.querySelector(".info").innerHTML = tempContainer
                document.querySelectorAll('.available kb').forEach(el => {
                    el.classList.remove("yellow")
                })
                isParameteredCommand = false
            }, 1000)
        }
        if (allowed.length == 1) {
            // in future - for commands with parameters
            if (allowed[0] == ":level=1..5") {
                let comnd = allowed[0].split("=")[0]
                let param = allowed[0].split("=")[1]
                document.querySelector(`[data-cmd="${allowed[0]}"]`).classList.add("yellow")
                // what type is this command
                let arrCasesRange = param.split("..")
                if (arrCasesRange.length > 1) {
                    // type - range
                    let positionParam = allowed[0].indexOf("=")
                    if (i == positionParam) {
                        allowed.pop()
                        for (let j = arrCasesRange[0]; j <= arrCasesRange[1]; j++) {
                            allowed.push(`${comnd}=${j}`)
                        }
                        isParameteredCommand = true
                    }
                }
                i++
            } else {
                let executeCommand = document.querySelector(`[data-cmd="${allowed}"]`).innerText
                let currentAvailableCommands = getAvailableContent("command")[executeCommand][1]
                execute(currentAvailableCommands)
            }
        }
        if (allowed.length > 1) {
            if (!isParameteredCommand) {
                allowed.forEach(el => {
                    document.querySelector(`[data-cmd="${el}"]`).classList.add("yellow")
                })
                i++
            }
            //add - if several same commands
        }
    }
}
