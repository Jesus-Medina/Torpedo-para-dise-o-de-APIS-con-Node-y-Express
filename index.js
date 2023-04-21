const { traerDatosMedicamentos, traerDatosPersonal, traerDatosMedicamentosPorFiltro, traerDatosPersonalPorFiltro } = require('./consultas')

const express = require('express')
const app = express()
const cors = require("cors")
port = 3000

app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`Server listen on port http://localhost:${port}`)
})

app.get('/medicamentos', async (req, res) => {
  const query = req.query
  const datos = await traerDatosMedicamentos(query)
  res.json(datos)
})

app.get("/medicamentos/filtros", async(req, res) => {
  const query = req.query
  const datos = await traerDatosMedicamentosPorFiltro(query)
  res.json(datos)
})

app.get('/personal', async (req, res) => {
  const query = req.query
  const datos = await traerDatosPersonal(query)
  res.json(datos)
})

app.get('/personal/filtros', async (req, res) => {
  const query = req.query
  const datos = await traerDatosPersonalPorFiltro(query)
  res.json(datos)
})

