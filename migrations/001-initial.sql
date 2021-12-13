--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE rutracker_category
(
    id        INTEGER PRIMARY KEY,
    innerHTML TEXT NOT NULL,
    value     TEXT NOT NULL
);

CREATE TABLE rutracker_search_query
(
    id       INTEGER PRIMARY KEY,
    title    TEXT NOT NULL,
    category TEXT NOT NULL

)

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE rutracker_category;
DROP TABLE rutracker_search_query;
