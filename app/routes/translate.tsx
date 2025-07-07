import type { Route } from "./+types/translate";
import { TranslateForm } from "../translate/form";
import Content from "view/components/Content";
import Sidepane from "view/components/Sidepane";
import { createYodaTranslationService } from "io/service/FunTranslationService";
import { withCaching } from "io/service/CacheService";
import TranslationHistory from "view/components/TranslationHistory";
import { useTranslationHistory } from "view/hooks/useTranslationHistory";
import {
  useActionData,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fun Translations - Yoda Speak" },
    { name: "description", content: "Translate your text into Yoda speak!" },
  ];
}

export const action = async ({ request }: { request: Request }) => {
  try {
    const formData = await request.formData();
    const text = formData.get("text");

    if (!text || typeof text !== "string") {
      throw new Error("Text is required");
    }

    // Create a cached version of the translation service
    const translationService = withCaching(createYodaTranslationService());
    const translation = await translationService.getTranslation(text);
    return { ok: true, translation, originalText: text };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to translate",
    };
  }
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <div>Status {error.status}</div>;
  }

  return <div>Something went wrong!</div>;
}

export default function Translate() {
  const result = useActionData<typeof action>();
  const { history, addToHistory, clearHistory } = useTranslationHistory();

  // Add successful translations to history
  useEffect(() => {
    if (result?.ok && result.translation && result.originalText) {
      addToHistory(result.originalText, result.translation);
    }
  }, [result, addToHistory]);

  return (
    <div className="flex h-full py-3">
      <Sidepane>
        <TranslationHistory history={history} onClear={clearHistory} />
      </Sidepane>
      <Content>
        <TranslateForm />
        {result?.ok === false && (
          <p className="mt-4 text-red-500 dark:text-red-400">{result.error}</p>
        )}
        {result?.ok && result.translation && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Translated Text ({result.translation.engine}):
            </h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {result.translation.text}
            </p>
          </div>
        )}
      </Content>
    </div>
  );
}
