DROP VIEW IF EXISTS vw_team_performance;

CREATE VIEW vw_team_performance AS

WITH team_matches AS (

    SELECT
        home_team_id AS team_id,
        away_score AS points_against,
        home_score AS points_for,
        CASE
            WHEN home_score > away_score THEN 1
            ELSE 0
        END AS win,
        CASE
            WHEN home_score < away_score THEN 1
            ELSE 0
        END AS loss,
        CASE
            WHEN home_score = away_score THEN 1
            ELSE 0
        END AS draw

    FROM fact_matches

    UNION ALL

    SELECT
        away_team_id,
        home_score,
        away_score,
        CASE
            WHEN away_score > home_score THEN 1
            ELSE 0
        END,
        CASE
            WHEN away_score < home_score THEN 1
            ELSE 0
        END,
        CASE
            WHEN away_score = home_score THEN 1
            ELSE 0
        END

    FROM fact_matches

)

SELECT

    t.team_id,

    t.team_name,

    COUNT(*) AS matches_played,

    SUM(win) AS wins,

    SUM(loss) AS losses,

    SUM(draw) AS draws,

    ROUND(
        SUM(win)::numeric * 100 /
        COUNT(*),
        2
    ) AS win_percentage,

    SUM(points_for) AS points_for,

    SUM(points_against) AS points_against,

    ROUND(
        AVG(points_for),
        2
    ) AS average_score,

    ROUND(
        AVG(points_against),
        2
    ) AS average_conceded

FROM team_matches tm

JOIN dim_teams t
ON tm.team_id = t.team_id

GROUP BY

    t.team_id,
    t.team_name;