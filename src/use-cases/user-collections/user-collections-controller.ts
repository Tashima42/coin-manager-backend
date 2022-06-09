import {Request, Response} from "express";
import {IUserCollectionsResponseDTO} from "./user-collections-response-DTO";
import {UserCollectionsUseCase} from "./user-collections-use-case";

export class UserCollectionsController {
  constructor(private userCollectionsUseCase: UserCollectionsUseCase) {}

  async handle(_: Request, response: Response): Promise<unknown> {
    try {
      const user = response.locals.authorizedUser
      const responseDTO = await this.userCollectionsUseCase.execute(user)

      return response.status(200).json(responseDTO)
    } catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
