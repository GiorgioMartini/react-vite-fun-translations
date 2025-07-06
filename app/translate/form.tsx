import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "view/components/Button";
import Input from "view/components/Input";
import { createDefaultFunTranslationService } from "io/service/FunTranslationService";
import type { Translation } from "domain/types/Translation";

interface TranslateFormData {
  text: string;
}

export function TranslateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TranslateFormData>();
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translationService = createDefaultFunTranslationService();

  const onSubmit = async (data: TranslateFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await translationService.getTranslation(data.text);
      setTranslation(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to translate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form className="contents" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col items-start gap-6 w-full">
          <Input
            {...register("text", { required: "Text is required" })}
            placeholder="Enter the text to translate here"
            error={errors.text?.message}
          />
          <Button type="submit" disabled={isSubmitting || isLoading}>
            {isLoading ? "Translating..." : "Translate"}
          </Button>
        </fieldset>
      </form>

      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

      {translation && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            Translated Text ({translation.engine}):
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {translation.text}
          </p>
        </div>
      )}
    </div>
  );
}
