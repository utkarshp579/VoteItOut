// Setup Chai with chai-immutable for deep equality on Immutable.js structures
import chai from "chai";
import chaiImmutable from "chai-immutable";
chai.use(chaiImmutable);
const { expect } = chai;

// Import Immutable.js and core function under test
import { List, Map } from "immutable";
import { setEntries } from "../src/core.js";

// 🧪 Test suite for application logic
describe("application logic", () => {
  // 🧪 Test group for setEntries function
  describe("setEntries", () => {
    // ✅ Test case: accepts List and adds it to state
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

    // ✅ Test case: converts plain JS array to Immutable List before storing
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
});
