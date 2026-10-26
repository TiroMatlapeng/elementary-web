import { test } from "node:test";
import assert from "node:assert/strict";
import { VENTURES } from "./ventures-data.ts";

const byName = (name: string) => VENTURES.find((v) => v.name === name);

test("Modiri is live and described", () => {
  const modiri = byName("Modiri");
  assert.ok(modiri);
  assert.equal(modiri.tier, "live");
  assert.ok(modiri.description && modiri.description.trim().length > 0);
});

test("unreleased ventures are names-only and in development", () => {
  for (const name of ["LeungoERP", "Moreki", "Caring"]) {
    const v = byName(name);
    assert.ok(v, `${name} missing`);
    assert.equal(v.tier, "dev");
    assert.ok(!v.description || v.description.trim() === "");
  }
});

test("Mqhubi is not listed", () => {
  assert.equal(byName("Mqhubi"), undefined);
});
