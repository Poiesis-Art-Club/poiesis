import fs from "node:fs";
const report = JSON.parse(fs.readFileSync("/tmp/poiesis-audit-final2.json", "utf8"));
console.log(JSON.stringify(Object.values(report.advisories ?? {}).filter(a => a.severity === "high").map(a => ({ module: a.module_name, title: a.title, vulnerable: a.vulnerable_versions, patched: a.patched_versions, paths: a.findings?.flatMap(f => f.paths ?? []).slice(0, 5) })), null, 2));
