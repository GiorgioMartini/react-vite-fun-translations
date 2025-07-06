import { useNavigation } from "react-router";
import Button from "view/components/Button";
import Input from "view/components/Input";

export function TranslateForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="space-y-4">
      <form className="contents" method="POST" action="/translate">
        <fieldset className="flex flex-col items-start gap-6 w-full">
          <Input
            name="text"
            required
            placeholder="Enter the text to translate here"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Translating..." : "Translate"}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
