import { ReactNode } from 'react';

export type PriorityType = 'low' | 'medium' | 'high';
export type FilterParamsType =
  | PriorityType
  | 'normal'
  | 'completed'
  | 'incompleted';

export type TodoType = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  addedOn: number;
  priority: PriorityType;
};

export type WrapperType = {
  children: ReactNode;
};
