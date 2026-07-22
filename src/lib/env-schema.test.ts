import { describe, expect, it } from "vitest";

import { parseDatabaseEnv } from "./env-schema";

const DATABASE_URL =
  "postgresql://user:password@example.com/neondb?sslmode=require";

describe("environment schemas", () => {
  it("allows database-only routes to initialize with only DATABASE_URL", () => {
    expect(
      parseDatabaseEnv({ DATABASE_URL }),
    ).toEqual({ DATABASE_URL });
  });
});
