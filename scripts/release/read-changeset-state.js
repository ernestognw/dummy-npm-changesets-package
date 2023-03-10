const { readPreState } = require("@changesets/pre");
const { default: readChangesets } = require("@changesets/read");

// From https://github.com/changesets/action/blob/v1.4.1/src/readChangesetState.ts
async function readChangesetState(cwd = process.cwd()) {
  const preState = await readPreState(cwd);
  const isInPreMode = preState !== undefined && preState.mode === "pre";

  let changesets = await readChangesets(cwd);

  if (isInPreMode) {
    const changesetsToFilter = new Set(preState.changesets);
    changesets = changesets.filter((x) => !changesetsToFilter.has(x.id));
  }

  return {
    preState: isInPreMode ? preState : undefined,
    changesets,
  };
}

const [_, __, ...fields] = process.argv;

const get = (value, [field, ...fields]) =>
  field === undefined || value === undefined
    ? value
    : get(value[field], fields);

readChangesetState().then((state) => console.log(get(state, fields)));
