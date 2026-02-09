import { useState } from 'react';

export default function InteractiveExample({ title, description, children }) {
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="interactive-example">
      <div className="interactive-example__header">
        <h4>🧪 Try It: {title}</h4>
        <p>{description}</p>
      </div>
      <div className="interactive-example__playground">
        {children}
      </div>
    </div>
  );
}
