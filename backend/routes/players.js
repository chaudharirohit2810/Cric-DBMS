const router = require('express').Router()
const mysql = require('mysql')
const config = require('../config')

const db = mysql.createPool(config.mysql)

// To get all the players
router.get('/', (req, res) => {
    const query = "SELECT * FROM Players"
    db.query(query, (err, result) => {
        if(err) {
            return res.status(400).send("Error getting players")
        }
        res.status(200).json(result)
    })
})

// Insert player
router.post('/', (req, res) => {
    const {first_name, last_name, age, career_start, player_role } = req.body
    var query = "INSERT INTO Players VALUES (?, ?, ?, ?, ?)"
    var values = ["Rohit", "Chaudhari", 20, new Date(), "All-Rounder"]
    var date = new Date().toISOString().split('T')[0]
    var query2 = `INSERT INTO Players (first_name, last_name, age, career_start, player_role) \
        VALUES ("${first_name}", "${last_name}", ${age}, "${career_start}", "${player_role}")`
    query = mysql.format(query)
    db.query(query2, (err, result) => {
        if(err) {
            console.log(err)
            return res.status(400).send("Error while adding player")
        }
        res.status(200).json("Player Added!")
    })
})

// Get players according to player_role
router.get('/role/:role', (req,res) => {
    const role = req.params.role
    var query = `SELECT * FROM Players WHERE player_role="${role}"`
    db.query(query, (err, result) => {
        if(err) {
            return res.status(400).send("Invalid request")
        }
        res.status(200).json(result)
    })
})

module.exports = router;