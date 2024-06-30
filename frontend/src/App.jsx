import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const payload = {
      language: 'cpp',
      code,
      input
    };

    try {
      const { data } = await axios.post('http://localhost:8000/run', payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="container mx-auto py-8 flex flex-col lg:flex-row items-stretch">
      {/* Left side: Compiler editor */}
      <div className="lg:w-1/2 lg:pr-4 mb-4 lg:mb-0">
        <h1 className="text-3xl font-bold text-white mb-3">QuickCode Studio</h1>
        <div className="editor-wrapper bg-gray-900 text-white shadow-md w-full mb-4 rounded-md">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.clike)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              backgroundColor: '#2d2d2d',
              color: '#f8f8f2',
            }}
          />
        </div>

        {/* Run button */}
        <button onClick={handleSubmit} type="button" className="w-24 mb-4 bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block align-middle me-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
          </svg>
          Run
        </button>
      </div>

      {/* Right side: Output and Input */}
      <div className="lg:w-1/2 lg:pl-4 pt-10 lg:pt-0 flex flex-col">
        {/* Output box */}
        <div className="bg-gray-900 text-white shadow-md p-4 rounded-md mb-4" style={{ height: '500px', overflowY: 'auto' }}>
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <div style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 12 }}>{output}</div>
        </div>

        {/* Input textarea */}
        <div className="bg-gray-900 text-white shadow-md p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Input</h2>
          <textarea
            rows='5'
            cols='15'
            value={input}
            placeholder='Input'
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;