import { ALL_THE_SAME_KIND, getPlayers, startComparison, NO_POINT, NORMAL_POINT } from "./player"

export const OUTPUT_CATEGORY_MAP = {
  [ALL_THE_SAME_KIND]: "all the same kind",
  [NORMAL_POINT]: "normal point",
  [NO_POINT]: "no point",
}

export function shibala(input) {
  const [player1, player2] = getPlayers(input)
  const result = startComparison(player1, player2)

  const { winner } = result
  if (result.isTypeTie()) {
    return shibalaTieOutput()
  }
  if (result.isTypeWinByWinnerDice()) {
    return winnerOutputFormat(winner.name, winner.category, winner.maxDice)
  }
  return winnerOutputFormat(winner.name, winner.category, winner.point)
}

function shibalaTieOutput() {
  return "Tie"
}

function winnerOutputFormat(name, category, output) {
  return `${name} wins, ${OUTPUT_CATEGORY_MAP[category]}: ${output}`
}
