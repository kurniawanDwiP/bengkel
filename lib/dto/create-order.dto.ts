import { Type } from "class-transformer";
import { ArrayNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "./create-order-items.dto";

export class CreateOrderDto {
  @IsString()
  customer_name: string;
  @IsString()
  contact: string;
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
