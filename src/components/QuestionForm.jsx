import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useEffect } from "react";

const QuestionForm = ({ questions, setQuestions }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    const id = nanoid();

    const newQuestion = {
      id,
      title: data.title,
      difficulty: data.difficulty,
      category: data.category,
      status: "Pending",
    };

    setQuestions((prev) => [...prev, newQuestion]);
    reset();
  };

  const categories = ["DSA", "Git", "Technical"];
  const difficulties = ["Easy", "Medium", "Hard"];

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center">
      <div className="w-full max-w-2xl border border-gray-300 rounded-lg p-5 md:p-10">
        <h2 className="text-xl font-bold text-black sm:text-3xl pb-6">
          Add New Question
        </h2>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="w-full flex flex-col gap-4"
        >
          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
              Question title
            </label>
            <input
              {...register("title", {
                required: "Question title is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 charectors",
                },
              })}
              type="text"
              id="title"
              placeholder="e.g. Explain event delegation"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />

            {errors.title && (
              <p className="mt-2 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-1.5 block text-sm font-medium"
            >
              Category
            </label>

            <select
              {...register("category", {
                required: "Please select a category",
              })}
              id="category"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="mt-2 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="difficulty"
              className="mb-1.5 block text-sm font-medium"
            >
              Difficulty
            </label>

            <select
              {...register("difficulty", {
                required: "Please select a difficulty",
              })}
              id="difficulty"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>

            {errors.difficulty && (
              <p className="mt-2 text-sm text-red-600">
                {errors.difficulty.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white border-none rounded-lg px-3 py-3 mt-2 flex items-center justify-center cursor-pointer"
          >
            <Plus size={18} />
            <span>Add Question</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
