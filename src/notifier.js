const twilio = require('twilio');

async function sendSMS(message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const myPhoneNumber = process.env.MY_PHONE_NUMBER;

  const client = new twilio(accountSid, authToken);

  try {
    await client.messages.create({
      to: myPhoneNumber,
      from: twilioPhoneNumber,
      body: message,
    });
    console.log('Mensagem SMS enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o SMS:', error);
  }
}

module.exports = {
  sendSMS,
};