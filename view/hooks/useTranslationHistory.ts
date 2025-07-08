import { useEffect, useRef, useCallback, useState } from "react";
import type { Translation } from "domain/types/Translation";

export interface HistoryEntry {
  id: string;
  originalText: string;
  translation: Translation;
  timestamp: number;
}

const STORAGE_KEY = "translation-history";

export function useTranslationHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const lastEntryRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.warn("Failed to save translation history:", error);
    }
  }, [history]);

  const addToHistory = useCallback(
    (originalText: string, translation: Translation) => {
      // Create a unique key for this translation
      const entryKey = `${originalText}:${translation.text}`;

      // Only add if this is a new entry
      if (lastEntryRef.current !== entryKey) {
        setHistory((prev) => {
          const newEntry: HistoryEntry = {
            id: Date.now().toString(),
            originalText,
            translation,
            timestamp: Date.now(),
          };
          lastEntryRef.current = entryKey;
          return [newEntry, ...prev].slice(0, 50); // Keep last 50 translations
        });
      }
    },
    []
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    lastEntryRef.current = null;
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
  };
}
