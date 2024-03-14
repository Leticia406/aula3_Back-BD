
import express from "express";
import { sqlConfig } from './server.js';
import sql from 'mssql'

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const routes = express.Router()

routes.get('/', async (req, res)=>{
    try{const { recordset } =  await pool.query`select * from Produtos`
    return res.status(200).json(recordset)
}
    catch(error){
        return res.status(501).json('ops...algo deu errado')
    }
    
})

routes.post('/produtos/novo', async (req,res)=>{
    try{ const{ descricao, preco} = req.body;
    const insert = await pool.query `insert into Produtos values(${descricao}, ${preco})`
    return res.status(201).json(`ok`)
}
    catch(error){
        return res.status(501).json('ops...algo deu errado')
}
})

// routes.put()

// routes.delete()

export default routes

//api <-> bd(sql)
// conection pool