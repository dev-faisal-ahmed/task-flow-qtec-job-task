import { ReactNode } from 'react';

export type PriorityType = 'low' | 'medium' | 'high';

export type TodoType = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  date: number;
  priority: PriorityType;
};

export type WrapperType = {
  children: ReactNode;
};
