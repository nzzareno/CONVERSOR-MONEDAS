const dropList = document.querySelectorAll(".drop-list select");
let getButtton = document.querySelector("form button");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_code) {
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "ARS" ? "selected" : "";
    }

    let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    cargaBandera(e.target);
  });
}

function cargaBandera(element) {
  for (code in country_code) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");

      imgTag.src = `https://flagsapi.com/${country_code[code]}/shiny/32.png`;
    }
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getButtton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;

  cargaBandera(fromCurrency);
  cargaBandera(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const monto = document.querySelector(".monto input"),
    exchangeRateTxt = document.querySelector(".exchange-rate");
  let montoValor = monto.value;

  if (montoValor == "" || montoValor == "0") {
    monto.value = "1";
    montoValor = 1;
  }

  exchangeRateTxt.innerText = "OBTENIENDO TIPO DE CAMBIO...";

  let url = `https://v6.exchangerate-api.com/v6/7c665d44fcdf47dead0772d1/latest/${fromCurrency.value}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangerate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (montoValor * exchangerate).toFixed(2);

      exchangeRateTxt.innerText = `${montoValor} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateTxt.innerText = "Algo ha salido mal...";
    });
}
