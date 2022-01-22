let afterLevelAvailableCommands = {
    "any button": ["continue train", "update+render state.visual=level"],
    "Enter": ["finish the train", "update+render state.visual=initial-level"]
}

let afterLevelComponents = {
    "stat": ``,
    "state": ``,
    "current": '',
    "info": `training on pause`,
    "available": `available commands: ${myObjToStr(afterLevelAvailableCommands)}`,
    "modal": ``
}
