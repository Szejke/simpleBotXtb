const _ = require('lodash');

// Funkcja obliczająca Bollinger Bands
function bollingerBands(close, period, stdevFactor) {
  const calculateSMA = (startIndex, endIndex) => {
    const sum = _.sum(_.slice(close, startIndex, endIndex + 1));
    return sum / period;
  };

  const calculateStdev = (startIndex, endIndex, sma) => {
    const squaredDiff = _.map(_.slice(close, startIndex, endIndex + 1), price => (price - sma) ** 2);
    const sum = _.sum(squaredDiff);
    return Math.sqrt(sum / period);
  };

  const upper = [];
  const lower = [];

  close.forEach((price, i) => {
    if (i < period - 1) {
      // Nie obliczaj Bollinger Bands, jeśli nie mamy wystarczającej liczby danych
      upper.push(undefined);
      lower.push(undefined);
      return;
    }

    const sma = calculateSMA(i - period + 1, i);
    const stdev = calculateStdev(i - period + 1, i, sma);

    upper.push(sma + stdevFactor * stdev);
    lower.push(sma - stdevFactor * stdev);
  });

  return { upper, lower };
}

// Przykładowe dane
const close = [10, 11, 12, 13, 14, 15, 16, 17, 16, 15, 14, 13, 12, 11, 10];
const period = 5;
const stdevFactor = 2;

// Wywołanie funkcji obliczającej Bollinger Bands
const { upper, lower } = bollingerBands(close, period, stdevFactor);
