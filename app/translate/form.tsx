import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "view/components/Button";
import Input from "view/components/Input";
import YodaTranslationRepo from "io/repo/YodaTranslationRepo";

interface TranslateFormData {
  text: string;
}

interface TranslationResponse {
  success: { total: number };
  contents: {
    translated: string;
    text: string;
    translation: string;
  };
}

export function TranslateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TranslateFormData>();
  const [translation, setTranslation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: TranslateFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const repo = new YodaTranslationRepo();
      const response = await repo.getTranslation(data.text);
      const result = (await response.json()) as TranslationResponse;

      console.log("result =>", result);

      setTranslation(result.contents.translated);
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
            Translated Text:
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{translation}</p>
        </div>
      )}
    </div>
  );
}
