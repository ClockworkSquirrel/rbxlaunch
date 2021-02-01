const got = require("got")

async function fetchXsrfToken(cookie) {
    if (typeof cookie !== "string") {
        throw new Error(`Invalid or undefined cookie string provided <${cookie}>`)
    }

    if (!cookie.startsWith(".ROBLOSECURITY=")) {
        cookie = `.ROBLOSECURITY=${cookie}`
    }

    const response = await got("https://auth.roblox.com/v2/logout/", {
        method: "POST",
        headers: {
            cookie,
        },
        throwHttpErrors: false,
    })

    const token = response.headers["x-csrf-token"]

    if (typeof token !== "string") {
        throw new Error(`Unable to generate XSRF token <${token}>`)
    }

    return token
}

module.exports = fetchXsrfToken
