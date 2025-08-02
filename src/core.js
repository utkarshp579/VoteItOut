import { List, Map } from "immutable";

export function setEntries(state, entries) {
  return state.set("entries", List(entries));
}

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get("pair");
  const aVotes = vote.getIn(["tally", a], 0);
  const bVotes = vote.getIn(["tally", b], 0);
  if (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else return [a, b];
}

export function next(state) {
  const entries = state.get("entries").concat(getWinners(state.get("vote")));
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
