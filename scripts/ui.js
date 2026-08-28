function show(id, data) {
  document.getElementById(id).textContent = JSON.stringify(data, null, 2);
}

function showText(id, text) {
  document.getElementById(id).textContent = text;
}

function showError(id, err) {
  document.getElementById(id).textContent = 'Erro: ' + (err && err.message ? err.message : err);
}
