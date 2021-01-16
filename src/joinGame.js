const resolveUniverseId = require("./resolveUniverseId")
const fetchAuthTicket = require("./fetchAuthTicket")
const buildLaunchUrl = require("./buildLaunchUrl")

const { URL, URLSearchParams} = require("url")
const open = require("open")

const defaultOptions = {
    placeId: null,
    instanceId: null,
    userId: null,
    cookie: null,
    isPrivate: false,
    universeId: null,
}

async function joinGame(options = defaultOptions) {
    let { cookie, userId, placeId, isPrivate, instanceId, universeId } = Object.assign(defaultOptions, options)
    const authTicket = await fetchAuthTicket(cookie)

    if (universeId && !placeId) {
        placeId = await resolveUniverseId(universeId)
    }

    const placeLauncherURL = new URL("https://assetgame.roblox.com/game/PlaceLauncher.ashx")
    const placeLauncherURLSearch = new URLSearchParams()

    if (isPrivate) {
        placeLauncherURLSearch.set("request", "RequestPrivateGame")
        placeLauncherURLSearch.set("accessCode", instanceId)
        placeLauncherURLSearch.set("placeId", placeId)
    } else if (userId) {
        placeLauncherURLSearch.set("request", "RequestFollowUser")
        placeLauncherURLSearch.set("userId", userId)
    } else {
        placeLauncherURLSearch.set("request", "RequestGame")
        placeLauncherURLSearch.set("placeId", placeId)

        if (instanceId) {
            placeLauncherURLSearch.set("gameId", instanceId)
        }
    }

    placeLauncherURL.search = placeLauncherURLSearch.toString()

    const launchUrl = buildLaunchUrl("roblox-player", {
        launchmode: "play",
        gameinfo: authTicket,
        placelauncherurl: encodeURIComponent(placeLauncherURL.href),
    })

    return open(launchUrl)
}

module.exports = joinGame
