let initialAvailableCommands = {
    ":s": ["start train", "update+render state.visual=pre-level"],
    ":h": ["reference information", "modal help_is_not_created_yet___sorry_:("],
    ":level=1..5": ["change level", "update+render level="]
}

let initialComponents = {
    "stat": `welcome to exercises on VIM`,
    "state": ``,
    "current": `keyboard and VIM exercises`,
    "info": [
        `your level is: <upd data-content="level">${state.level}</upd>`,
        `you can choose level - type <kb>:level=1..${lengthObj(rules)}</kb>`,
        `<next>type <kb>:s</kb> to go to the chosen level</next>`],
    "available": `available commands: ${myObjToStr(initialAvailableCommands)}`,
    "modal": ``
}
