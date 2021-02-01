require("dotenv").config()
const rbxlaunch = require("../")

rbxlaunch.game({
    placeId: 4901843753, // rotopia
    cookie: process.env.COOKIE,
}).then(childProcess => {
    console.info("Launched game successfully!")
})

// rbxlaunch.studio({
//     placeId: 4901843753, // rotopia
// })
