// src/app/api/questions/route.ts

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

export async function GET() {
  const questionsWithPassword = readQuestions();
  const questions = questionsWithPassword.map((item) => ({ question: item.question }));
  return NextResponse.json(questions);
}