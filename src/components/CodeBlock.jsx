import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

export default function CodeBlock({ code, language = 'javascript', title }) {
  return (
    <div className="code-block">
      {title && <div className="code-block-title">{title}</div>}
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          borderRadius: title ? '0 0 8px 8px' : '8px',
          padding: '1.2rem',
          fontSize: '0.85rem',
          margin: 0,
        }}
        showLineNumbers
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
