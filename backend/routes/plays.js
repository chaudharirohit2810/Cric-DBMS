const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.post("/", async (req, res) => {
    try {
        var { player_id, team_id, league_id } = req.body;
        var main = await new Promise((resolve, reject) => {
            var query = `INSERT INTO Plays VALUES (${team_id}, ${player_id}, ${league_id})`;
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

router.get("/", async (req, res) => {
    try {
        var {league_id, team_id} = req.query
        var main = await new Promise((resolve, reject) => {
            const query = `select Players.first_name as first_name, Players.last_name as last_name, Players.age as age, Players.player_role as player_role, Players.image_link as image_link, Plays.team_id as team_id, Plays.player_id as player_id, Plays.league_id as league_id from Plays join Players on Players.player_id = Plays.player_id where Plays.league_id = ${league_id} and Plays.team_id = ${team_id};`;
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
