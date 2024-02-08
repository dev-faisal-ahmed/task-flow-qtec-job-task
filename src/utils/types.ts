export type PriorityType = 'low' | 'medium' | 'high';

export type TodoType = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: PriorityType;
};
