import { useNavigation, Form } from "react-router";
import Button from "view/components/Button";
import Input from "view/components/Input";

export function TranslateForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="space-y-4">
      <Form className="contents" method="POST" action="/translate">
        <fieldset className="flex flex-col items-start gap-6 w-full">
          <select
            name="engine"
            defaultValue="yoda"
            className="w-full px-4 py-2 rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="yoda">Yoda</option>
            <option value="pirate">Pirate</option>
            <option value="minion">Minion</option>
          </select>

          <Input
            name="text"
            required
            placeholder="Enter the text to translate here"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Translating..." : "Translate"}
          </Button>
        </fieldset>
      </Form>
    </div>
  );
}
