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

router.post("/multiple", async (req, res) => {
    const { data } = req.body;
    try {
        await Promise.all(
            data.map(async (item) => {
                await new Promise((resolve, reject) => {
                    var {
                        first_name,
                        last_name,
                        age,
                        career_start,
                        role,
                        image_link,
                    } = item;

                    career_start = career_start || "1900-01-01";
                    role = role || "";
                    age = age || 0;
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
            })
        );
        res.status(200).send("Multiple players added successfully");
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
