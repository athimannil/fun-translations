import { ChangeEvent, useState } from "react";
import { Form } from "react-router";
import Select from "../../view/components/Select";
import Input from "../../view/components/Input";
import Button from "../../view/components/Button";
import type { Engine } from "domain/types/Engine";

interface TranslateFormProps {
  onTranslation?: (data: { text: string; engine: Engine }) => void;
}

export function TranslateForm({ onTranslation }: TranslateFormProps) {
  const [engine, setEngine] = useState<Engine>("yoda");
  const [text, setText] = useState("");

  const handleEngineChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEngine(e.target.value as Engine);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-4">
      <Form method="post" className="space-y-6">
        <div className="flex justify-end">
          <div className="w-64">
            <label
              htmlFor="engine"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Translation Engine
            </label>
            <Select
              id="engine"
              name="engine"
              value={engine}
              onChange={handleEngineChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="yoda">Yoda Speak</option>
              <option value="pirate">Pirate Speak</option>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="text"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Text to Translate
          </label>
          <Input
            id="text"
            name="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter the text you want to translate here..."
            className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            disabled={!text.trim()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:focus:ring-gray-300"
          >
            Translate
          </Button>
        </div>
      </Form>
    </div>
  );
}
