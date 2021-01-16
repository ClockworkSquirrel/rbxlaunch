const got = require("got")

async function resolveUniverseId(universeId) {
    if (typeof universeId !== "number") {
        throw new Error(`Invalid or undefined universeId number provided <${universeId}>`)
    }

    const { body } = await got(`https://games.roblox.com/v1/games?universeIds=${universeId}`, {
        responseType: "json",
    })

    return body.data[0].rootPlaceId
}

module.exports = resolveUniverseId
