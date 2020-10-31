const router = require("express").Router();
const mysql = require("mysql");
const config = require("../config");

const db = mysql.createPool(config.mysql);

router.post("/", async (req, res) => {
    try {
        const {
            player_id,
            league_id,
            matches_played,
            runs_scored,
            hundreds,
            fifties,
            high_score,
            not_outs,
            strike_rate,
            overs,
            wickets,
            economy,
            best_bowling,
            catches,
            run_outs,
            ducks,
            outs,
        } = req.body;

        var query = `INSERT INTO Player_Stats VALUES (${player_id}, ${league_id}, ${matches_played}, ${runs_scored}, \
            ${hundreds}, ${fifties}, ${high_score}, ${not_outs}, ${strike_rate}, ${overs}, ${wickets}, ${economy},
            "${best_bowling}", ${catches}, ${run_outs}, ${ducks}, ${outs}
            );`;

        await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send("Player Stats Added");
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const player_id = req.query.player_id;
        const league_id = req.query.league_id
        var main = await new Promise((resolve, reject) => {
            var query = `SELECT * FROM Player_Stats WHERE player_id = ${player_id} and league_id = ${league_id}`;
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send(main);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get("/:player_id", async (req, res) => {
    
    try {
        const player_id = req.params.player_id;
        var main = await new Promise((resolve, reject) => {
            var query = `select player_id, sum(Player_Stats.matches_played) as matches_played, sum(Player_Stats.runs_scored) as runs_scored, sum(Player_Stats.hundreds) as hundreds, sum(Player_Stats.fifties) as fifties, max(Player_Stats.high_score) as high_score, sum(Player_Stats.not_outs) as not_outs, avg(Player_Stats.strike_rate) as strike_rate, sum(Player_Stats.overs) as overs, sum(Player_Stats.wickets) as wickets, avg(Player_Stats.economy) as economy, sum(Player_Stats.catches) as catches, sum(Player_Stats.run_outs) as run_outs, sum(Player_Stats.ducks) as ducks, sum(Player_Stats.outs) as outs from Player_Stats where player_id = ${player_id} group by player_id`
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send(main);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
