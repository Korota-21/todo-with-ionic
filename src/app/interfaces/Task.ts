export interface Task {
  id: string;
  parentTaskId: string | null;
  title: string;
  description: string;
  dueDate?: string;
  remender: boolean;
  category: Categories;
  priority: 'low' | 'high' | 'normal';
  state: 'done' | 'current' | 'late';
};

export enum Categories {
  personal = 'Personal',
  work = 'Work',
};
