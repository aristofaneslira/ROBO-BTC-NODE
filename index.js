require('dotenv-safe').config();
const { MercadoBitcoin, MercadoBitcoinTrade } = require('./api');

const infoApi = new MercadoBitcoin({ currency: 'BTC' });
const tradeAPi = new MercadoBitcoinTrade({
    currency: 'BTC',
    key: process.env.KEY,
    secret: process.env.SECRET,
    pin: process.env.PIN
});

async function getQuantity(coin, price, isBuy) {
    coin = isBuy ? 'brl' : coin.toLowerCase();

    const data = await tradeAPi.getAccountInfo();
    const balance = parseFloat(data.balance[coin].available).toFixed(8);
    if(!isBuy) return balance;

    if(balance < 5) return false; //saldo minimo disponivel para compra

    console.log(`Saldo disponível de ${coin}: ${balance}`);

    price = parseFloat(price);
    let qty = parseFloat((balance/price).toFixed(8));
    return qty - 0.00000001;

}

setInterval(async () => {
    const response = await infoApi.ticker();
    console.log(response);
    if(response.ticker.sell > 135000) //mexer nessa logica teste do preço
        return console.log('ta caro, aguardar');
    try {
        const qty = await getQuantity('BRL', response.ticker.sell, true);
        if(!qty) return console.error('saldo insuficiente para comprar!'); 
        const data = await tradeAPi.placeBuyOrder(qty * 0.3, response.ticker.sell); //mexer nessa logica de compra, ta comprando 50% do saldo
        console.log(`ordem inserida no livro`, data);

        const buyPrice = parseFloat(response.ticker.sell);
        const profitability = parseFloat(process.env.PROFITABILITY);//1.1 lucratividade de 10% mexer nisso
        const sellQty = await getQuantity('BTC', 1, false);
        const data2 = await tradeAPi.placeSellOrder(sellQty, buyPrice * profitability); //mexer na logica de venda, ta vendendo a mesma quantidade que foi comprada
        console.log(`ordem inserida no livro`, data2);
    } catch (error) {
        console.log(error);
    }
    

}, process.env.CRAWLER_INTERVAL);