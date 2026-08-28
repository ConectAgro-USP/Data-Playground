async function buscarCep(cep) {
  cep = cep.replace(/\D/g, '');
  const res = await fetch('https://brasilapi.com.br/api/cep/v2/' + cep);
  const data = await res.json();
  if (data.name === 'CepPromiseError') throw new Error('CEP não encontrado: ' + cep);
  return data;
}

function coordenadasCep(cepData) {
  const coords = cepData.location?.coordinates;
  if (!coords || !coords.latitude || !coords.longitude) {
    throw new Error('CEP sem coordenadas disponíveis: ' + cepData.cep);
  }
  return coords;
}
