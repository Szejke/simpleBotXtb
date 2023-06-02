const _ = require('lodash');


function calculateRSI(data, period) {
    const gains = [];
    const losses = [];

    for (let i = 1; i < data.length; i++) {
      const diff = data[i] - data[i - 1];

      if (diff > 0) {
        gains.push(diff);
        losses.push(0);
      } else {
        gains.push(0);
        losses.push(Math.abs(diff));
      }
    }

    const avgGain = _.sum(_.slice(gains, -period)) / period;
    const avgLoss = _.sum(_.slice(losses, -period)) / period;

    const RS = avgGain / avgLoss;
    const RSI = 100 - (100 / (1 + RS));

    return RSI;
  }
module.exports = calculateRSI;