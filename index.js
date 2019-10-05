const DeviceManager = require('./devicemanager')
const WServer = require('./wserver')
const GameController = require('./gameController')

const server = new WServer()
const gameController = new GameController(server)

DeviceManager(gameController)

server.listen(1337)