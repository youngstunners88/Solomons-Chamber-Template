#!/usr/bin/env bun
/**
 * Example Skill: Link Collector
 * 
 * Scans inbox for links and organizes them
 * 
 * Usage: bun examples/link-collector.ts
 */

import { Vault } from "../scripts/lib/vault.ts";

async function collectLinks(): Promise<void> {
  const vaultPath = process.env.VAULT_PATH || "/home/workspace/Solomons-Chamber-Template";
  const vault = new Vault(vaultPath);
  
  console.log("🔍 Scanning inbox for links...\n");
  
  const inbox = vault.readFolder("00-Inbox/");
  const links: Array<{url: string, source: string, context: string}> = [];
  
  const urlPattern = /https?:\/\/[^\s]+/g;
  
  for (const note of inbox) {
    const matches = note.content.matchAll(urlPattern);
    for (const match of matches) {
      const url = match[0];
      const context = note.content.substring(
        Math.max(0, match.index - 50),
        Math.min(note.content.length, match.index + url.length + 50)
      );
      
      links.push({ url, source: note.filename, context });
    }
  }
  
  if (links.length === 0) {
    console.log("📭 No links found in inbox");
    return;
  }
  
  // Organize by domain
  const byDomain: Record<string, typeof links> = {};
  for (const link of links) {
    try {
      const domain = new URL(link.url).hostname.replace("www.", "");
      if (!byDomain[domain]) byDomain[domain] = [];
      byDomain[domain].push(link);
    } catch {
      // Invalid URL, skip
    }
  }
  
  // Create organized note in Research
  let organizedContent = `# Link Collection\n\n*Auto-generated from Inbox scan*\n**Date:** ${new Date().toISOString().split("T")[0]}\n\n---\n\n`;
  
  for (const [domain, domainLinks] of Object.entries(byDomain)) {
    organizedContent += `## ${domain}\n\n`;
    for (const link of domainLinks) {
      organizedContent += `- [${link.url}](${link.url})\n  *From: ${link.source}*\n  "${link.context.trim()}"\n\n`;
    }
    organizedContent += "\n";
  }
  
  vault.createNote("02-Research/insights/", `Links-${Date.now()}`, organizedContent);
  
  console.log(`✅ Organized ${links.length} links from ${Object.keys(byDomain).length} domains`);
  console.log(`   Saved to: 02-Research/insights/`);
}

if (import.meta.main) {
  collectLinks();
}