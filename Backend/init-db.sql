DROP TABLE IF EXISTS rooms;
CREATE TABLE rooms
(
    id   INT AUTO_INCREMENT NOT NULL,
    name varchar(128)       NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS shelfs;
CREATE TABLE shelfs
(
    id     INT AUTO_INCREMENT NOT NULL,
    name   varchar(128)       NOT NULL,
    roomId INT                NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (roomId) REFERENCES rooms(id)
);

DROP TABLE IF EXISTS boxes;
CREATE TABLE boxes
(
    id      INT AUTO_INCREMENT NOT NULL,
    name    varchar(128)       NOT NULL,
    shelfId INT                NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (shelfId) REFERENCES shelfs(id)
);

DROP TABLE IF EXISTS items;
CREATE TABLE items
(
    id    INT AUTO_INCREMENT NOT NULL,
    name  varchar(128)       NOT NULL,
    boxId INT                NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (boxId) REFERENCES boxes (id)
);

INSERT INTO rooms
    (name)
VALUES ('Werkraum 1'),
       ('Werkraum 2');

INSERT INTO shelfs
(name, roomId)
VALUES ('Links', 1),
       ('Mitte', 1),
       ('Fensterbank', 2),
       ('Rückwand', 2);

INSERT INTO boxes
(name, shelfId)
VALUES ('E1', 1),
       ('E2', 1),
       ('E3', 2),
       ('R4', 2);

INSERT INTO items
(name, boxId)
VALUES ('Schere', 1),
       ('Stifte', 1),
       ('Fußball', 2),
       ('Orangen', 3);