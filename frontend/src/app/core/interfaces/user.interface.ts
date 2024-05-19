export interface CreateUserRequestDto {
  name: string;
  email: string;
  password: string;
}
export interface CreateUserResponseDto {
  id: number;
  name: string;
  email: string;
}

export interface UserResponseDto extends CreateUserResponseDto {}
