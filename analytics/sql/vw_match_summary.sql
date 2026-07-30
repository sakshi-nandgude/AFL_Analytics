DROP VIEW IF EXISTS vw_match_summary;

CREATE VIEW vw_match_summary AS
SELECT
    fm.match_id,
    ds.season_year AS season,
    fm.round_number AS round,
    ht.team_name AS home_team,
    at.team_name AS away_team,
    fm.home_score,
    fm.away_score,
    ABS(fm.home_score - fm.away_score) AS winning_margin,
    (fm.home_score + fm.away_score) AS total_score,
    CASE
        WHEN fm.home_score > fm.away_score THEN ht.team_name
        WHEN fm.away_score > fm.home_score THEN at.team_name
        ELSE 'Draw'
    END AS winner
FROM fact_matches fm
JOIN dim_teams ht
    ON fm.home_team_id = ht.team_id
JOIN dim_teams at
    ON fm.away_team_id = at.team_id
JOIN dim_seasons ds
    ON fm.season_id = ds.season_id;