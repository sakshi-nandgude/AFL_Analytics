CREATE OR REPLACE VIEW vw_match_summary AS
SELECT
    match_id,
    season,
    round,
    home_team,
    away_team,
    home_score,
    away_score,
    ABS(home_score - away_score) AS winning_margin,
    (home_score + away_score) AS total_score,
    CASE
        WHEN home_score > away_score THEN home_team
        WHEN away_score > home_score THEN away_team
        ELSE 'Draw'
    END AS winner
FROM fact_matches;