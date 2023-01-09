const CHANGELOG = process.argv[2];

const PR_NUMBER = `\\[#(\\d+)\\]`;
const REPO = "[A-z|-]+";
const GITHUB_USERNAME = `(?:[A-z\\d](?:[A-z\\d]|-(?=[A-z\\d])){0,38})`;
const GITHUB_URL = `https://github\\.com/`;
const REPO_URL = `${GITHUB_URL}${GITHUB_USERNAME}/${REPO}/`;
const SHORT_SHA = "[0-9a-f]{7}";
const FULL_SHA = "[0-9a-f]{40}";

const RELEASE_LINE_REGEX = new RegExp(
  `- (?:${PR_NUMBER}\\((${REPO_URL}pull/\\d+)\\) )?\\[\`${SHORT_SHA}\`\\]\\(${REPO_URL}commit/${FULL_SHA}\\) Thanks \\[\@${GITHUB_USERNAME}\\]\\(${GITHUB_URL}(?:apps/)?${GITHUB_USERNAME}\\)! - (.*)`,
  "g"
);

const VERSION_TITLE_REGEX = /\n## (\d\.\d\.\d(-rc\.\d)?)\n/g;
const DATE = new Date().toISOString().split("T")[0];

const formatted = CHANGELOG.replace(/\n- (\[.*)/g, "- $1")
  .replace("([#]())", "") // Fallback when there's no PR
  .replace(RELEASE_LINE_REGEX, "- $3 ([#$1]($2))")
  .replace(VERSION_TITLE_REGEX, `\n## $1 (${DATE})\n\n`)
  .replace(/\n### Major Changes\n/g, "")
  .replace(/\n### Minor Changes\n/g, "")
  .replace(/\n### Patch Changes\n/g, "");

console.log(formatted);
