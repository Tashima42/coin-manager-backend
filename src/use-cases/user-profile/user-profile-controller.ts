import {Request, Response} from "express";
import {IUserProfileResponseDTO} from "./user-profile-response-DTO";
import {UserProfileUseCase} from "./user-profile-use-case";

export class UserProfileController {
  constructor(private userProfileUseCase: UserProfileUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    try {
      const user = response.locals.authorizedUser
      const userProfile = await this.userProfileUseCase.execute(user)
      const responseDTO: IUserProfileResponseDTO = {userProfile}

      return response.status(200).json(responseDTO)
    } catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
