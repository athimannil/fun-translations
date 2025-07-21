import { ChangeEvent, FormEvent, useState } from "react";
import Select from "../../view/components/Select";
import Input from "../../view/components/Input";
import Button from "../../view/components/Button";

export function TranslateForm() {
  const [engine, setEngine] = useState("yoda");
  const [text, setText] = useState("");

  const handleEngineChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEngine(e.target.value);
    console.log("Engine changed:", e.target.value);
  };
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    console.log("Text changed:", e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
              <option value="shakespeare">Shakespearean English</option>
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
            disabled={!text}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:focus:ring-gray-300"
          >
            Translate
          </Button>
        </div>
      </form>
    </div>
  );
}
