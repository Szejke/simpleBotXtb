
require('dotenv').config();
const xtbServices = {}

xtbServices.login = ws => {
    const query = `{
        "command" : "login",
        "arguments" : {
            "userId" : "${process.env.XTB_USER_ID}",
            "password": "${process.env.XTB_PASSWORD}",
            "appId": "asdasd",
		    "appName": "asdasd"
        }
    }
        `
        ws.send(query);
}

xtbServices.getTrades = ws => {
    const query = `{
        "command": "getTrades",
        "arguments": {
            "openedOnly": true
        }
    }
        `
        ws.send(query);
}

tradeTransInfo = ( type, symbol, volume) => {
    return`{
        "cmd": ${type},
        "symbol": "${symbol}",
        "type": 0,
        "price": 1,
        "volume": ${volume}
    }`
}


xtbServices.tradeTransaction = (ws, type, symbol, volume) => {
    const query = `{
        "command": "tradeTransaction",
        "arguments": {
            "tradeTransInfo": ${tradeTransInfo(type, symbol, volume)}
        }
    }`
        ws.send(query);
}


xtbServices.getAllSymbols = ws => {
    const query = `{
        "command": "getAllSymbols"
    }`
        ws.send(query);
}


xtbServices.getSymbolBitcoin = ws => {
    const query = `{
        "command": "getSymbol",
        "arguments": {
            "symbol": "SOLANA"
        }
    }
    `
        ws.send(query);
}


xtbServices.ping = ws => {
    const query = `{
        "command": "ping"
    }`
        ws.send(query);
}

module.exports = xtbServices;
