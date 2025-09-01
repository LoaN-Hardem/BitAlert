const { getBitcoinPrice } = require('./price-checker');
const { sendSMS } = require('./notifier');

// Definir os valores das variáveis de ambiente
const TARGET_BUY_PRICE = parseFloat(process.env.TARGET_BUY_PRICE);
const TARGET_SELL_PRICE = parseFloat(process.env.TARGET_SELL_PRICE);

// Definir a margem de alerta em porcentagem (5%)
const ALERT_PERCENTAGE = 0.05;

exports.handler = async (event) => {
  console.log('Invocação da função Lambda iniciada.');

  const currentPrice = await getBitcoinPrice();
  if (currentPrice === null) {
    console.log('Não foi possível obter o preço do Bitcoin. Encerrando a execução.');
    return;
  }

  // Calcular os limites com base na porcentagem
  const buyAlertRangeMin = TARGET_BUY_PRICE * (1 - ALERT_PERCENTAGE);
  const buyAlertRangeMax = TARGET_BUY_PRICE * (1 + ALERT_PERCENTAGE);

  const sellAlertRangeMin = TARGET_SELL_PRICE * (1 - ALERT_PERCENTAGE);
  const sellAlertRangeMax = TARGET_SELL_PRICE * (1 + ALERT_PERCENTAGE);

  let message = '';

  // Lógica de alerta e notificação com base nas margens de porcentagem
  if (currentPrice >= buyAlertRangeMin && currentPrice <= buyAlertRangeMax) {
    message = `AVISO: O preço do Bitcoin está se aproximando do alvo de compra de US$ ${TARGET_BUY_PRICE} (margem de 5%). Preço atual: US$ ${currentPrice}`;
    await sendSMS(message);
  } else if (currentPrice >= sellAlertRangeMin && currentPrice <= sellAlertRangeMax) {
    message = `AVISO: O preço do Bitcoin está se aproximando do alvo de venda de US$ ${TARGET_SELL_PRICE} (margem de 5%). Preço atual: US$ ${currentPrice}`;
    await sendSMS(message);
  } else {
    console.log(`Preço atual do Bitcoin: US$ ${currentPrice}. Nenhum alerta necessário.`);
  }

  console.log('Execução da função Lambda finalizada.');
};