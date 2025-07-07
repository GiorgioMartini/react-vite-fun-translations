import type { HistoryEntry } from "../hooks/useTranslationHistory";

interface TranslationHistoryProps {
  history: HistoryEntry[];
  onClear: () => void;
}

export default function TranslationHistory({
  history,
  onClear,
}: TranslationHistoryProps) {
  if (history.length === 0) {
    return <p className="text-gray-500">No translations yet.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Translation History</h2>
        <button
          onClick={onClear}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Clear
        </button>
      </div>
      <div className="space-y-3">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Original: {entry.originalText}
            </p>
            <p className="mt-1 text-sm font-medium">{entry.translation.text}</p>
            <p className="mt-1 text-xs text-gray-500">
              {new Date(entry.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
