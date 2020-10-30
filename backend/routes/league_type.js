const { queries } = require("@testing-library/react");
const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.get("/", (req, res) => {
    var query = "SELECT * from League_Type";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).send(result);
    });
});

router.get("/:league_type_id", (req, res) => {
    const league_type_id = req.params.league_type_id;
    var query = `SELECT * from League_Type WHERE league_type_id = ${league_type_id}`;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).send(result);
    });
});

router.post("/", (req, res) => {
    const { league_format, league_name, league_logo_link } = req.body;
    var query = `INSERT INTO League_Type (league_format, league_name, league_logo_link) VALUES ("${league_format}", "${league_name}", "${league_logo_link}")`;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).send(`League type added successfully ${req.body}`);
    });
});

router.delete("/:league_type_id", (req, res) => {
    const league_type_id = req.params.league_type_id;
    var query = `DELETE FROM League_Type WHERE league_type_id = ${league_type_id}`;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send("Failed to delete league type");
        }
        return res.status(200).send(result);
    });
});

module.exports = router;
