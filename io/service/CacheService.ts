import type { Translation } from "domain/types/Translation";
import type { FunTranslationService } from "./FunTranslationService";
import fs from "fs";
import path from "path";

const CACHE_FILE = path.join(process.cwd(), "translation-cache.json");

// Simple file-based cache
const getCache = () => {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const content = fs.readFileSync(CACHE_FILE, "utf8");
      const entries = JSON.parse(content);
      return new Map<string, Translation>(Object.entries(entries));
    }
  } catch (e) {
    // Ignore file errors - start with empty cache
  }
  return new Map<string, Translation>();
};

const saveCache = (cache: Map<string, Translation>) => {
  try {
    const entries = Object.fromEntries(cache);
    fs.writeFileSync(CACHE_FILE, JSON.stringify(entries, null, 2));
  } catch (e) {
    // Ignore file errors - continue without persistence
  }
};

// Factory function that wraps any translation service with caching
export const withCaching = (
  service: FunTranslationService
): FunTranslationService => {
  const cache = getCache();

  return {
    getTranslation: async (text: string): Promise<Translation> => {
      const key = `${text}:${service.constructor.name}`;

      if (cache.has(key)) {
        console.log(`🎯 CACHE HIT for: "${text}"`);
        return cache.get(key)!;
      }

      console.log(`📡 CACHE MISS - calling service for: "${text}"`);
      const translation = await service.getTranslation(text);
      cache.set(key, translation);
      saveCache(cache);
      return translation;
    },
  };
};
