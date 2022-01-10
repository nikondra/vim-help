// transform obj AvailableCommands to str
function myObjToStr(obj) {
    let finalStr = ''
    for (let oneAvailableCommands in obj) {
        finalStr += `<kb data-cmd="${oneAvailableCommands}">${oneAvailableCommands}</kb> `
        finalStr += obj[oneAvailableCommands][0]
    }
    return finalStr
}
String.prototype.repeat = function( num ) {
    return new Array( num + 1 ).join( this );
}
function getRandomFromRange(min, max) {
    return Math.random() * (max - min) + min;
}
// generate random symbols
function generateRandom() {
    let tempRand, base, middle, end
switch(state.level.toString()) {
case "1":
base = state.alphabet[0].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(3).split("")
middle = state.alphabet[1].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(1).split("")
end = state.alphabet[2].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(1).split("")
    tempRand = [...base, ...middle, ...end]
    break;
case "2":
base = state.alphabet[0].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(5).split("")
middle = state.alphabet[1].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(3).split("")
end = state.alphabet[2].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(2).split("")
    tempRand = [...base, ...middle, ...end].sort(function(){return 0.5-Math.random()})
    break;
case "3":
base = state.alphabet[0].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(5).split("")
middle = state.alphabet[1].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(5).split("")
end = state.alphabet[2].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(3).split("")
    tempRand = [...base, ...middle, ...end].sort(function(){return 0.5-Math.random()})
	tempRand = tempRand.map(el => {
        if ((getRandomFromRange(1,50) < 10) && (el.match(/[a-z]/i))) {return el.toUpperCase()}
        else return el
    })
    break;
case "4":
base = state.alphabet[0].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(7).split("")
middle = state.alphabet[1].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(7).split("")
end = state.alphabet[2].split('').sort(function(){return 0.5-Math.random()}).join("").repeat(3).split("")
    tempRand = [...base, ...middle, ...end].sort(function(){return 0.5-Math.random()})
	tempRand = tempRand.map(el => {
        if ((getRandomFromRange(1,50) < 10) && (el.match(/[a-z]/i))) {return el.toUpperCase()}
        else return el
    })
    break;
case "5":
base = state.commands.sort(function(){return 0.5-Math.random()})
middle = []
end = []
    tempRand = [...base, ...middle, ...end]
break;
}
    symbols = tempRand
}

function lengthObj(obj) {
    let leng = 0
    for (let s in obj) leng++
    return leng
}

function beautifulUI(){
    if (state.visual === "level") {
        document.querySelector(".current").style.fontSize = "200%"
        document.querySelector(".current").style.width = "20vh"
        document.querySelector(".current").style.height = "20vh"
        document.querySelector(".current").style.lineHeight = "20vh"
    } else {
        document.querySelector(".current").style.fontSize = "100%"
        document.querySelector(".current").style.width = null
        document.querySelector(".current").style.height = null
        document.querySelector(".current").style.lineHeight = null
    }
    if (state.visual != "level") {
        document.querySelector(".info").classList.add("tip-off")
        document.querySelector(".info").classList.remove("tip-on")
    } else {
        document.querySelector(".info").classList.remove("tip-off")
        document.querySelector(".info").classList.add("tip-on")
    }
}

function offerTransitionToLevel(percentage, speed) {
    let rules = rulesStrong[state.level - 1]
    let level = parseInt(state.level)
    speed = parseInt(speed)
    percentage = parseInt(percentage)
    console.log(percentage, speed, rules)
    if ((level+1) >= rulesStrong.length)
        return `you are at the last level. you can safely switch to VIM`
    if ((percentage <= rules[0]) && (speed >= rules[0]))
        return `according to statistics, you can go to the level ${level + 1}. 
        click Enter to finish the training, and then type ":level=${level + 1}"`
    return `weak statistics, train more
    <br>but you can still go to any level (Enter, and then :level=1..${rulesStrong.length})`
}
