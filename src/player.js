import { countBy, invertBy, mapValues } from "lodash"

export const ALL_THE_SAME_KIND = "ALL_THE_SAME_KIND"
export const NO_POINT = "NO_POINT"
export const NORMAL_POINT = "NORMAL_POINT"

class Player {
  /**
   *
   * @param {string} name
   * @param {DiceRoll} diceRoll
   */
  constructor(name, diceRoll) {
    this.name = name
    this.diceRoll = diceRoll
  }

  get category() {
    return this.diceRoll.category
  }

  get point() {
    return this.diceRoll.point
  }

  get maxDice() {
    return this.diceRoll.maxDice
  }
}

class DiceRoll {
  constructor(fourDices) {
    if (fourDices.length !== 4) {
      throw new Error("Fail")
    }
    this.fourDices = fourDices
    this._countPointsMap =
      mapValues(invertBy(countBy(fourDices)), strs => strs.map(str => parseInt(str)))
    this.category = getCategoryFromMap(this._countPointsMap)

    function getCategoryFromMap(map) {
      if (map[4]) {
        return ALL_THE_SAME_KIND
      }
      if ((map[1] && map[1].length === 4) || map[3]) {
        return NO_POINT
      }
      return NORMAL_POINT
    }
  }

  get maxDice() {
    return this.fourDices.sort((a, b) => b - a)[0]
  }

  get point() {
    if (this.category === NO_POINT) {
      return 0
    }

    if (this.category === NORMAL_POINT) {
      if (this._countPointsMap[2].length === 1) {
        return this._countPointsMap[1][0] + this._countPointsMap[1][1]
      }
      else {
        return Math.max(this._countPointsMap[2][0], this._countPointsMap[2][1]) * 2
      }
    }

    if (this.category === ALL_THE_SAME_KIND) {
      return this.fourDices[0]
    }
  }
}

export function compareCategory(c1, c2) {
  const weight = {
    [ALL_THE_SAME_KIND]: 2,
    [NORMAL_POINT]: 1,
    [NO_POINT]: 0,
  }
  return weight[c1] - weight[c2]
}

/**
 *
 * @param {string} input
 * @returns {[Player, Player]}
 */
export function getPlayers(input) {
  const playerInputs = input.split("  ")
  return [
    getPlayer(playerInputs[0]),
    getPlayer(playerInputs[1]),
  ]

  function getPlayer(str) {
    const name = str.split(":")[0]
    const dices = str.split(":")[1].split(" ").map(str => parseInt(str))
    return new Player(name, new DiceRoll(dices))
  }
}

class DiceRollCompareResult {
  /**
   *
   * @param {string} type
   * @param {Player} winner
   * @param {string} winnerOutput
   */
  constructor(type, winner, winnerOutput) {
    this.type = type
    this.winner = winner
    this.winnerOuptput = winnerOutput;
  }

  static get ResultTypeEnum() {
    return {
      TIE: 0,
      WIN: 1,
      WIN_BY_WINNER_DICE: 2,
    }
  }

  static ofTie() {
    return new DiceRollCompareResult();
  }

  static ofWin(winner, output) {
    return new DiceRollCompareResult(DiceRollCompareResult.ResultTypeEnum.WIN, winner, output)
  }

  hasWinner() {
    return this.winner !== undefined;
  }
}

export function startComparison(player1, player2) {
  if (!player1 instanceof Player) {
    throw "player1 should be the instance of Player"
  }
  if (!player2 instanceof Player) {
    throw "player2 should be the instance of Player"
  }

  if (player1.category !== player2.category) {
    const winner = compareCategory(player1.category, player2.category) > 0 ? player1 : player2
    return new DiceRollCompareResult(null, winner, winner.point)
  }

  if (player1.category === NO_POINT) {
    return DiceRollCompareResult.ofTie()
  }

  if (player1.category === ALL_THE_SAME_KIND) {
    if (player1.point === player2.point) {
      return DiceRollCompareResult.ofTie()
    }
    const winner = player1.point > player2.point ? player1 : player2
    return DiceRollCompareResult.ofWin(winner, winner.point)
  }

  if (player1.category === NORMAL_POINT) {
    if (player1.point === player2.point) {
      if (player1.maxDice === player2.maxDice) {
        return DiceRollCompareResult.ofTie()
      }

      const winner = player1.maxDice > player2.maxDice ? player1 : player2
      return DiceRollCompareResult.ofWin(winner, winner.maxDice)
    }

    const winner = player1.point > player2.point ? player1 : player2
    return DiceRollCompareResult.ofWin(winner, winner.point)
  }
}
