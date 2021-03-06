import { expect } from "chai"

function getPlayers(input) {
  return [
    {
      name: "Amy",
      dices: [6, 6, 6, 6],
    },
    {
      name: "Lin",
      dices: [6, 6, 6, 6],
    },
  ]
}

function getCategory(player) {
  const _map = player.dices.reduce((obj, val) => {
    obj[val] = obj[val] ? obj[val] + 1 : 1
    return obj
  }, {})

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
})
