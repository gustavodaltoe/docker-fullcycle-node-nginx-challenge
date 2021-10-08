const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Gustavo')`
connection.query(sql)

app.get('/', (req,res) => {
  const connection = mysql.createConnection(config)
  const query = 'SELECT name FROM people'
  connection.query(query, (err, results) => {
    if (err) throw err;

    const names = results.map(({ name }) => '- ' + name).join('<br>')

    res.send(`<h1>Full Cycle</h1><br><br>${names}`)
  })

  connection.end()
})

app.listen(port, ()=> {
  console.log(`App is running on port ${port}`)
})