import { BaseDocument, UserRole } from 'shared';

export interface UserEntity extends BaseDocument {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phoneNumber?: string;
  facultyProfile?: {
    employeeId?: string;
    department?: string;
    specialization?: string[];
    experience?: number; // years
    qualification?: string;
    joiningDate?: Date;
    isActive?: boolean;
  };
}
