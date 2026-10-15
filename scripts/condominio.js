const NATUREZA_CONDOMINIO_EDILICIO = 3085;

const CNAE_CONDOMINIOS_PREDIAIS = 8112500;

const TERMOS_DE_USO_COMERCIAL = [
  'COMERCIAL', 'COMERCIAIS', 'EMPRESARIAL', 'EMPRESARIAIS', 'ESCRITORIO', 'ESCRITORIOS',
  'OFFICE', 'OFFICES', 'CORPORATE', 'BUSINESS', 'CENTER', 'SHOPPING', 'MALL', 'GALERIA',
  'MEDICO', 'MEDICOS', 'MEDICAL', 'LOGISTICO', 'LOGISTICOS', 'INDUSTRIAL', 'INDUSTRIAIS'
];

function nomeIndicaUsoComercial(nome) {
  const nomeSemAcentos = nome.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const palavras = nomeSemAcentos.toUpperCase().split(/[^A-Z0-9]+/);
  return TERMOS_DE_USO_COMERCIAL.some((termo) => palavras.includes(termo));
}

function decidirVeredito({ ativa, condominioEdilicio, atividadeDeCondominio, usoComercial }) {
  if (!ativa) return 'INATIVO';
  if (!condominioEdilicio || !atividadeDeCondominio) return 'NÃO É CONDOMÍNIO';
  if (usoComercial) return 'CONDOMÍNIO, PROVAVELMENTE COMERCIAL';
  return 'PROVAVELMENTE PRÉDIO RESIDENCIAL';
}

function descreverCriterio(atendido, criterio, valor) {
  return `${atendido ? 'OK' : 'NÃO'} - ${criterio}: ${valor}`;
}

function classificarCondominio(estabelecimento) {
  const situacao = estabelecimento.status.text;
  const nome = estabelecimento.company.name;
  const natureza = estabelecimento.company.nature;
  const atividadePrincipal = estabelecimento.mainActivity;

  const ativa = situacao.toUpperCase() === 'ATIVA';
  const condominioEdilicio = natureza.id === NATUREZA_CONDOMINIO_EDILICIO;
  const atividadeDeCondominio = atividadePrincipal.id === CNAE_CONDOMINIOS_PREDIAIS;
  const usoComercial = nomeIndicaUsoComercial(nome);

  return {
    veredito: decidirVeredito({ ativa, condominioEdilicio, atividadeDeCondominio, usoComercial }),
    motivos: [
      descreverCriterio(ativa, 'situação cadastral', situacao),
      descreverCriterio(condominioEdilicio, 'natureza jurídica de condomínio edilício', natureza.text),
      descreverCriterio(atividadeDeCondominio, 'atividade principal de condomínio predial', atividadePrincipal.text),
      descreverCriterio(!usoComercial, 'nome sem indício de uso comercial', nome)
    ]
  };
}
