--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE category
(
    id        INTEGER PRIMARY KEY,
    innerHTML TEXT NOT NULL,
    value     TEXT NOT NULL
);

CREATE TABLE search_query
(
    id       INTEGER PRIMARY KEY,
    title    TEXT NOT NULL,
    category TEXT NOT NULL
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE category;
DROP TABLE search_query;
