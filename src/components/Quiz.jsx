import { useState } from 'react';

export default function Quiz({ questions }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  const handleSelect = (index) => {
    if (showAnswer) return;
    setSelected(index);
  };

  const handleCheck = () => {
    if (selected === null) return;
    setShowAnswer(true);
    if (selected === q.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz">
        <div className="quiz__result">
          <div className="quiz__result-icon">
            {percent >= 80 ? '🎉' : percent >= 50 ? '👍' : '📚'}
          </div>
          <h3>Quiz Complete!</h3>
          <p className="quiz__score">
            You got <strong>{score}</strong> out of <strong>{questions.length}</strong> correct ({percent}%)
          </p>
          <p className="quiz__message">
            {percent >= 80
              ? 'Excellent! You understand this topic well!'
              : percent >= 50
              ? 'Good job! Review the parts you missed.'
              : "Don't worry! Re-read the section above and try again."}
          </p>
          <button className="btn btn--primary" onClick={handleRestart}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz__header">
        <span className="quiz__badge">🧩 Quiz</span>
        <span className="quiz__progress">
          Question {currentQ + 1} of {questions.length}
        </span>
      </div>
      <div className="quiz__question">
        <h4>{q.question}</h4>
      </div>
      <div className="quiz__options">
        {q.options.map((option, i) => {
          let className = 'quiz__option';
          if (selected === i) className += ' quiz__option--selected';
          if (showAnswer && i === q.correct) className += ' quiz__option--correct';
          if (showAnswer && selected === i && i !== q.correct) className += ' quiz__option--wrong';
          return (
            <button key={i} className={className} onClick={() => handleSelect(i)}>
              <span className="quiz__option-letter">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          );
        })}
      </div>
      {showAnswer && (
        <div className={`quiz__explanation ${selected === q.correct ? 'quiz__explanation--correct' : 'quiz__explanation--wrong'}`}>
          <strong>{selected === q.correct ? '✅ Correct!' : '❌ Not quite!'}</strong>
          <p>{q.explanation}</p>
        </div>
      )}
      <div className="quiz__actions">
        {!showAnswer ? (
          <button className="btn btn--primary" onClick={handleCheck} disabled={selected === null}>
            Check Answer
          </button>
        ) : (
          <button className="btn btn--success" onClick={handleNext}>
            {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
