const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const send = require('send')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//  MySQl
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'resa_room'
})

// get all apartment
app.get('/apartment', (req, res) => {
    pool.getConnection((err, connection) => {
      if(err) throw err
      console.log(`connected as id ${connection.threadId}`)

      // query(sqlstring, callback)
      connection.query('SELECT * from apartment', (err, rows) => {
        connection.release() // return the connection pool

        if(!err) {
          res.send(rows)
        }else{
          console.log(err)
        }
      })
    })
})

// get all room
app.get('/room', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    // query(sqlstring, callback)
    connection.query('SELECT * from room', (err, rows) => {
      connection.release() // return the connection pool

      if(!err) {
        res.send(rows)
      }else{
        console.log(err)
      }
    })
  })
})

// get specific apartment by ID
app.get('/apartment/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    // query(sqlstring, callback)
    connection.query('SELECT * from apartment WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection pool

      if(!err) {
        res.send(rows)
      }else{
        console.log(err)
      }
    })
  })
})

// get specific room by ID
app.get('/apartment/:id_room', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    // query(sqlstring, callback)
    connection.query('SELECT * from room WHERE id_room = ?', [req.params.id_room], (err, rows) => {
      connection.release() // return the connection pool

      if(!err) {
        res.send(rows)
      }else{
        console.log(err)
      }
    })
  })
})

// delete a record / client
app.delete('/client/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    // query(sqlstring, callback)
    connection.query('DELETE from client WHERE id_client = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection pool

      if(!err) {
        res.send(`Client with the record ID: ${[req.params.id]} has been removed.`)
      }else{
        console.log(err)
      }
    })
  })
})

// update a record / client
app.put('/client/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const {id_client, firstName, lastName, email, phone, birthDate, nationality} = req.body

    // query(sqlstring, callback)
    connection.query('UPDATE client SET firstName = ?, lastName = ?, email = ?, phone = ?, birthDate = ?, nationality = ? WHERE id_client = ?', [firstName, lastName, email, phone, birthDate, nationality, req.params.id], (err, rows) => {
      connection.release() // return the connection pool

      if(!err) {
        res.send(`Client with the record ID: ${[req.params.id]} has been removed.`)
      }else{
        console.log(err)
      }
    })
  })
})

// Add a record / client
app.post('/client', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const {id_client, firstName, lastName, email, phone, birthDate, nationality} = req.body

    connection.query('INSERT INTO client SET ?', [, firstName, lastName, email, phone, birthDate, nationality], (err, rows) => {
      //connection.release() // return the connection pool

      if(!err) {
        console.log('record has been added')
        res.send(`Client with id: ${[id_client]} has been added.`)
      }else{
        console.log(err)
      }
    })
  })
})

// Post a record / reservation
/*app.post('/reservation/:email/:id_room/:motif', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    
    connection.query('SELECT email from client', (err, rows) => {
      connection.release() // return the connection pool

      if(!err) {
        if(rows.length != 0){
          let count = 0
          let id_user = ''
          for(var i=0; i<rows.length; i++){
            if(rows[i].email == req.params.email){
              count = count + 1
            }
          }

          if(count > 1){
            res.send('Veuillez utiliser une autre adresse mail.')
          }

          if(count == 1){

            connection.query('SELECT id from apartment WHERE email = ?', [req.params.email], (err, rows) => {
              connection.release() // return the connection pool
        
              if(!err) {
                res.send(rows)
                id_user = rows[0].id
              }else{
                console.log(err)
              }
            })

            connection.query('INSERT INTO (motif, id_client, id_room) reservation VALUES (?, ?, ?)', [req.params.motif, id_user, req.params.id_room], (err, rows) => {
              connection.release() // return the connection pool
        
              if(!err) {
                res.send(`Reservation with motif: ${[req.params.motif]} has been added.`)
              }else{
                console.log(err)
              }
            })
          }

          if(count == 0){
            res.send('Veuillez créer un compte utilisateur pour réserver.')
          }
        }
        res.send(rows)
      }else{
        console.log(err)
      }
    })
  })
})*/

// Post a record / reservation
app.post('/reservation/:email/:id_room/:motif', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    connection.query('SELECT * from client WHERE email = ?', [req.params.email], (err, rows) => {
      connection.release() // return the connection pool

      // client have to complete all these informations to reserve
      if(!err && rows[0].id_client && rows[0].firstName && rows[0].lastName && rows[0].phone && rows[0].birthDate && rows[0].nationality) {
        //res.send(rows)
        console.log(rows[0].id_client)

        connection.query('SELECT * from reservation', (err, line) => {
          //connection.release() // return the connection pool
          let count = 0

          if(!err) {
            console.log('room available ?')
            for(let i=0; i<line.length; i++){
              if(line[i].id_room == req.params.id_room){
                count = count + 1
              }
            }

            if(count == 0){
              var data = {
                "resa": {
                  "motif": req.params.motif,
                  "id_client": rows[0].id_client,
                  "id_room": req.params.id_room
                }
              }
              res.send(data)
      
              connection.query('INSERT INTO reservation SET ?', data.resa, (err, row) => {
                //connection.release() // return the connection pool
          
                if(!err) {
                  console.log('record has been added')
                  //res.send(`Reservation with motif: ${[data.motif]} has been added.`)
                }else{
                  console.log(err)
                }
              })
            }else{
              console.log("Chambre non disponible - veuillez choisir une autre chambre")
            }
            //res.send(`Reservation with motif: ${[data.motif]} has been added.`)
          }else{
            console.log(err)
          }
        })

      }else{
        console.log('Veuillez remplir toutes les informations vous concernant avant reservation - Merci')
      }
    })

  })
})

// update a record / reservation
app.delete('/reservation/:id_room', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    // query(sqlstring, callback)
    connection.query('DELETE from reservation WHERE id_room = ?', [req.params.id_room], (err, rows) => {
      connection.release() // return the connection pool

      if(!err) {
        res.send(`Client with the record ID: ${[req.params.id_room]} has been removed.`)
      }else{
        console.log(err)
      }
    })
  })
})

// listen on environment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))
