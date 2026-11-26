import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import TestResult from "./TestResult";

export default function PlacementTest() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/api/test/questions")
            .then((res) => setQuestions(res.data.questions))
            .catch((err) => {
                console.error("Failed to load questions:", err);
                if (err.response?.status === 401) {
                    navigate("/login");
                }
            });
    }, []);

    const handleOptionSelect = (optionId) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [currentQuestion]: optionId,
        }));
    };

    const handleNext = () => {
        if (selectedOptions[currentQuestion] === undefined) return;

        const isLastQuestion = currentQuestion === questions.length - 1;

        if (isLastQuestion) {
            handleSubmit();
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            // Gather all answers in the format [{ question_id, option_id }, ...]
            const answers = [];
            questions.forEach((q, index) => {
                const answer = selectedOptions[index];
                if (answer !== undefined) {
                    answers.push({ question_id: q.id, option_id: answer });
                }
            });

            const res = await api.post("/api/test/submit", { answers });

            // Map the API response to the expected format for TestResult
            const mappedResult = {
                ...res.data,
                level: res.data.level,
                user: res.data.user || null,
            };

            setResult(mappedResult);
            setCurrentQuestion(questions.length); // Hide progress bar
        } catch (err) {
            console.error("Submit failed:", err);
            alert("Failed to submit test. Please try again.");
        }
    };

    const handleRestart = () => {
        setQuestions([]);
        setCurrentQuestion(0);
        setSelectedOptions({});
        setResult(null);
        navigate("/placement-test");
    };

    if (result) {
        return <TestResult result={result} onRestart={handleRestart} />;
    }

    if (questions.length === 0) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "50px",
                    color: "#6b7280",
                }}
            >
                Loading questions...
            </div>
        );
    }

    const q = questions[currentQuestion];
    const total = questions.length;
    const progress = (currentQuestion / total) * 100;

    return (
        <div>
            <header
                style={{
                    backgroundColor: "#111827",
                    color: "white",
                    padding: "1.5rem 2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                }}
            >
                <div>
                    <h1 style={{ margin: 0, fontSize: "1.3rem" }}>
                        Placement Test
                    </h1>
                    <p
                        style={{
                            margin: "0.5rem 0 0",
                            color: "#9ca3af",
                            fontSize: "0.9rem",
                        }}
                    >
                        {currentQuestion + 1} of {total} questions
                    </p>
                </div>
                <button
                    onClick={handleRestart}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#6b7280",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                    }}
                >
                    Start Over
                </button>
            </header>

            <main
                style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}
            >
                {/* Progress bar */}
                <div style={{ marginBottom: "2rem" }}>
                    <div
                        style={{
                            height: "8px",
                            backgroundColor: "#e5e7eb",
                            borderRadius: "4px",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                backgroundColor: "#3b82f6",
                                borderRadius: "4px",
                                width: `${progress}%`,
                                transition: "width 0.3s ease",
                            }}
                        />
                    </div>
                </div>

                <div
                    style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "2rem",
                    }}
                >
                    <h2
                        style={{
                            marginTop: 0,
                            marginBottom: "1.5rem",
                            fontSize: "1.2rem",
                        }}
                    >
                        {q.text}
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        {q.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleOptionSelect(option.id)}
                                style={{
                                    padding: "1rem 1.5rem",
                                    backgroundColor:
                                        selectedOptions[currentQuestion] ===
                                        option.id
                                            ? "#dbeafe"
                                            : "#f9fafb",
                                    color:
                                        selectedOptions[currentQuestion] ===
                                        option.id
                                            ? "#1d4ed8"
                                            : "#374151",
                                    border: `2px solid ${selectedOptions[currentQuestion] === option.id ? "#3b82f6" : "#e5e7eb"}`,
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    textAlign: "left",
                                    transition: "all 0.15s",
                                }}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>

                    {selectedOptions[currentQuestion] !== undefined && (
                        <button
                            onClick={handleNext}
                            style={{
                                marginTop: "1.5rem",
                                padding: "0.8rem 2rem",
                                backgroundColor: "#3b82f6",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "1rem",
                                fontWeight: 600,
                            }}
                        >
                            {currentQuestion === total - 1
                                ? "See Result"
                                : "Next Question"}
                        </button>
                    )}

                    {!selectedOptions[currentQuestion] &&
                        currentQuestion > 0 && (
                            <button
                                onClick={handlePrev}
                                style={{
                                    marginTop: "1rem",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#f3f4f6",
                                    color: "#374151",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                }}
                            >
                                Previous
                            </button>
                        )}
                </div>
            </main>

            <style>{`
        @media (max-width: 600px) {
          main { padding: 1rem; }
          header { padding: 1rem; }
        }
      `}</style>
        </div>
    );
}
