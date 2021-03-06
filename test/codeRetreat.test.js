import { expect } from "chai"
import { countBy } from "lodash"

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
  const _map = countBy(player.dices)

  if (Object.keys(_map).length === 1) {
    return "ALL_THE_SAME_KIND"
  }
  if (Object.keys(_map).length === 4) {
    return "NO_POINT"
  }
}

describe("DicesGame", () => {
  it("Parse Input", () => {
    let input = "Amy:6 6 6 6  Lin:6 6 6 6"
    expect(getPlayers(input)[0].name).to.equal("Amy")
    expect(getPlayers(input)[1].name).to.equal("Lin")
    expect(getPlayers(input)[0].dices[0]).to.equal(6)
  })
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
  it("should be no point when 3 of them are the same", () => {
    let input = {
      name: "Amy",
      dices: [6, 6, 6, 3],
    }
    expect(getCategory(input)).to.equal("NO_POINT")
  })
})
