import { IsString, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
