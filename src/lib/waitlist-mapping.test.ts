import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  mapWaitlistRequest,
  WaitlistMappingError,
  type WaitlistPlatform,
  type WaitlistRegistrationRequest,
} from "./waitlist-mapping.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURE_PATH = resolve(
  __dirname,
  "../test/fixtures/waitlist_registration_request.json"
);

const canonicalFixture: WaitlistRegistrationRequest = JSON.parse(
  readFileSync(FIXTURE_PATH, "utf8")
);

test("maps the canonical homeowner payload byte-equal to the fixture", () => {
  const result = mapWaitlistRequest({
    firstName: "Lerato",
    lastName: "Mokoena",
    mobile: "+27821234567",
    email: "lerato.mokoena@example.co.za",
    city: "Johannesburg",
    role: "homeowner",
    platform: "IOS",
  });
  assert.deepEqual(result, canonicalFixture);
});

test("role tradesperson maps to ARTISAN", () => {
  const result = mapWaitlistRequest({
    firstName: "Thabo",
    lastName: "Nkosi",
    mobile: "+27820000000",
    email: "thabo@example.co.za",
    city: "Pretoria",
    role: "tradesperson",
    platform: "ANDROID",
  });
  assert.equal(result.track, "ARTISAN");
});

test("role business maps to COMPANY", () => {
  const result = mapWaitlistRequest({
    firstName: "Acme",
    lastName: "Cover",
    mobile: "+27820000001",
    email: "ops@acme.co.za",
    city: "Durban",
    role: "business",
    platform: "IOS",
  });
  assert.equal(result.track, "COMPANY");
});

test("city 'Other' becomes null", () => {
  const result = mapWaitlistRequest({
    firstName: "Sipho",
    lastName: "Dlamini",
    mobile: "+27820000002",
    email: "sipho@example.co.za",
    city: "Other",
    role: "homeowner",
    platform: "ANDROID",
  });
  assert.equal(result.city, null);
});

test("empty / missing city becomes null", () => {
  const result = mapWaitlistRequest({
    firstName: "Sipho",
    lastName: "Dlamini",
    mobile: "+27820000002",
    email: "sipho@example.co.za",
    city: "",
    role: "homeowner",
    platform: "IOS",
  });
  assert.equal(result.city, null);
});

test("empty mobile becomes null", () => {
  const result = mapWaitlistRequest({
    firstName: "Naledi",
    lastName: "Khumalo",
    mobile: "   ",
    email: "naledi@example.co.za",
    city: "Cape Town",
    role: "homeowner",
    platform: "ANDROID",
  });
  assert.equal(result.mobile, null);
});

test("name is first + last joined with a single space", () => {
  const result = mapWaitlistRequest({
    firstName: "Lerato",
    lastName: "Mokoena",
    mobile: "+27821234567",
    email: "lerato.mokoena@example.co.za",
    city: "Johannesburg",
    role: "homeowner",
    platform: "IOS",
  });
  assert.equal(result.name, "Lerato Mokoena");
});

test("missing last name still yields a non-padded name", () => {
  const result = mapWaitlistRequest({
    firstName: "Lerato",
    lastName: "",
    mobile: "+27821234567",
    email: "lerato@example.co.za",
    city: "Johannesburg",
    role: "homeowner",
    platform: "IOS",
  });
  assert.equal(result.name, "Lerato");
});

test("unknown role throws WaitlistMappingError", () => {
  assert.throws(
    () =>
      mapWaitlistRequest({
        firstName: "X",
        lastName: "Y",
        mobile: "+27820000000",
        email: "x@example.co.za",
        city: "Johannesburg",
        role: "investor",
        platform: "IOS",
      }),
    WaitlistMappingError
  );
});

test("missing email throws WaitlistMappingError", () => {
  assert.throws(
    () =>
      mapWaitlistRequest({
        firstName: "X",
        lastName: "Y",
        mobile: "+27820000000",
        city: "Johannesburg",
        role: "homeowner",
        platform: "ANDROID",
      }),
    WaitlistMappingError
  );
});

test("platform IOS is forwarded verbatim", () => {
  const result = mapWaitlistRequest({
    firstName: "Zanele",
    lastName: "Moyo",
    mobile: "+27820000003",
    email: "zanele@example.co.za",
    city: "Johannesburg",
    role: "homeowner",
    platform: "IOS",
  });
  assert.equal(result.platform, "IOS" satisfies WaitlistPlatform);
});

test("platform ANDROID is forwarded verbatim", () => {
  const result = mapWaitlistRequest({
    firstName: "Lungelo",
    lastName: "Dube",
    mobile: "+27820000004",
    email: "lungelo@example.co.za",
    city: "Cape Town",
    role: "tradesperson",
    platform: "ANDROID",
  });
  assert.equal(result.platform, "ANDROID" satisfies WaitlistPlatform);
});

test("missing platform throws WaitlistMappingError", () => {
  assert.throws(
    () =>
      mapWaitlistRequest({
        firstName: "X",
        lastName: "Y",
        mobile: "+27820000000",
        email: "x@example.co.za",
        city: "Johannesburg",
        role: "homeowner",
        // platform intentionally omitted
      }),
    WaitlistMappingError
  );
});

test("unknown platform value throws WaitlistMappingError", () => {
  assert.throws(
    () =>
      mapWaitlistRequest({
        firstName: "X",
        lastName: "Y",
        mobile: "+27820000000",
        email: "x@example.co.za",
        city: "Johannesburg",
        role: "homeowner",
        platform: "WINDOWS",
      }),
    WaitlistMappingError
  );
});
