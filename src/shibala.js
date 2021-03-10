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
  if (!result.hasWinner()) {
    return shibalaTieOutput()
  }
  return winnerOutputFormat(winner.name, winner.category, result.winnerOuptput)
}

function shibalaTieOutput() {
  return "Tie"
}

function winnerOutputFormat(name, category, output) {
  return `${name} wins, ${OUTPUT_CATEGORY_MAP[category]}: ${output}`
}
