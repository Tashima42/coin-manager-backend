import {UserProfileUseCase} from "./user-profile-use-case";
import {UserProfileController} from "./user-profile-controller";

const userProfileUseCase = new UserProfileUseCase()

const userProfileController = new UserProfileController(userProfileUseCase)

export {userProfileController}
