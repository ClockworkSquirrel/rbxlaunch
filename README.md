# rbxlaunch
> Directly launch Roblox games and Studio sessions from within Node.js applications.

[![npm](https://img.shields.io/npm/v/rbxlaunch?color=00a2ff)](https://www.npmjs.com/package/rbxlaunch)
[![npm](https://img.shields.io/npm/dt/rbxlaunch)](https://www.npmjs.com/package/rbxlaunch)
[![dependent repos (via libraries.io)](https://img.shields.io/librariesio/dependent-repos/npm/rbxlaunch)](https://libraries.io/npm/rbxlaunch)
[![install size](https://packagephobia.com/badge?p=rbxlaunch)](https://packagephobia.com/result?p=rbxlaunch)

# Prerequisites
* [Node.js](https://nodejs.org/en/)
* A package manager ([npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), etc.)
* Windows\*

\* Currently `rbxlaunch` is only supported on Windows devices, due to the [`rbxapp`](https://github.com/ClockworkSquirrel/rbxapp) library's limitations.

# Install
```
$ npm i rbxlaunch
```

# Usage
### Launching Studio
```js
const rbxlaunch = require("rbxlaunch")

(async () => {
    try {
        await rbxlaunch.studio()
        console.info("Roblox Studio launched successfully!")
    } catch (error) {
        console.error(error)
    }
})()
```

### Launching a Game
A cookie is required to launch games, due to Roblox requiring an authentication ticket to be generated before allowing a player to join the game.

```js
const rbxlaunch = require("rbxlaunch")

(async () => {
    try {
        await rbxlaunch.game({
            placeId: 4901843753, // place ID for rotopia
            cookie: "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in", // to authenticate the request
        })

        console.info("rotopia launched successfully!")
    } catch (error) {
        console.error(error)
    }
})()
```

# API
## game(options)
Returns a Promise, which resolves with a [ChildProcess](https://nodejs.org/api/child_process.html#child_process_class_childprocess) object. Games are launched using the default `roblox-player:` protocol, as the Roblox website does.

#### options
Type: `object`

| key | type | required | default | description |
|-----|------|----------|---------|-------------|
| cookie | `string` | Yes | `null` | The cookie used to authenticate the user |
| placeId | `number` | * | `null` | The ID of the place to join |
| instanceId | `number` | * | `null` | The game instance ID to join |
| isPrivate | `boolean` | No | `false` | Determines whether instance ID leads to a public or private server
| userId | `number` | No | `null` | Used to join another user in-game |
| universeId | `number` | No | `null` | If provided, will be resolved to the root place ID of the universe |

<br/>

* \* `placeId` is required when not following another user in-game.
* \* `instanceId` is required when `isPrivate` is set to `true`

## studio(options?)
Returns a Promise, which resolves with a [ChildProcess](https://nodejs.org/api/child_process.html#child_process_class_childprocess) object. Games are launched using the RobloxStudioLauncherBeta application, rather than via a protocol. This is to allow local files to be opened.

#### options
Type: `object`

| key | type | required | default | description |
|-----|------|----------|---------|-------------|
| placeId | `number` | No | `null` | The ID of the place to open in Studio |
| file | `string` | No | `null` | The path to the `.rbxl` or `.rbxlx` file to open in Studio |

# Caveats
* Launching Roblox Studio is currently only supported on Windows.
