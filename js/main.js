

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
    dropList[i].addEventListener("change", e => {
      cargaBandera(e.target); // LLAMANDO cargaBandera PASANDO EL ELEMENTO TARGE COMO UN ARGUMENTO
    });

}

function cargaBandera(element){
    for (code in country_code){
      if(code == element.value){ // si el código de moneda de la lista de países es igual al valor de la opción
        let imgTag = element.parentElement.querySelector("img");
        // SELECCIONANDO UNA ETIQUETA IMAGEN DE UNA LISTA PARTICULAR DESPLEGABLE
        imgTag.src = `https://countryflagsapi.com/png/${country_code[code]}` 
        
      }
    }
}

window.addEventListener("load", () => {

getExchangeRate();
});

getButtton.addEventListener("click", e => {

  e.preventDefault(); // IMPIDIENDO QUE EL FORMULARIO SE ENVIE
  getExchangeRate();
  });



  const exchangeIcon = document.querySelector(".drop-list .icon");
  exchangeIcon.addEventListener("click", () => {
    
    let tempCode = fromCurrency.value; // código de moneda temporal de la lista desplegable DESDE:
    fromCurrency.value = toCurrency.value; // pasar el código de moneda A: al código de moneda DESDE:
    toCurrency.value = tempCode; // pasar el código de moneda temporal al código de moneda A:

    cargaBandera(fromCurrency); // llamando cargaBandera seleccionando el elemento fromCurrency de DESDE:
    cargaBandera(toCurrency); // llamando cargaBandera seleccionando el elemento toCurrency de A:
    getExchangeRate();
    
  });
  
  

function getExchangeRate(){
  const monto = document.querySelector(".monto input"),
  exchangeRateTxt = document.querySelector(".exchange-rate");
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


  }).catch(() =>{
    exchangeRateTxt.innerText = "Algo ha salido mal...";
  });
  // si el usuario esta offline u otra error ocurre cuando se esta leyendo los datos entonces la funcion catch se ejecutara

} 