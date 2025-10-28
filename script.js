document.getElementById("converter").addEventListener("click", async () => {
  const valor = parseFloat(document.getElementById("valor").value)
  const de = document.getElementById("de").value
  const para = document.getElementById("para").value
  const resultado = document.getElementById("resultado")

  if (!valor || valor <= 0) {
    resultado.textContent = "⚠️ Insira um valor válido!"
    return;
  }

  if (de === para) {
    resultado.textContent = "⚠️ Escolha moedas diferentes!"
    return;
  }

  resultado.textContent = "🔄 Convertendo..."

  try {
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${valor}&from=${de}&to=${para}`)
    const data = await res.json()
    const taxa = data.rates[para]

    resultado.textContent = `${formatCurrency(de, valor)} = ${formatCurrency(para, taxa)}`

  } catch (erro) {
    resultado.textContent = "❌ Erro ao converter. Tente novamente."
  }
})

const idiomasPorMoeda = {
    BRL: 'pt-BR',
    USD: 'en-US',
    EUR: 'de-DE'
}

function formatCurrency(moeda, valor) {
    const idioma = idiomasPorMoeda[moeda] || navigator.language
    return Intl.NumberFormat(idioma, {style: 'currency', currency: moeda}).format(valor)
}