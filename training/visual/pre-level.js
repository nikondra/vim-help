let preLevelAvailableCommands = {
    "any button": ["start train", "update+render state.visual=level"]
}

let preLevelComponents = {
    "stat": `welcome to exercises for VIM`,
    "state": ``,
    "current": `${state.level} level of training VIM`,
    "info": [`rules: ${rules[''+state.level+'']}`, `<next>type <kb>any button</kb></next>`],
    "available": `available commands: ${myObjToStr(preLevelAvailableCommands)}`,
    "modal": ``
}
