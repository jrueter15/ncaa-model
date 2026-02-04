export function predictGame(teamA, teamB) {
  const pointsA = (Number(teamA.adjOE) + Number(teamB.adjDE)) / 2;
  const pointsB = (Number(teamB.adjOE) + Number(teamA.adjDE)) / 2;

  const spread = pointsA - pointsB;
  const total = pointsA + pointsB;

  return {
    teamA: teamA.team,
    teamB: teamB.team,
    pointsA: Number(pointsA.toFixed(1)),
    pointsB: Number(pointsB.toFixed(1)),
    spread: Number(spread.toFixed(1)),
    total: Number(total.toFixed(1))
  };
}
