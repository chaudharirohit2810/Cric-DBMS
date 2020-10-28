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
            var query = `SELECT team_id, points from Team_Rankings WHERE league_id = ${league_id} ORDER BY ranks ASC`;
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        main = await Promise.all(
            main.map(async (item) => {
                var team = await findTeamDetails(item.team_id);
                var points = item.points;
                return {
                    team,
                    points,
                };
            })
        );
        res.status(200).send(main);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

const findTeamDetails = (id) => {
    return new Promise((resolve, reject) => {
        var query = `SELECT * from Teams WHERE team_id = ${id}`;
        db.query(query, (err, result) => {
            if (err) {
                reject(res);
            }
            resolve(result);
        });
    });
};

router.post("/", async (req, res) => {
    try {
        var { team_id, league_id, ranks, points } = req.body;
        var main = await new Promise((resolve, reject) => {
            var query = `INSERT INTO Team_Rankings (team_id, league_id, ranks, points) VALUES (${team_id}, ${league_id}, ${ranks}, ${points})`;
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

router.post("/multiple", async (req, res) => {
    try {
        var { data } = req.body;
        var main = await Promise.all(
            data.map(async (item) => {
                var { team_id, league_id, ranks, points } = item;
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
                return main;
            })
        );
        res.status(200).send("Multiple team rankings added");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
