let state = {
    level: localStorage.level || 1,
    visual: "initial",
    settings: {},
	alphabet: ['hjkleotrsnapci.[{]}\\()_+=-"/1234567890', "dgub!@#$%&<>?'", 'mfvyqwxz`^|~*,'],
    commands: cmdVIM,
    errors: {
        "typing": "incorrect typing",
        "render": "something went wrong :("
    }
}
