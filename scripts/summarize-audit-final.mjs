import fs from "node:fs";

const report = JSON.parse(fs.readFileSync("/tmp/poiesis-audit-final.json", "utf8"));
const rows = Object.values(report.advisories ?? {})
  .filter(advisory => advisory.severity === "high")
  .map(advisory => ({
    module: advisory.module_name,
    title: advisory.title,
    vulnerable: advisory.vulnerable_versions,
    patched: advisory.patched_versions,
    paths: advisory.findings?.flatMap(finding => finding.paths ?? []).slice(0, 4),
  }));
console.log(JSON.stringify(rows, null, 2));
