const DeviceManager = require('./devicemanager')
const WServer = require('./wserver')
const mockup = require('./mockupdevice')
const GameController = require('./gameController')

const server = new WServer()
const gameController = new GameController(server)

// mockup(gameController)
DeviceManager(gameController)

server.listen(1337)