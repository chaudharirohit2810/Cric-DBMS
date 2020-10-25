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

router.post("/", (req, res) => {
    const { team_name, logo_link } = req.body;
    var query = `INSERT INTO Teams (team_name, logo_link) VALUES ("${team_name}", "${logo_link}")`;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).send(result);
    });
});

router.post("/multiple", async (req, res) => {
    const { data } = req.body;
    await Promise.all(
        data.map(async (item) => {
            const { team_name, logo_link } = item;
            var query = `INSERT INTO Teams (team_name, logo_link) VALUES ("${team_name}", "${logo_link}")`;
            await db.query(query, (err, result) => {
                if (err) {
                    return res.status(400).send(err.message);
                }
            });
        })
    );
    return res.status(200).send("Added multiple teams");
});

module.exports = router;
