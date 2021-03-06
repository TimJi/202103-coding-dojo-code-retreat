import { expect } from "chai"
import { countBy, invertBy } from "lodash"

function getPlayers(input) {
  const player1 = input.split("  ")[0]
  const player2 = input.split("  ")[1]
  const player1Name = player1.split(":")[0]
  const player1Dices = player1
    .split(":")[1]
    .split(" ")
    .map(str => parseInt(str))
  const player2Name = player2.split(":")[0]
  const player2Dices = player2
    .split(":")[1]
    .split(" ")
    .map(str => parseInt(str))

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
    return "ALL_THE_SAME_KIND"
  }
  if ((_map[1] && _map[1].length === 4) || _map[3]) {
    return "NO_POINT"
  }
  return "NORMAL_POINT"
}

function sibala(input) {
  const [player1, player2] = getPlayers(input)
  if (
    getCategory(player1) === "ALL_THE_SAME_KIND" &&
    getCategory(player2) !== "ALL_THE_SAME_KIND"
  ) {
    return "Amy wins, all the same kind: 6"
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
      expect(getCategory(input)).to.equal("ALL_THE_SAME_KIND")
    })
    it("should be no point", () => {
      let input = {
        name: "Amy",
        dices: [1, 2, 3, 4],
      }
      expect(getCategory(input)).to.equal("NO_POINT")
    })
    it("should be no point", () => {
      let input = {
        name: "Amy",
        dices: [2, 2, 2, 3],
      }
      expect(getCategory(input)).to.equal("NO_POINT")
    })

    it("should be normal point ", () => {
      let input = {
        name: "Amy",
        dices: [6, 6, 5, 3],
      }
      expect(getCategory(input)).to.equal("NORMAL_POINT")
    })

    it("should be normal point ", () => {
      let input = {
        name: "Amy",
        dices: [6, 6, 2, 2],
      }
      expect(getCategory(input)).to.equal("NORMAL_POINT")
    })
  })

  it("ALL_THE_SAME_KIND vs. NORMAL_POINT", () => {
    const input = "Amy:6 6 6 6  Lin:6 6 3 4"
    expect(sibala(input)).to.equal("Amy wins, all the same kind: 6")
  })
})
