const router = require("express").Router();
const mysql = require("mysql");
const config = require("../config");

const db = mysql.createPool(config.mysql);

// To get all the players
router.get("/", async (req, res) => {
    try {
        var main = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM Players";
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

router.get("/find", async (req, res) => {
    try {
        var {name} = req.query
        var sear = `select Player_Stats.matches_played as matches_played, Player_Stats.runs_scored as runs_scored, Player_Stats.hundreds as hundreds, Player_Stats.fifties as fifties, Player_Stats.high_score as high_score, Player_Stats.not_outs as not_outs, Player_Stats.strike_rate as strike_rate, Player_Stats.overs as overs, Player_Stats.wickets as wickets, Player_Stats.economy as economy, Player_Stats.best_bowling as best_bowling, Player_Stats.catches as catches, Player_Stats.run_outs as run_outs, Player_Stats.ducks as ducks, Player_Stats.outs as outs, player.first_name as first_name, player.last_name as last_name, player.age as age, player.player_role as player_role, player.image_link as image_link from Player_Stats join (select Players.first_name as first_name, Players.last_name as last_name, Players.age as age, Players.player_role as player_role, Players.image_link as image_link, Plays.team_id as team_id, Plays.player_id as player_id, Plays.league_id as league_id from Plays join Players on Players.player_id = Plays.player_id) player on player.player_id = Player_Stats.player_id and player.league_id = Player_Stats.league_id where concat(first_name, " ", last_name) like "%${name}%";`
        var main = await new Promise((resolve, reject) => {
            const query = sear;
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

// Insert player
router.post("/", async (req, res) => {
    try {
        var main = await new Promise((resolve, reject) => {
            const {
                first_name,
                last_name,
                age,
                career_start,
                role,
                image_link,
            } = req.body;
            var query = `INSERT INTO Players (first_name, last_name, age, career_start, player_role, image_link) \
            VALUES ("${first_name}", "${last_name}", ${age}, "${career_start}", "${role}", "${image_link}")`;

            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        res.status(200).send("Player Added!");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get players according to player_role
router.get("/role/:role", async (req, res) => {
    try {
        const role = req.params.role;
        var query = `SELECT * FROM Players WHERE player_role="${role}"`;
        var main = await new Promise((resolve, reject) => {
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

// Get players playing for particular team
router.get("/:team_id", async (req, res) => {
    try {
        var team_id = req.params.team_id;
        var query = `SELECT player_id FROM Plays WHERE team_id = ${team_id}`;
        var main = await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        main = await Promise.all(
            main.map(async (item) => {
                return await new Promise((resolve, reject) => {
                    query = `SELECT * from Players WHERE player_id = ${item.player_id}`;
                    db.query(query, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
                });
            })
        );
        res.status(200).send(main);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
