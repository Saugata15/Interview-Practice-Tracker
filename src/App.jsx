import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import QuestionForm from "./components/QuestionForm";

const App = () => {
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("questions")) || [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    difficulty: "All",
    status: "All",
  });

  return (
    <div>
      <Dashboard />
      <QuestionForm setQuestions={setQuestions} questions={questions} />
    </div>
  );
};

export default App;
