"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  question: string;
}

export default function Password() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchData();
  }, []);

  const handleVerifyPassword = async () => {
    if (!selectedQuestion) return;

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: selectedQuestion, password }),
      });

      const data = await response.json();
      setVerificationResult(data.success);

      if (data.success) {
        localStorage.setItem('passwordVerified', 'true');
        router.push('/');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      setVerificationResult(false);
    }
  };

  return (
    <div>
      <h1>问题</h1>
      <select onChange={(e) => setSelectedQuestion(e.target.value)}>
        <option value="">选择问题</option>
        {questions.map((item) => (
          <option key={item.question} value={item.question}>
            {item.question}
          </option>
        ))}
      </select>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="输入密码"
      />
      <button onClick={handleVerifyPassword}>验证密码</button>
      {verificationResult !== null && (
        <p>{verificationResult ? '密码正确' : '密码错误'}</p>
      )}
    </div>
  );
}