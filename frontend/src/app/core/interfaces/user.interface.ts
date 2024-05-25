export interface CreateUserRequestDto {
  username: string;
  email: string;
  password: string;
}
export interface CreateUserResponseDto {
  name: any;
  email: string;
  password: string;
}

export interface UserResponseDto extends CreateUserResponseDto {}
