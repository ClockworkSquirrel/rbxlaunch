function build(protocol = "roblox-player", arguments = {}) {
    let url = [`${protocol}:1`]

    arguments.launchtime = (new Date()).getTime()

    for (const [key, value] of Object.entries(arguments)) {
        if (!value) {
            continue
        }

        url.push(`${key}:${value}`)
    }

    return url.join("+")
}

module.exports = build
