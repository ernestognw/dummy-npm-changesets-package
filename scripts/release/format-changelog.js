const CHANGELOG = process.argv[2];

const formatted = CHANGELOG.replace(
  /- \[#(\d+)\]\((https:\/\/github\.com\/ernestognw\/dummy-npm-changesets-package\/pull\/\d+)\) \[`[0-9a-f]{7}`\]\(https:\/\/github\.com\/ernestognw\/dummy-npm-changesets-package\/commit\/[0-9a-f]{40}\) Thanks \[@[a-zA-Z0-9]+\]\(https:\/\/github\.com\/[a-zA-Z0-9]+\)! - (.*)/g,
  "- $3 ([#$1]($2))"
)
  .replace(
    /\n## (\d\.\d\.\d(-rc\.\d)?)\n/g,
    `\n## $1 (${new Date().toISOString().split("T")[0]})\n\n`
  )
  .replace(/\n### Major Changes\n/g, "")
  .replace(/\n### Minor Changes\n/g, "")
  .replace(/\n### Patch Changes\n/g, "")
  .replace(/\n-/g, "-");

console.log(formatted);
