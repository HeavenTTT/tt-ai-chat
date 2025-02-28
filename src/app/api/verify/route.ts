// src/app/api/verify/route.ts

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface QuestionWithPassword {
  question: string;
  password: string;
}

function readQuestions(): QuestionWithPassword[] {
  const filePath = path.join(process.cwd(), 'src/app/api/questions/questions.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}

export async function POST(request: Request) {
  const { question, password } = await request.json();
  const questions = readQuestions();

  const matchedQuestion = questions.find((q) => q.question === question);

  if (matchedQuestion && matchedQuestion.password === password) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}