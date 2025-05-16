// src/models/Question.ts

export interface Question {
  $id?: string; // Appwrite 自动生成的 ID（可选）
  title: string; // 题目标题
  content: string; // 题目内容或描述（可支持 markdown）
  tags?: string[]; // 可选标签（如 "React", "算法"）
  difficulty?: 'easy' | 'medium' | 'hard'; // 难度等级
  createdAt?: string; // 创建时间（可由 Appwrite 返回）
  updatedAt?: string; // 更新时间（可由 Appwrite 返回）
}
