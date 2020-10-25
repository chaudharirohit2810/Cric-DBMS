const { query } = require("express");
const mysql = require("mysql");
const config = require("./config");
var db = mysql.createPool(config.mysql);

var playersQuery = `CREATE TABLE IF NOT EXISTS Players
(
    player_id int PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    age int,
    career_start DATE,
    player_role varchar(255),
    image_link varchar(255)
);`;

var teamsQuery = `
CREATE TABLE IF NOT EXISTS Teams
(
    team_id int PRIMARY KEY AUTO_INCREMENT,
    team_name varchar(255) NOT NULL,
    logo_link varchar(255)
);
`;

var leagueTypeQuery = `CREATE TABLE IF NOT EXISTS League_Type
(
    league_type_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    league_format varchar(255),
    league_name varchar(255),
    league_logo_link varchar(255)
);`;

var leagueQuery = `CREATE TABLE IF NOT EXISTS League
(
    league_id INT PRIMARY KEY AUTO_INCREMENT,
    league_type_id INT,
    startdate DATE,
    enddate DATE,
    duration DOUBLE,
    number_of_teams INT,
    country varchar(255),
    season INT,
    winner INT,
    FOREIGN KEY (league_type_id) REFERENCES League_Type(league_type_id) ON DELETE CASCADE,
    FOREIGN KEY (winner) REFERENCES Teams(team_id)
);`;

var teamsRankingQuery = `CREATE TABLE IF NOT EXISTS Team_Rankings
(
    team_id INT,
    league_id INT,
    ranks INT,
    points INT,
    PRIMARY KEY(team_id, league_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (league_id) REFERENCES League(league_id)
);`;

var matchesQuery = `CREATE TABLE IF NOT EXISTS Matches
(
    match_id INT PRIMARY KEY AUTO_INCREMENT,
    league_id INT,
    match_number INT,
    match_date DATE,
    team1 INT,
    team2 INT,
    won_by INT,
    FOREIGN KEY (league_id) REFERENCES League(league_id),
    FOREIGN KEY (team1) REFERENCES Teams(team_id),
    FOREIGN KEY (team2) REFERENCES Teams(team_id),
    FOREIGN KEY (won_by) REFERENCES Teams(team_id) 
);`;

var playerStatsQuery = `CREATE TABLE IF NOT EXISTS Player_Stats
(
    player_id INT,
    league_id INT,
    matches_played INT,
    runs_scored INT,
    hundreds INT,
    fifties INT,
    high_score INT,
    not_outs INT,
    strike_rate DOUBLE,
    overs DOUBLE,
    wickets INT,
    economy DOUBLE,
    best_bowling varchar(255),
    catches INT,
    run_outs INT,
    ducks INT,
    outs INT,
    PRIMARY KEY(player_id, league_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (league_id) REFERENCES League(league_id)
);`;

var playsQuery = `CREATE TABLE IF NOT EXISTS Plays
(
    team_id INT,
    player_id INT,
    PRIMARY KEY(team_id, player_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);`;

var queries = [
    playersQuery,
    teamsQuery,
    leagueTypeQuery,
    leagueQuery,
    teamsRankingQuery,
    matchesQuery,
    playerStatsQuery,
    playsQuery,
];

const createTable = async () => {
    try {
        queries.map((query) => {
            db.query(query, (err, result) => {
                if (err) {
                    console.log(err.message);
                }
            });
        });
        console.log("All tables created successfully");
    } catch (err) {
        console.log(err);
    }
};

module.exports = createTable;
