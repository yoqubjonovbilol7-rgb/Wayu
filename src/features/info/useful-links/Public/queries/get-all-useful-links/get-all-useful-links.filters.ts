import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional} from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllUsefulLinksPublicFilters {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  page ;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsInt()

  size;
}