const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.get("/:league_type", async (req, res) => {
    const league_type = req.params.league_type;
    var query = `SELECT * from League WHERE league_type_id = ${league_type}`;
    await db.query(query, async (err, result) => {
        if (err) {
            return res.status(400).send("Failed to league types");
        }
        const main = await Promise.all(
            result.map(async (item) => {
                const { winner } = item;
                var query = `SELECT * from Teams where team_id = ${winner}`;
                var team = {};
                await db.query(query, (err, result) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        console.log(result);
                        team = result;
                    }
                });
                return {
                    ...item,
                    team,
                };
            })
        );
        return res.status(200).send(main);
    });
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
        await Promise.all(
            data.map(async (item) => {
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
                    Math.abs((new Date(startdate) - new Date(enddate)) / oneDay)
                );
                var query = `INSERT INTO League (league_type_id, startdate, enddate, duration, 
                number_of_teams, country, season, winner) VALUES (${league_type_id}, "${startdate}", 
                "${enddate}", ${duration}, ${number_of_teams}, "${country}", ${season}, ${winner})`;
                await db.query(query, (err, result) => {
                    if (err) {
                        throw Error(err.message);
                    }
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
    await db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        res.status(200).send(result);
    });
});

module.exports = router;
