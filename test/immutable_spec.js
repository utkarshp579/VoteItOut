import { expect } from "chai"; // Used for assertions in test cases
import { List, Map } from "immutable"; // Immutable.js provides persistent immutable data structures

// Grouping tests using describe
describe("immutability", () => {
  // 1. Immutable Number Example
  describe("a number", () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it("is immutable", () => {
      // Individual test case using 'it'
      let state = 42;
      let nextState = increment(state);
      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  // 2. Immutable List Example
  describe("A List", () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it("is immutable", () => {
      let state = List.of("Trainspotting", "28 Days Later");
      let nextState = addMovie(state, "Sunshine");

      expect(nextState.toString()).to.equal(
        List.of("Trainspotting", "28 Days Later", "Sunshine").toString()
      );

      expect(state.toString()).to.equal(
        List.of("Trainspotting", "28 Days Later").toString()
      );
    });
  });

  // 3. Immutable Nested Structure (Tree using Map & List)
  describe("a tree", () => {
    function addMovie(currentState, movie) {
      return currentState.update("movies", (movies) => movies.push(movie)); // update is better than getter and setter providing clean code
    }

    it("is immutable", () => {
      let state = Map({
        movies: List.of("Trainspotting", "28 Days Later"),
      });

      let nextState = addMovie(state, "Sunshine");

      expect(nextState.toString()).to.equal(
        Map({
          movies: List.of("Trainspotting", "28 Days Later", "Sunshine"),
        }).toString()
      );

      expect(state.toString()).to.equal(
        Map({
          movies: List.of("Trainspotting", "28 Days Later"),
        }).toString()
      );
    });
  });
});

