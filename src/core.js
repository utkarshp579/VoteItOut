import { List, Map } from "immutable";

export function setEntries(state, entries) {
  return state.set("entries", List(entries));
}

export function next(state) {
  const entries = state.get("entries");
  const pair = entries.take(2);
  const remaining = entries.skip(2);
  return state.merge({
    vote: Map({ pair }),
    entries: remaining,
  });
}

export function vote(state, entry) {
  return state.updateIn(["vote", "tally", entry], 0, (tally) => tally + 1);
}

// precise next function for Production.
// export function next(state) {
//   const entries = state.get("entries");
//   return state.merge({
//     vote: Map({ pair: entries.take(2) }),
//     entries: entries.skip(2),
//   });
// }
