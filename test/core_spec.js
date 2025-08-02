// Setup Chai with chai-immutable for deep equality on Immutable.js structures
import chai from "chai";
import chaiImmutable from "chai-immutable";
chai.use(chaiImmutable);
const { expect } = chai;

// Import Immutable.js and core functions under test
import { List, Map, fromJS } from "immutable";
import { setEntries, next, vote } from "../src/core.js";

// Test suite for application logic
describe("application logic", () => {
  // Test group for setEntries function
  describe("setEntries", () => {
    //  Test case: accepts List and adds it to state
    it("adds the entries to the state", () => {
      const state = Map(); // initial empty state
      const entries = List.of("Trainspotting", "28 Days Later"); // Immutable input
      const nextState = setEntries(state, entries); // call function
      expect(nextState).to.equal(
        Map({
          entries: List.of("Trainspotting", "28 Days Later"), // expected Immutable output
        })
      );
    });

    //  Test case: converts plain JS array to Immutable List before storing
    it("converts to immutable", () => {
      const state = Map(); // initial state
      const entries = ["Trainspotting", "28 Days Later"]; // plain JS array input
      const nextState = setEntries(state, entries); // function should convert to List
      expect(nextState).to.equal(
        Map({
          entries: List.of("Trainspotting", "28 Days Later"), // expected output
        })
      );
    });
  });

  describe("next", () => {
    it("takes the next two entries under vote", () => {
      const state = Map({
        entries: List.of("Trainspotting", "28 Days Later", "Sunshine"),
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Trainspotting", "28 Days Later"),
          }),
          entries: List.of("Sunshine"),
        })
      );
    });

    it("puts winner of current vote back to entries", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Trainspotting", "28 Days Later"),
          tally: Map({
            Trainspotting: 4,
            "28 Days Later": 2,
          }),
        }),
        entries: List.of("Sunshine", "Millions", "127 Hours"),
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Sunshine", "Millions"),
          }),
          entries: List.of("127 Hours", "Trainspotting"),
        })
      );
    });

    it("puts both from tied vote back to entries", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Trainspotting", "28 Days Later"),
          tally: Map({
            Trainspotting: 3,
            "28 Days Later": 3,
          }),
        }),
        entries: List.of("Sunshine", "Millions", "127 Hours"),
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Sunshine", "Millions"),
          }),
          entries: List.of("127 Hours", "Trainspotting", "28 Days Later"),
        })
      );
    });

    it("marks winner when just one entry left", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Trainspotting", "28 Days Later"),
          tally: Map({
            Trainspotting: 4,
            "28 Days Later": 2,
          }),
        }),
        entries: List(),
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          winner: "Trainspotting",
        })
      );
    });
  });

  // Test group for vote function

  describe("vote", () => {
    it("creates a tally for the voted entry", () => {
      const voteState = Map({
        pair: List.of("Trainspotting", "28 Days Later"),
      });
      const nextVoteState = vote(voteState, "Trainspotting");
      expect(nextVoteState).to.equal(
        fromJS({
          pair: ["Trainspotting", "28 Days Later"],
          tally: {
            Trainspotting: 1,
          },
        })
      );
    });

    it("adds to existing tally for the voted entry", () => {
      const voteState = Map({
        pair: List.of("Trainspotting", "28 Days Later"),
        tally: Map({
          Trainspotting: 3,
          "28 Days Later": 2,
        }),
      });
      const nextVoteState = vote(voteState, "Trainspotting");
      expect(nextVoteState).to.equal(
        fromJS({
          pair: ["Trainspotting", "28 Days Later"],
          tally: {
            Trainspotting: 4,
            "28 Days Later": 2,
          },
        })
      );
    });
  });
});
