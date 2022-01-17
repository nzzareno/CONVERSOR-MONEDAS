const dropList = document.querySelectorAll(".drop-list select");
let getButtton = document.querySelector("form button");
 fromCurrency = document.querySelector(".from select");
 toCurrency = document.querySelector(".to select");

for (let i = 0; i < dropList.length; i++) {

  for(currency_code in country_code){

    //SELECCIONANDO USD COMO MONEDA DESDE POR DEFECTO Y PARA CONVERTIR A MONEDA ARS POR DEFECTO

    let selected;
    if(i == 0){
      selected = currency_code == "USD" ? "selected" : "";

    }else if (i == 1){
      selected = currency_code == "ARS" ? "selected" : "";
    }

    let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }

}
window.addEventListener("load", () => {
 // IMPIDIENDO QUE EL FORMULARIO SE ENVIE
getExchangeRate();
});

getButtton.addEventListener("click", e => {

  e.preventDefault(); // IMPIDIENDO QUE EL FORMULARIO SE ENVIE
  getExchangeRate();
  });

function getExchangeRate(){
  const monto = document.querySelector(".monto input"),
  exchangeRateTxt = document.querySelector(".radio-cambio");
  let montoValor = monto.value;
  //SI EL USUARIO NO PONE NINGUN VALOR O SI PONE CERO ENTONCES SE PONDRA 1 COMO EL VALOR POR DEFECTO EN EL APARTADO DE EL INPUT
  if(montoValor == "" || montoValor == "0") {
    monto.value = "1";
    montoValor = 1;
  }

  exchangeRateTxt.innerText = "OBTENIENDO TIPO DE CAMBIO...";

  let url =  `https://v6.exchangerate-api.com/v6/7c665d44fcdf47dead0772d1/latest/${fromCurrency.value}`;
  //obteniendo la respuesta api y devolviéndola con el análisis en js obj y en otro método que recibe ese obj
  fetch(url).then(response => (response.json())).then(result => {
    let exchangerate = result.conversion_rates[toCurrency.value]
    let totalExchangeRate = (montoValor * exchangerate).toFixed(2);
    
    exchangeRateTxt.innerText = `${montoValor} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
  })
} 