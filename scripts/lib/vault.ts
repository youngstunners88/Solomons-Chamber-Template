/**
 * Vault Manager — Core interface to the vault
 * Handles all file operations safely
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";

export class Vault {
  private basePath: string;
  
  constructor(basePath: string) {
    this.basePath = basePath;
    if (!existsSync(basePath)) {
      throw new Error(`Vault not found: ${basePath}`);
    }
  }
  
  /**
   * Create a new markdown note
   */
  createNote(folder: string, title: string, content: string): string {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const filename = `${dateStr}-${title.toLowerCase().replace(/\s+/g, "-")}.md`;
    const folderPath = join(this.basePath, folder);
    const fullPath = join(folderPath, filename);
    
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
    }
    
    const noteContent = `---
created: ${now.toISOString()}
title: ${title}
---

${content}`;
    
    writeFileSync(fullPath, noteContent, "utf8");
    return fullPath;
  }
  
  /**
   * Read all notes in a folder
   */
  readFolder(folder: string): Array<{filename: string, content: string, metadata: any}> {
    const folderPath = join(this.basePath, folder);
    if (!existsSync(folderPath)) return [];
    
    const files = readdirSync(folderPath)
      .filter(f => f.endsWith(".md"))
      .map(filename => {
        const content = readFileSync(join(folderPath, filename), "utf8");
        const metadata = this.parseFrontmatter(content);
        return { filename, content, metadata };
      });
    
    return files;
  }
  
  /**
   * Parse YAML frontmatter from markdown
   */
  private parseFrontmatter(content: string): any {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};
    
    const frontmatter = match[1];
    const metadata: any = {};
    
    frontmatter.split("\n").forEach(line => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length > 0) {
        metadata[key.trim()] = valueParts.join(":").trim();
      }
    });
    
    return metadata;
  }
  
  /**
   * Move note from one folder to another
   */
  moveNote(filename: string, fromFolder: string, toFolder: string): void {
    const fromPath = join(this.basePath, fromFolder, filename);
    const toFolderPath = join(this.basePath, toFolder);
    const toPath = join(toFolderPath, filename);
    
    if (!existsSync(fromPath)) {
      throw new Error(`File not found: ${fromPath}`);
    }
    
    if (!existsSync(toFolderPath)) {
      mkdirSync(toFolderPath, { recursive: true });
    }
    
    const content = readFileSync(fromPath, "utf8");
    writeFileSync(toPath, content, "utf8");
    
    // In production: delete from source
    // require('fs').unlinkSync(fromPath);
  }
}

// CLI usage
if (import.meta.main) {
  const vault = new Vault(process.env.VAULT_PATH || "/home/workspace/Solomons-Chamber-Template");
  console.log("Vault initialized at:", vault["basePath"]);
}