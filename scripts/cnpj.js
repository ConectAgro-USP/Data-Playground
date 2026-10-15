const MENSAGENS_DE_ERRO_DA_CNPJA = {
  400: 'CNPJ inválido (dígito verificador não confere)',
  404: 'CNPJ não encontrado na Receita Federal',
  429: 'limite de 5 consultas por minuto atingido, tente novamente em instantes'
};

function limparCnpj(cnpj) {
  const caracteres = cnpj.toUpperCase().replace(/[^0-9A-Z]/g, '');
  if (!/^[0-9A-Z]{12}\d{2}$/.test(caracteres)) {
    throw new Error(`CNPJ deve ter 12 letras ou números seguidos de 2 dígitos: ${caracteres}`);
  }
  return caracteres;
}

function formatarCnpj(cnpj) {
  return cnpj.replace(/^(\w{2})(\w{3})(\w{3})(\w{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

async function buscarCnpj(cnpj) {
  const resposta = await fetch(`https://open.cnpja.com/office/${cnpj}`);
  if (!resposta.ok) {
    const motivo = MENSAGENS_DE_ERRO_DA_CNPJA[resposta.status] ?? `erro HTTP ${resposta.status}`;
    throw new Error(`CNPJá: ${motivo}`);
  }
  return resposta.json();
}
