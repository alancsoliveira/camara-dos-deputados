const { Router } = require('express');
const routes = Router();

const api = require('./helpers/api')


routes.get('/', async (request, response) => {
  const { search } = request.query;
  const { data } = await api.get('/deputados', {
    params: {
      ordem: 'ASC',
      ordenarPor: 'nome',
      nome: search
    }
  });
  return response.render("index", { deputados: data.dados })
});

routes.get('/info/:id', async (request, response) => {
  const { id } = request.params;
  const { data: { dados: { ultimoStatus } } } = await api.get(`/deputados/${id}`)
  return response.render('info.ejs', { deputado: ultimoStatus })
})

module.exports = routes;