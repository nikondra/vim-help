let levelAvailableCommands = {
    "any button": ["press the correct one", "train key="],
    "Enter": ["pause train", "update+render state.visual=after-level"]
}

let levelComponents = {
    "stat": [`stat: <not-error>0</not-error>/<error>0</error> (<percentage></percentage>)`],
    "state": ``,
    "current": `${symbols[0]}`,
    "info": '',
    "available": `available commands: ${myObjToStr(levelAvailableCommands)}`,
    "modal": ``
}
