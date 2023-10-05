import { expect, describe, test } from 'bun:test';

describe('Demo test', () => {
  test("2 + 2", () => {
    expect(2 + 2).toBe(4);
  });
});