import { NextResponse } from "next/server";

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export class ApiResponseBuilder<T> {
  private success: boolean = true;
  private message: string = "";
  private data?: T;
  private statusCode: number = 200;

  static ok<T>(message: string, data?: T, status = 200) {
    return new ApiResponseBuilder<T>()
      .setSuccess(true)
      .setMessage(message)
      .setData(data)
      .setStatus(status)
      .build();
  }

  static fail<T>(message: string, data?: T, status = 400) {
    return new ApiResponseBuilder<T>()
      .setSuccess(false)
      .setMessage(message)
      .setData(data)
      .setStatus(status)
      .build();
  }

  setSuccess(success: boolean) {
    this.success = success;
    return this;
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setData(data?: T) {
    this.data = data;
    return this;
  }

  setStatus(status: number) {
    this.statusCode = status;
    return this;
  }

  build() {
    return NextResponse.json(
      {
        success: this.success,
        message: this.message,
        data: this.data,
      },
      { status: this.statusCode },
    );
  }
}
