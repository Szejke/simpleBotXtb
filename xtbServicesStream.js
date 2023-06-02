
const xtbServicesStream = {}

xtbServicesStream.getKeepAlive = (ws, streamSessionId)  => {
    const query = `{
        "command": "getKeepAlive",
        "streamSessionId": "${streamSessionId}"
    } `
        ws.send(query);
}


xtbServicesStream.getCandlesBtc = (ws, streamSessionId)  => {
    const query = `{
        "command": "getCandles",
        "streamSessionId": "${streamSessionId}",
        "symbol": "SOLANA"
    }
     `
        ws.send(query);
}

xtbServicesStream.ping = (ws, streamSessionId)  => {
    const query = `{
        "command": "ping",
        "streamSessionId": "${streamSessionId}"
    }`
        ws.send(query);
}


xtbServicesStream.getTickPrices = (ws, streamSessionId)  => {
    const query = `{
        "command": "getTickPrices",
        "streamSessionId": "${streamSessionId}",
        "symbol": "BITCOIN",
        "minArrivalTime": 5000,
        "maxLevel": 2
    }
 `
        ws.send(query);
}




module.exports = xtbServicesStream;