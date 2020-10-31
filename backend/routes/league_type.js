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
        return res.status(200).send(result);
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

router.put("/:league_type_id", async (req, res) => {
    try {
        const league_type_id = req.params.league_type_id;
        const { league_format, league_name, league_logo_link } = req.body;
        var query = `UPDATE League_Type SET 
    league_format="${league_format}", league_name="${league_name}", league_logo_link="${league_logo_link}" 
    WHERE league_type_id = ${league_type_id};`;
        await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send("League updated successfully");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;
