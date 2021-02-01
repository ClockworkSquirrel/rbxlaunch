const fetchXsrfToken = require("./fetchXsrfToken")
const got = require("got")

async function fetchAuthTicket(cookie) {
    if (typeof cookie !== "string") {
        throw new Error(`Invalid or undefined cookie string provided <${cookie}>`)
    }

    if (!cookie.startsWith(".ROBLOSECURITY=")) {
        cookie = `.ROBLOSECURITY=${cookie}`
    }

    const xsrf = await fetchXsrfToken(cookie)
    const response = await got("https://auth.roblox.com/v1/authentication-ticket", {
        method: "POST",
        headers: {
            cookie,
            "referer": "https://www.roblox.com/",
            "x-csrf-token": xsrf,
        },
    })

    const ticket = response.headers["rbx-authentication-ticket"]

    if (typeof ticket !== "string") {
        throw new Error(`Unable to generate authentication ticket <${ticket}>`)
    }

    return ticket
}

module.exports = fetchAuthTicket
