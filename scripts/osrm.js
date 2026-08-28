async function calcularRota(origemLonLat, destinoLonLat) {
  const url = 'https://router.project-osrm.org/route/v1/driving/' + origemLonLat + ';' + destinoLonLat + '?overview=false';
  const res = await fetch(url);
  const data = await res.json();
  if (data.code !== 'Ok') throw new Error('OSRM: ' + data.code);
  return data;
}
