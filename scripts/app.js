async function rodarBrasilApi(e) {
  e.preventDefault();
  const cep = document.getElementById('cep').value;
  try {
    show('out-viacep', await buscarCep(cep));
  } catch (err) {
    showError('out-viacep', err);
  }
}

async function rodarOsrm(e) {
  e.preventDefault();
  const origem = document.getElementById('origem').value.trim();
  const destino = document.getElementById('destino').value.trim();
  try {
    show('out-osrm', await calcularRota(origem, destino));
  } catch (err) {
    showError('out-osrm', err);
  }
}

async function rodarFluxo(e) {
  e.preventDefault();
  const out = 'out-fluxo';
  const cepOrigem = document.getElementById('cep-origem').value;
  const cepDestino = document.getElementById('cep-destino').value;

  try {
    showText(out, 'Buscando CEPs (BrasilAPI)...');
    const origem = await buscarCep(cepOrigem);
    const destino = await buscarCep(cepDestino);
    const coordsOrigem = coordenadasCep(origem);
    const coordsDestino = coordenadasCep(destino);

    showText(out, 'Calculando rota (OSRM)...');
    const rota = await calcularRota(
      coordsOrigem.longitude + ',' + coordsOrigem.latitude,
      coordsDestino.longitude + ',' + coordsDestino.latitude
    );
    const trecho = rota.routes[0];

    show(out, {
      origem: { cep: cepOrigem, endereco: origem.street, cidade: origem.city, lat: coordsOrigem.latitude, lon: coordsOrigem.longitude },
      destino: { cep: cepDestino, endereco: destino.street, cidade: destino.city, lat: coordsDestino.latitude, lon: coordsDestino.longitude },
      distancia_km: (trecho.distance / 1000).toFixed(2),
      duracao_min: (trecho.duration / 60).toFixed(1)
    });
  } catch (err) {
    showError(out, err);
  }
}

document.getElementById('form-viacep').addEventListener('submit', rodarBrasilApi);
document.getElementById('form-osrm').addEventListener('submit', rodarOsrm);
document.getElementById('form-fluxo').addEventListener('submit', rodarFluxo);
