const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.get("/", (req, res) => {
    var query =
        "SELECT League.league_id as league_id, League.season as season, League_Type.league_name as league_name from League join League_Type on League.league_type_id=League_Type.league_type_id;";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).send(result);
    });
});

router.get("/league_seasons/:team_id", (req, res) => {
    const team_id = req.params.team_id
    var query = `select League_Type.league_type_id as league_type_id, League_Type.league_name as league_name, League_Type.league_format as league_format, tab.team_id as team_id, tab.league_id as league_id, tab.ranks as ranks, tab.points as points, tab.season
    as season from League_Type join (select Team_Rankings.team_id as team_id, Team_Rankings.league_id as league_id, Team_Rankings.ranks as ranks, Team_Rankings.points as points, League.season as season, League.league_type_id as league_type_id from Team_Rankings join League on Team_Rankings.league_id = League.league_id) tab on tab.league_type_id = League_Type.league_type_id where team_id = ${team_id};`
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).send(result);
    });
});

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
        return res.status(200).send(result);
    });
});

router.put("/:league_id", async (req, res) => {
    try {
        const {
            league_type_id,
            startdate,
            enddate,
            number_of_teams,
            country,
            season,
            winner,
        } = req.body;
        const league_id = req.params.league_id;
        const oneDay = 24 * 60 * 60 * 1000;
        const duration = Math.round(
            Math.abs((new Date(startdate) - new Date(enddate)) / oneDay)
        );
        var query = `UPDATE League SET 
        league_type_id = ${league_type_id}, startdate="${startdate}", enddate="${enddate}", duration=${duration},
         number_of_teams=${number_of_teams}, country="${country}", season=${season}, 
         winner=${winner} WHERE league_id = ${league_id};`;

        await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send("League updated successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
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

router.delete("/:league_id", async (req, res) => {
    try {
        var league = req.params.league_id;
        var query = `DELETE FROM League where league_id = ${league}`;
        await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send("Season deleted successfully");
    } catch (err) {
        res.status(400).send("Failed to delete season");
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
