import {Request, Response} from "express";
import {IRegisterUserRequestDTO} from "./register-user-request-DTO";
import {IRegisterUserResponseDTO} from "./register-user-response-DTO";
import {RegisterUserUseCase} from "./register-user-use-case";

export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    const {name, username, password}: IRegisterUserRequestDTO = request.body

    try {
      const token = await this.registerUserUseCase.execute({
        name,
        username,
        password,
      })
      const authenticationToken: IRegisterUserResponseDTO = {
        type: "Bearer",
        token
      }
      return response.status(200).json(authenticationToken)
    } catch (error: any) {
      console.error(error)
      if (error.code === "UC-AU-001")
        return response.status(404).json({success: false, message: error.message})
      if (error.code === "UC-AU-002")
        return response.status(401).json({success: false, message: error.message})

      return response.status(500).json({success: false, message: "Unexpected error, contact the developers", stack: error.stack})
    }
  }
}
