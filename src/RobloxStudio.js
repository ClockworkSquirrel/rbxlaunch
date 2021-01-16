const path = require("path")
const fs = require("fs")

class RobloxStudio {
    constructor() {
        this.platform = process.platform

        if (this.platform === "win32") {
            this.registry = require("rage-edit").Registry
        }
    }

    async __locateWindows() {
        const contentFolder = await this.registry.get("HKCU\\Software\\Roblox\\RobloxStudio", "ContentFolder")
        const { dir: versionPath } = path.parse(contentFolder)

        // let launcherPath = path.join(versionPath, "..", "RobloxStudioLauncherBeta.exe")

        // if (!fs.existsSync(launcherPath)) {
            let launcherPath = path.join(versionPath, "RobloxStudioLauncherBeta.exe")
        // }

        return {
            launcher: launcherPath,
            application: path.join(versionPath, "RobloxStudioBeta.exe"),
            content: contentFolder,
        }
    }

    locate() {
        if (this.platform === "win32") {
            return this.__locateWindows()
        } else {
            return Promise.reject("Platform not supported")
        }
    }
}

const studioAPI = new RobloxStudio()
module.exports = studioAPI
