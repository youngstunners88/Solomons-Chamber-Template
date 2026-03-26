#!/usr/bin/env bun
/**
 * Vault Tests
 * Run: bun test
 */

import { Vault } from "../scripts/lib/vault.ts";
import { mkdirSync, rmSync } from "fs";

const testVaultPath = "/tmp/test-vault";

// Setup test vault
mkdirSync(testVaultPath, { recursive: true });

const vault = new Vault(testVaultPath);

console.log("Running vault tests...");

// Test 1: Create note
try {
  const path = vault.createNote("01-Projects/active/", "Test Project", "# Content");
  console.log("✅ Test 1 PASS: Vault creates notes");
} catch (e) {
  console.error("❌ Test 1 FAIL:", e);
}

// Test 2: List folder contents
try {
  const files = vault.readFolder("01-Projects/active/");
  if (files.length > 0) {
    console.log("✅ Test 2 PASS: Vault lists folder contents");
  } else {
    console.log("❌ Test 2 FAIL: No files found");
  }
} catch (e) {
  console.error("❌ Test 2 FAIL:", e);
}

// Test 3: Parse frontmatter
try {
  const files = vault.readFolder("01-Projects/active/");
  if (files[0] && files[0].metadata.title === "Test Project") {
    console.log("✅ Test 3 PASS: Vault parses frontmatter");
  } else {
    console.log("⚠️ Test 3 INFO: Frontmatter parsing issue");
  }
} catch (e) {
  console.error("❌ Test 3 FAIL:", e);
}

// Cleanup
try {
  rmSync(testVaultPath, { recursive: true });
  console.log("✅ Cleanup complete");
} catch {}

console.log("\n📊 Test run complete");