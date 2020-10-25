const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.get("/", async (req, res) => {
    try {
        var main = await new Promise((resolve, reject) => {
            var query = "SELECT * FROM Team_Rankings";
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send(main);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/:league_id", async (req, res) => {
    try {
        var league_id = req.params.league_id;
        var main = await new Promise((resolve, reject) => {
            var query = `SELECT * from Team_Rankings WHERE league_id = ${league_id} ORDER BY ranks ASC`;
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        console.log(main);
        res.status(200).send(main);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/", async (req, res) => {
    try {
        //     team_id INT,
        // league_id INT,
        // ranks INT,
        // points INT,
        var { team_id, league_id, ranks, points } = req.body;
        var main = await new Promise((resolve, reject) => {
            var query = `INSERT INTO Team_Rankings VALUES (${team_id}, ${league_id}, ${ranks}, ${points})`;
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        res.status(200).send(main);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
