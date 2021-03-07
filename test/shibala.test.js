import { expect } from "chai"
import { ALL_THE_SAME_KIND, compareCategory, getPlayers, NO_POINT, NORMAL_POINT } from "../src/player"
import { shibala } from "../src/shibala"


describe("DicesGame", () => {
  describe("parse input", function() {
    it("Parse Input", () => {
      let input = "Amy:6 6 6 6  Lin:6 6 6 6"
      expect(getPlayers(input)[0].name).to.equal("Amy")
      expect(getPlayers(input)[1].name).to.equal("Lin")
    })
  })

  describe("shibala compare diff category", () => {
    it("ALL_THE_SAME_KIND vs. NORMAL_POINT", () => {
      const input = "Amy:6 6 6 6  Lin:6 6 3 4"
      expect(shibala(input)).to.equal("Amy wins, all the same kind: 6")
    })
    it("ALL_THE_SAME_KIND vs. NO_POINT", () => {
      const input = "Amy:6 6 6 6  Lin:1 2 3 4"
      expect(shibala(input)).to.equal("Amy wins, all the same kind: 6")
    })
    it("NO_POINT vs. ALL_THE_SAME_KIND", () => {
      const input = "Amy:1 2 3 4  Lin:5 5 5 5"
      expect(shibala(input)).to.equal("Lin wins, all the same kind: 5")
    })
    it("NORMAL_POINT vs. NO_POINT - Amy wins", () => {
      const input = "Amy:6 6 3 4  Lin:1 2 3 4"
      expect(shibala(input)).to.equal("Amy wins, normal point: 7")
    })
    it("NORMAL_POINT vs. NO_POINT - Lin wins", () => {
      const input = "Amy:1 2 3 4  Lin:6 6 3 4"
      expect(shibala(input)).to.equal("Lin wins, normal point: 7")
    })
  })

  describe("shibala compare same category", () => {
    describe("all the same kind comparison logic", function() {
      it("ALL_THE_SAME_KIND vs. ALL_THE_SAME_KIND - Amy wins", () => {
        const input = "Amy:6 6 6 6  Lin:1 1 1 1"
        expect(shibala(input)).to.equal("Amy wins, all the same kind: 6")
      })
      it("ALL_THE_SAME_KIND vs. ALL_THE_SAME_KIND - Lin wins", () => {
        const input = "Amy:1 1 1 1  Lin:6 6 6 6"
        expect(shibala(input)).to.equal("Lin wins, all the same kind: 6")
      })
      it("ALL_THE_SAME_KIND vs. ALL_THE_SAME_KIND - Tie", () => {
        const input = "Amy:1 1 1 1  Lin:1 1 1 1"
        expect(shibala(input)).to.equal("Tie")
      })

    })
    describe("normal point comparison", () => {
      it("NORMAL_POINT vs. NORMAL_POINT - Amy wins", () => {
        const input = "Amy:1 1 4 5  Lin:4 4 2 1"
        expect(shibala(input)).to.equal("Amy wins, normal point: 9")
      })
      it("NORMAL_POINT vs. NORMAL_POINT - Lin wins", () => {
        const input = "Amy:1 1 4 5  Lin:4 4 6 5"
        expect(shibala(input)).to.equal("Lin wins, normal point: 11")
      })
      it("NORMAL_POINT vs. NORMAL_POINT but points are the same - Amy wins", () => {
        const input = "Amy:1 1 6 3  Lin:3 3 5 4"
        expect(shibala(input)).to.equal("Amy wins, normal point: 6")
      })
    })

    describe("no point comparison", () => {
      it("NO_POINT vs. NO_POINT - Tie", () => {
        const input = "Amy:1 3 4 5  Lin:4 5 2 1"
        expect(shibala(input)).to.equal("Tie")
      })

    })
  })
})
