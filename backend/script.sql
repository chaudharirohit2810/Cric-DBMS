CREATE TABLE Players
(
    player_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    age int,
    career_start DATE,
    player_role varchar(255)
);