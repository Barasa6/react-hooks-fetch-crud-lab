// QuestionForm.js
import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("answer")) {
      const index = Number(name.replace("answer", ""));
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newQuestion) => onAddQuestion(newQuestion));
  }

  return (
    <form className="QuestionForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="prompt"
        value={formData.prompt}
        onChange={handleChange}
        placeholder="Enter question prompt"
      />
      {formData.answers.map((a, i) => (
        <input
          key={i}
          type="text"
          name={`answer${i}`}
          value={a}
          onChange={handleChange}
          placeholder={`Answer ${i + 1}`}
        />
      ))}
      <select
        name="correctIndex"
        value={formData.correctIndex}
        onChange={handleChange}
      >
        {formData.answers.map((_, i) => (
          <option key={i} value={i}>
            {`Answer ${i + 1}`}
          </option>
        ))}
      </select>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
