const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.post("/", (req, res) => {
    try {
        var {player_id, team_id} = req.body
        var main = await new Promise((resolve, reject) => {
            var query = `INSERT INTO Plays VALUES (${player_id}, ${team_id})`
            db.query(query, (err, result) => {
                if(err) {
                    reject(err)
                }
                resolve(result)
            })
        })
        res.status(200).send(main)
    } catch (err) {
        res.status(400).send(err.message);
    }
});
