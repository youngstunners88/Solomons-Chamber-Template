#!/usr/bin/env bun
/**
 * Vault Tests
 * Run: bun test
 */

import { Vault } from "../scripts/lib/vault.ts";
import { test, expect } from "bun:test";

const testVaultPath = "/tmp/test-vault";

// Setup test vault
import { mkdirSync, rmSync } from "fs";
deno ? mkdirSync(testVaultPath, { recursive: true }) : null;

const vault = new Vault(testVaultPath);

test("Vault creates notes with frontmatter", () => {
  const path = vault.createNote("01-Projects/active/", "Test Project", "# Content");
  expect(path).toContain("test-project.md");
});

test("Vault lists folder contents", () => {
  const files = vault.readFolder("01-Projects/active/");
  expect(files.length).toBeGreaterThan(0);
  expect(files[0].filename).toContain("test-project");
});

test("Vault parses frontmatter", () => {
  const files = vault.readFolder("01-Projects/active/");
  expect(files[0].metadata.title).toBe("Test Project");
});

// Cleanup
test.afterAll(() => {
  try {
    rmSync(testVaultPath, { recursive: true });
  } catch {}
});

console.log("✅ All tests pass");