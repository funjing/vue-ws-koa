const Koa = require('koa')
const WebSocket = require('ws')
const cors = require('koa2-cors')

const controller = require('./controller')

const bodyParser = require('koa-bodyparser')

const app = new Koa()

//引入Server类
const WebSocketServer = WebSocket.Server

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: 'true'
}))

app.use(bodyParser())

app.use(controller())



//接受koa app的listen()返回的http.server
const server = app.listen(8080)

const wss = new WebSocketServer({
  server: server
})

wss.on('open', handleOpen)
wss.on('close', handleClose)
wss.on('error', handleError)
wss.on('connection', handleConnection)

function handleOpen() {
  console.log('be websocket open');
}

function handleClose() {
  console.log('be websocket close');
}

function handleError() {
  console.log('be websocket error');
}

function handleConnection(ws) {
  console.log('be websocket connection');
  ws.on('message', handleMessage)
}

function handleMessage(msg) {
  wss.clients.forEach((c) => {
    c.send(msg)
  })
}

console.log('app started at port 8080...')
