const { Pool } = require("pg");
const  format   = require("pg-format")

const clienteDB = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "farmacia",
    port: 5432,
    allowExitOnIdle: true
});

const traerDatosMedicamentos = async( { limits = 5, order_by = "id_ASC", page = 0 } ) => {
    const [campo, direccion] = order_by.split("_")
    const offset = page * limits
    const formatedquery = format("SELECT * FROM medicamentos ORDER BY %s %s LIMIT %s OFFSET %s", campo, direccion, limits, offset) 
    const { rows: medicamentos } = await clienteDB.query(formatedquery)
    return medicamentos
}

const traerDatosMedicamentosPorFiltro = async({ stock_min, precio_max }) => {
    let filtros = []
    if(stock_min)
        filtros.push(`stock >= ${stock_min}`)
    if(precio_max)
        filtros.push(`precio <= ${precio_max}`)
    
    let consulta = "SELECT * FROM medicamentos"
    if(filtros.length > 0){
        filtros = filtros.join(" AND ")
        consulta = consulta + ` WHERE ${filtros}`
    }

    const { rows: medicamentos } = await clienteDB.query(consulta)
    return medicamentos
}

const traerDatosPersonal = async( { limits = 5, order_by = "id_ASC", page = 0 } ) => {
    const [campo, direccion] = order_by.split("_")
    const offset = page * limits
    const formatedquery = format("SELECT * FROM personal ORDER BY %s %s LIMIT %s OFFSET %s", campo, direccion, limits, offset) 
    const { rows: personal } = await clienteDB.query(formatedquery)
    return personal
}

const traerDatosPersonalPorFiltro = async( { rol } ) => {
    let filtros = []
    if(rol)
        filtros.push(`rol = '${rol}'`) // no funciona si pones el ${rol} con comillas dobles deben ser simples

    let consulta = "SELECT * FROM personal"
    if(filtros.length > 0){
        filtros.join(" AND ")
        consulta = consulta + ` WHERE ${filtros}` // concatenar la frase " WHERE ${filtros}" al string de consulta
    }

    const { rows: personal } = await clienteDB.query(consulta)
    return personal
}




module.exports = { traerDatosMedicamentos, traerDatosPersonal, traerDatosMedicamentosPorFiltro, traerDatosPersonalPorFiltro }