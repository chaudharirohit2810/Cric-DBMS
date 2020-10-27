const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.get("/:league_type", async (req, res) => {
    try {
        const league_type = req.params.league_type;
        var main = await new Promise((resolve, reject) => {
            var query = `SELECT * from League WHERE league_type_id = ${league_type} ORDER BY startdate;`;
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
                var team = await new Promise((resolve, reject) => {
                    const { winner } = item;
                    var query = `SELECT * from Teams where team_id = ${winner}`;
                    db.query(query, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
                return {
                    ...item,
                    team,
                };
            })
        );
        return res.status(200).send(main);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

router.post("/", (req, res) => {
    const {
        league_type_id,
        startdate,
        enddate,
        number_of_teams,
        country,
        season,
        winner,
    } = req.body;
    const oneDay = 24 * 60 * 60 * 1000;
    const duration = Math.round(
        Math.abs((new Date(startdate) - new Date(enddate)) / oneDay)
    );
    var query = `INSERT INTO League (league_type_id, startdate, enddate, duration, 
        number_of_teams, country, season, winner) VALUES (${league_type_id}, "${startdate}", 
        "${enddate}", ${duration}, ${number_of_teams}, "${country}", ${season}, ${winner})`;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).send("League added successfully");
    });
});

router.post("/multiple", async (req, res) => {
    const { data } = req.body;
    try {
        var main = await Promise.all(
            data.map(async (item) => {
                await new Promise((resolve, reject) => {
                    const {
                        league_type_id,
                        startdate,
                        enddate,
                        number_of_teams,
                        country,
                        season,
                        winner,
                    } = item;
                    const oneDay = 24 * 60 * 60 * 1000;
                    const duration = Math.round(
                        Math.abs(
                            (new Date(startdate) - new Date(enddate)) / oneDay
                        )
                    );
                    var query = `INSERT INTO League (league_type_id, startdate, enddate, duration, 
                    number_of_teams, country, season, winner) VALUES (${league_type_id}, "${startdate}", 
                    "${enddate}", ${duration}, ${number_of_teams}, "${country}", ${season}, ${winner})`;
                    db.query(query, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
                });
            })
        );
        res.status(200).send("All Leagues added successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete("/deleteall", async (req, res) => {
    var query = `DELETE FROM League;`;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        res.status(200).send(result);
    });
});

module.exports = router;
