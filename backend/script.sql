DROP TABLE IF EXISTS Player_Stats;
DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS Team_Rankings;
DROP TABLE IF EXISTS Matches;
DROP TABLE IF EXISTS League;
DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS League_Type;

CREATE TABLE Players
(
    player_id int PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    age int,
    career_start DATE,
    player_role varchar(255),
    image_link varchar(255)
);


CREATE TABLE Teams
(
    team_id int PRIMARY KEY AUTO_INCREMENT,
    team_name varchar(255) NOT NULL,
    number_of_players INT,
    logo_link varchar(255)
);


CREATE TABLE League_Type
(
    league_type_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    league_format varchar(255),
    league_name varchar(255),
    league_logo_link varchar(255)
);


CREATE TABLE League
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
);

CREATE TABLE Team_Rankings
(
    team_id INT,
    league_id INT,
    ranks INT,
    points INT,
    PRIMARY KEY(team_id, league_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (league_id) REFERENCES League(league_id)
);

CREATE TABLE Matches
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
);

CREATE TABLE Player_Stats
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
);