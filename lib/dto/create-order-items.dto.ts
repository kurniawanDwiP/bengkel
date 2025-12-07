import { IsNumber, IsUUID, Min } from "class-validator";

export class CreateOrderItemDto {
  @IsUUID()
  service_id: string;
  @IsNumber()
  @Min(1)
  quantity: number;
}
