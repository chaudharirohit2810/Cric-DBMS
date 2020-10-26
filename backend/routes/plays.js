const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.post("/", async (req, res) => {
    try {
        var { player_id, team_id } = req.body;
        var main = await new Promise((resolve, reject) => {
            var query = `INSERT INTO Plays VALUES (${team_id}, ${player_id})`;
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send("Entry added in plays table");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
