import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { addJoke } from "#/serverActions/jokesActions";

export default function JokeForm() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await addJoke({
        data: { question, answer },
      });

      //   Clear Form
      setQuestion("");
      setAnswer("");

      //   Refresh data
      router.invalidate();
    } catch (err) {
      setError("Failed to add joke: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mb-8" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}
      <div className="flex flex-col sm:flow-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Joke Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1 py-4"
          required
        />
        <input
          type="text"
          placeholder="Joke Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1 py-4"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Joke"}
        </button>
      </div>
    </form>
  );
}
