const WebSocket = require("ws");
const xtbServicesStream = require("./xtbServicesStream");
const xtbServices = require("./xtbServices");
const calculateRSI = require("./rsi");
const _ = require('lodash');

const ws = new WebSocket("wss://ws.xtb.com/demo");
const wsStream = new WebSocket("wss://ws.xtb.com/demoStream");
const period = 2;
let messageData = {}
let messageDataStream = {}
let dataBtc = [];
let order = 0;

const decisionMake = (Rsi) => {
    if (Rsi < 30) {
        xtbServices.tradeTransaction(ws, 0, 'SOLANA', 2)
        console.log('Long');
      } else if (Rsi > 70) {
        xtbServices.tradeTransaction(ws, 1, 'SOLANA', 2)
        console.log('short');
      } else {
        console.log('Nie podejmuj decyzji');
      }
}

const openWsStream = () => {
    wsStream.onerror = function (error) {
        console.error('Error:', error);
      };

	wsStream.on("open", function open() {
		console.log("open stream");
	});

    wsStream.onmessage = function (message) {
        messageDataStream = JSON.parse(message.data);
		if (messageDataStream.command === "candle") {
			dataBtc.push(messageDataStream.data.close);
            const Rsi = calculateRSI(messageDataStream, period);
            if(order === 0){
                decisionMake(Rsi)
            }
		}
	};

	wsStream.onclose = function () {
        console.error
		console.log("disconnected wsStream");
        return;
	}
};


function main() {
	ws.onerror = function (error) {
        console.error('Error:', error);
      };

	ws.onopen = function () {
		console.log("connected");
		xtbServices.login(ws);
	}

	openWsStream();
    ws.onmessage = function (message) {
        messageData = JSON.parse(message.data);
		if (!_.isEmpty(messageData.streamSessionId)) {
			const { streamSessionId } = messageData;
			xtbServicesStream.getCandlesBtc(wsStream, streamSessionId);
            xtbServicesStream.getKeepAlive(wsStream, streamSessionId);
		}
        if(!_.isEmpty( _.get(messageData.returnData, 'order'))){
            order = messageData.returnData.order;
        }
	}

	ws.onclose = function () {
        console.error
		console.log("disconnected ws");
        return;
	}
		setInterval(() => {
            xtbServices.ping(ws);
		}, 10000);
}

main();
