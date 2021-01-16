const { RobloxStudio } = require("rbxapp")

const { spawn } = require("child_process")
const path = require("path")

const robloxStudio = new RobloxStudio()

const defaultOptions = {
    placeId: null,
    file: null,
}

async function openStudio(options = defaultOptions) {
    const config = Object.assign(defaultOptions, options)
    const launcherArgs = []

    if (config.placeId) {
        if (typeof config.placeId === "number") {
            launcherArgs.push("-task EditPlace")
            launcherArgs.push(`-placeId ${config.placeId}`)
        } else {
            throw new Error(`Invalid or undefined place ID number was provided <${config.placeId}>`)
        }
    }

    if (config.file) {
        if (typeof config.file === "string") {
            launcherArgs.push(`-ide "${config.file}"`)
        } else {
            throw new Error(`Invalid or undefined file string was provided <${config.file}>`)
        }
    }

    const studio = await robloxStudio.locate(true)
    const childProcess = spawn(studio.launcher, launcherArgs, {
        windowsVerbatimArguments: true,
        detached: true,
        stdio: ["ignore", "ignore", "ignore"],
        cwd: path.parse(studio.launcher).dir,
    })

    return childProcess
}

module.exports = openStudio
