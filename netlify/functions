const { getStore } = require('@netlify/blobs');

const KEY = 'entries';
const DIAS_LIMITE = 15;

function prune(lista) {
  const limite = Date.now() - DIAS_LIMITE * 24 * 60 * 60 * 1000;
  return (lista || []).filter(e => e && e.timestamp >= limite);
}

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  try {
    const store = getStore('despacho-historico');

    if (event.httpMethod === 'GET') {
      const atual = await store.get(KEY, { type: 'json' });
      const filtrado = prune(atual);
      return { statusCode: 200, headers, body: JSON.stringify(filtrado) };
    }

    if (event.httpMethod === 'POST') {
      const entry = JSON.parse(event.body || '{}');
      const atual = await store.get(KEY, { type: 'json' });
      const nova = prune(atual);
      nova.unshift(entry);
      await store.setJSON(KEY, nova);
      return { statusCode: 200, headers, body: JSON.stringify(nova) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Método não permitido' }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: String(err && err.message || err) }) };
  }
};
