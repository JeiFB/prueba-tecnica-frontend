export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // El password usualmente no se expone en el front-end
  createAt?: Date;
  updateAt?: Date;
  isActive?: boolean;
} 