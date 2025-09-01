const axios = require('axios');

async function getBitcoinPrice() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    return response.data.bitcoin.usd;
  } catch (error) {
    console.error('Erro ao buscar o preço do Bitcoin:', error);
    return null;
  }
}

module.exports = {
  getBitcoinPrice,
};