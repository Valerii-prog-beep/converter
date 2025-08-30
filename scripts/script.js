const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertButton = document.getElementById('convertButton');
const resultElement = document.getElementById('result');

    async function getExchangeRate(from, to) {
      const url = `https://open.er-api.com/v6/latest/${from}`;
      // ...
    
    
    
    try{
      const response = await fetch(url);
      const data = await response.json();
      
      if(data.result==="success"){
        const rate = data.rates[to];
        if(rate===undefined){
          throw new Error(`Валюта ${to} не найдена`);
        }
        return rate;
      } else {
        throw new Error(data.error||
        'Ошибка получения курса');
      }
      
    }catch(error){
       console.error('Ошибка при запросе к API:',error);
      throw new Error('Не удалось получить курс валют');
    }
}

async function convertCurrency(){
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const inputValue=parseFloat(amount.value);
  
  if(isNaN(inputValue)){
    resultElement.textContent='Пожалуйста введите конкретную сумму';
    return;
  }
  try{
    const rate=await getExchangeRate(from,to);
    const result=inputValue*rate;
    resultElement.textContent=`${inputValue}${from}=${result.toFixed(2)}${to}`;
    
  }catch(error){
    resultElement.textContent=`Ошибка:${error.message}`
  }
}
convertButton.addEventListener('click',convertCurrency);

amount.addEventListener('keyup',
function(event){
  if(event.key==='Enter'){
    convertButton.click();
  };
})


