export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface UpdateProfileInput {
  firstName: string;
  lastName: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}