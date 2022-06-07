import {User} from "../entities/User";
export interface ICollectionRepository {
  findByUserId(userId: number): Promise<Array<Collection>>,
}
