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

function populate() {
  const sql = `INSERT INTO people(name) values('Gustavo')`
  connection.query(sql)
}

const peopleTableExistsQuery = `SELECT count(1) as tableExists FROM information_schema.TABLES WHERE (TABLE_SCHEMA = '${config.database}') AND (TABLE_NAME = 'people')`;
connection.query(peopleTableExistsQuery, (err, result) => {
  if (!result[0].tableExists) {
    connection.query(`CREATE TABLE people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      populate()
    })
    return
  }
  populate()
});


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