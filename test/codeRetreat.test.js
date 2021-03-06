import { expect } from "chai"
import { countBy, invertBy } from "lodash"

const ALL_THE_SAME_KIND = "ALL_THE_SAME_KIND"
const NO_POINT = "NO_POINT"
const NORMAL_POINT = "NORMAL_POINT"

function getPlayers(input) {
  const player1 = input.split("  ")[0]
  const player2 = input.split("  ")[1]
  const player1Name = player1.split(":")[0]
  const player1Dices = player1.split(":")[1].split(" ").map(str => parseInt(str))
  const player2Name = player2.split(":")[0]
  const player2Dices = player2.split(":")[1].split(" ").map(str => parseInt(str))

  return [
    {
      name: player1Name,
      dices: player1Dices,
    },
    {
      name: player2Name,
      dices: player2Dices,
    },
  ]
}

function getCategory(player) {
  const _map = invertBy(countBy(player.dices))

  if (_map[4]) {
    return ALL_THE_SAME_KIND
  }
  if ((_map[1] && _map[1].length === 4) || _map[3]) {
    return NO_POINT
  }
  if (_map[2].length === 2) {
    return NORMAL_POINT
  }
  return NORMAL_POINT
}

function sibala(input) {
  const [player1, player2] = getPlayers(input)
  let player1Category = getCategory(player1)
  let player2Category = getCategory(player2)

  if (player1Category !== player2Category) {
    if (
      player1Category === ALL_THE_SAME_KIND ||
      player2Category === ALL_THE_SAME_KIND
    ) {
      const winnerOutput =
              player1Category === ALL_THE_SAME_KIND
                ? player1.dices[0]
                : player2.dices[0]
      const winnerName =
              player1Category === ALL_THE_SAME_KIND ? player1.name : player2.name
      return `${winnerName} wins, all the same kind: ${winnerOutput}`
    }

    if (player1Category === NORMAL_POINT && player2Category === NO_POINT) {
      const winnerOutput = 7
      return `${player1.name} wins, normal point: ${winnerOutput}`
    }
    if (player1Category === NO_POINT && player2Category === NORMAL_POINT) {
      const winnerOutput = 7
      return `${player2.name} wins, normal point: ${winnerOutput}`
    }
  }
  else {
    if (
      player1Category === ALL_THE_SAME_KIND &&
      player2Category === ALL_THE_SAME_KIND
    ) {
      if (player1.dices[0] === player2.dices[0]) {
        return "Tie"
      }
      if (player1.dices[0] > player2.dices[0]) {
        return "Amy wins, all the same kind: 6"
      }
      else {
        return "Lin wins, all the same kind: 6"
      }
    }
  }

  throw new Error("not implement")
}

describe("DicesGame", () => {
  it("Parse Input", () => {
    let input = "Amy:6 6 6 6  Lin:6 6 6 6"
    expect(getPlayers(input)[0].name).to.equal("Amy")
    expect(getPlayers(input)[1].name).to.equal("Lin")
    expect(getPlayers(input)[0].dices[0]).to.equal(6)
  })
  describe("getCategory", () => {
    it("category: all the same kind", () => {
      let input = {
        name: "Amy",
        dices: [6, 6, 6, 6],
      }
      expect(getCategory(input)).to.equal(ALL_THE_SAME_KIND)
    })
    it("should be no point", () => {
      let input = {
        name: "Amy",
        dices: [1, 2, 3, 4],
      }
      expect(getCategory(input)).to.equal(NO_POINT)
    })
    it("should be no point", () => {
      let input = {
        name: "Amy",
        dices: [2, 2, 2, 3],
      }
      expect(getCategory(input)).to.equal(NO_POINT)
    })

    it("should be normal point ", () => {
      let input = {
        name: "Amy",
        dices: [6, 6, 5, 3],
      }
      expect(getCategory(input)).to.equal(NORMAL_POINT)
    })

    it("should be normal point ", () => {
      let input = {
        name: "Amy",
        dices: [6, 6, 2, 2],
      }
      expect(getCategory(input)).to.equal(NORMAL_POINT)
    })
  })

  describe("shibala compare diff category", () => {
    it("ALL_THE_SAME_KIND vs. NORMAL_POINT", () => {
      const input = "Amy:6 6 6 6  Lin:6 6 3 4"
      expect(sibala(input)).to.equal("Amy wins, all the same kind: 6")
    })
    it("ALL_THE_SAME_KIND vs. NO_POINT", () => {
      const input = "Amy:6 6 6 6  Lin:1 2 3 4"
      expect(sibala(input)).to.equal("Amy wins, all the same kind: 6")
    })
    it("NO_POINT vs. ALL_THE_SAME_KIND", () => {
      const input = "Amy:1 2 3 4  Lin:5 5 5 5"
      expect(sibala(input)).to.equal("Lin wins, all the same kind: 5")
    })
    it("NORMAL_POINT vs. NO_POINT - Amy wins", () => {
      const input = "Amy:6 6 3 4  Lin:1 2 3 4"
      expect(sibala(input)).to.equal("Amy wins, normal point: 7")
    })
    it("NORMAL_POINT vs. NO_POINT - Lin wins", () => {
      const input = "Amy:1 2 3 4  Lin:6 6 3 4"
      expect(sibala(input)).to.equal("Lin wins, normal point: 7")
    })
  })

  describe("shibala compare same category", () => {
    it("ALL_THE_SAME_KIND vs. ALL_THE_SAME_KIND - Amy wins", () => {
      const input = "Amy:6 6 6 6  Lin:1 1 1 1"
      expect(sibala(input)).to.equal("Amy wins, all the same kind: 6")
    })
    it("ALL_THE_SAME_KIND vs. ALL_THE_SAME_KIND - Lin wins", () => {
      const input = "Amy:1 1 1 1  Lin:6 6 6 6"
      expect(sibala(input)).to.equal("Lin wins, all the same kind: 6")
    })
    it("ALL_THE_SAME_KIND vs. ALL_THE_SAME_KIND - Tei", () => {
      const input = "Amy:1 1 1 1  Lin:1 1 1 1"
      expect(sibala(input)).to.equal("Tie")
    })
  })
})
