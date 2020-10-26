const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.get("/", (req, res) => {
    var query = "SELECT * from Teams";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send("Failed to fetch teams");
        }
        return res.status(200).send(result);
    });
});

// Get teams for particular player
router.get("/player/:player_id", async (req, res) => {
    try {
        var player_id = req.params.player_id;
        var query = `SELECT team_id FROM Plays WHERE player_id = ${player_id}`;
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
                    query = `SELECT * from Teams WHERE team_id = ${item.team_id}`;
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

router.post("/", async (req, res) => {
    try {
        const { team_name, logo_link } = req.body;
        var query = `INSERT INTO Teams (team_name, logo_link) VALUES ("${team_name}", "${logo_link}")`;
        var main = await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send("Team added !");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/multiple", async (req, res) => {
    try {
        const { data } = req.body;
        await Promise.all(
            data.map(async (item) => {
                const { team_name, logo_link } = item;
                var query = `INSERT INTO Teams (team_name, logo_link) VALUES ("${team_name}", "${logo_link}")`;
                await new Promise((resolve, reject) => {
                    db.query(query, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
                });
            })
        );
        res.status(200).send("Added multiple teams");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
