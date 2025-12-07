import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export async function validateDto(dto, body) {
  const instance = plainToInstance(dto, body);
  const error = await validate(instance, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (error.length > 0) {
    const messages = error.map((err) => ({
      property: err.property,
      constraints: err.constraints,
    }));
    throw {
      status: 400,
      error: messages,
    };
  }

  return instance;
}
