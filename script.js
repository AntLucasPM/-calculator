let display = document.getElementById("display");
let listaHistorico = document.getElementById("lista-historico");
let historico = [];

function inserir(valor) {
  display.value += valor;
}

function calcular() {
  try {
    let expressao = display.value;
    let resultado = eval(expressao);

    // Evita salvar se estiver vazio
    if (expressao.trim() === "") return;

    // Mostra o resultado
    display.value = resultado;

    // Salva no histórico
    salvarHistorico(expressao, resultado);
  } catch (e) {
    display.value = "Erro";
  }
}

function limpar() {
  display.value = "";
}

// --- HISTÓRICO ---
function salvarHistorico(expressao, resultado) {
  const item = `${expressao} = ${resultado}`;
  historico.unshift(item); // adiciona no início do array

  // Limita a 10 últimos cálculos
  if (historico.length > 4) {
    historico.pop();
  }

  atualizarHistorico();
}

function atualizarHistorico() {
  listaHistorico.innerHTML = "";
  historico.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    listaHistorico.appendChild(li);
  });
}

// --- SUPORTE AO TECLADO ---
document.addEventListener("keydown", function (event) {
  const tecla = event.key;

  // Se for um número ou ponto
  if (!isNaN(tecla) || tecla === ".") {
    inserir(tecla);
  }

  // Operadores básicos
  if (["+", "-", "*", "/"].includes(tecla)) {
    inserir(tecla);
  }

  // Enter = calcular
  if (tecla === "Enter" || tecla === "=") {
    event.preventDefault();
    calcular();
  }

  // Backspace = apaga último caractere
  if (tecla === "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  // Escape = limpar tudo
  if (tecla === "Escape") {
    limpar();
  }
});
