export function normalizeTeamRow(row) {
  return {
    overallRank: Number(row["rank"]),
    team: row["team"],
    conference: row["conf"],
    record: row["record"],

    adjOE: Number(row["adjoe"]),
    adjOERank: Number(row["oe Rank"]),

    adjDE: Number(row["adjde"]),
    adjDERank: Number(row["de Rank"]),

    barthag: Number(row["barthag"]),
    kpRank: Number(row["rank_1"] ?? row["rank"]), // fallback safety

    projectedWins: Number(row["proj. W"]),
    projectedLosses: Number(row["Proj. L"]),

    sos: Number(row["sos"]),
    ncsos: Number(row["ncsos"]),
    consos: Number(row["consos"]),

    wab: Number(row["WAB"]),
    wabRank: Number(row["WAB Rk"]),

    adjTempo: Number(row["adjt"])
  };
}
