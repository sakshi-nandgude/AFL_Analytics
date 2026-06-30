-- ============================================================
-- AFL Analytics Portal
-- Analytics Views
-- ============================================================


-- ============================================================
-- Dashboard Summary
-- ============================================================

DROP VIEW IF EXISTS vw_dashboard_summary;

CREATE VIEW vw_dashboard_summary AS

SELECT

    (SELECT COUNT(*) FROM dim_teams) AS total_teams,

    (SELECT COUNT(*) FROM dim_players) AS total_players,

    (SELECT COUNT(*) FROM fact_matches) AS total_matches,

    ROUND(
        (SELECT AVG(home_score) FROM fact_matches),
        2
    ) AS avg_home_score,

    ROUND(
        (SELECT AVG(away_score) FROM fact_matches),
        2
    ) AS avg_away_score,

    ROUND(
        (SELECT AVG(home_score + away_score)
         FROM fact_matches),
        2
    ) AS avg_total_score;


-- ============================================================
-- Team Performance
-- ============================================================

DROP VIEW IF EXISTS vw_team_performance;

CREATE VIEW vw_team_performance AS

SELECT

    t.team_id,

    t.team_name,

    COUNT(
        CASE
            WHEN m.winner_team_id = t.team_id
            THEN 1
        END
    ) AS wins,

    COUNT(
        CASE
            WHEN
                (
                    m.home_team_id = t.team_id
                    OR
                    m.away_team_id = t.team_id
                )
                AND
                m.winner_team_id <> t.team_id
            THEN 1
        END
    ) AS losses,

    ROUND(

        COUNT(
            CASE
                WHEN m.winner_team_id = t.team_id
                THEN 1
            END
        ) * 100.0

        /

        NULLIF(

            COUNT(
                CASE
                    WHEN
                        m.home_team_id = t.team_id
                        OR
                        m.away_team_id = t.team_id
                    THEN 1
                END
            ),

            0

        ),

        2

    ) AS win_percentage,

    ROUND(

        AVG(

            CASE

                WHEN m.home_team_id = t.team_id
                THEN m.home_score

                ELSE m.away_score

            END

        ),

        2

    ) AS average_score

FROM dim_teams t

LEFT JOIN fact_matches m

ON

t.team_id = m.home_team_id

OR

t.team_id = m.away_team_id

GROUP BY

t.team_id,

t.team_name;


-- ============================================================
-- Player Summary
-- ============================================================

DROP VIEW IF EXISTS vw_player_summary;

CREATE VIEW vw_player_summary AS

SELECT

    p.player_id,

    p.player_name,

    t.team_name,

    p.position,

    COUNT(ps.match_id) AS matches_played,

    SUM(ps.goals) AS total_goals,

    SUM(ps.marks) AS total_marks,

    SUM(ps.tackles) AS total_tackles,

    SUM(ps.disposals) AS total_disposals,

    ROUND(AVG(ps.goals),2) AS avg_goals,

    ROUND(AVG(ps.disposals),2) AS avg_disposals

FROM dim_players p

JOIN dim_teams t

ON p.team_id = t.team_id

LEFT JOIN fact_player_stats ps

ON p.player_id = ps.player_id

GROUP BY

p.player_id,

p.player_name,

t.team_name,

p.position;


-- ============================================================
-- Team Rankings
-- ============================================================

DROP VIEW IF EXISTS vw_team_rankings;

CREATE VIEW vw_team_rankings AS

SELECT

    *,

    RANK()

    OVER(

        ORDER BY

        win_percentage DESC,

        average_score DESC

    )

    AS team_rank

FROM vw_team_performance;


-- ============================================================
-- Match Summary
-- ============================================================

DROP VIEW IF EXISTS vw_match_summary;

CREATE VIEW vw_match_summary AS

SELECT

    m.match_id,

    s.season_year,

    m.round_number,

    m.match_date,

    ht.team_name AS home_team,

    at.team_name AS away_team,

    m.home_score,

    m.away_score,

    wt.team_name AS winner

FROM fact_matches m

JOIN dim_seasons s

ON m.season_id = s.season_id

JOIN dim_teams ht

ON m.home_team_id = ht.team_id

JOIN dim_teams at

ON m.away_team_id = at.team_id

JOIN dim_teams wt

ON m.winner_team_id = wt.team_id;