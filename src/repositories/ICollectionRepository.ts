import {Collection} from "../entities/Collection";

export interface ICollectionRepository {
  findByUserId(userId: number): Promise<Array<Collection>>,
  findById(id: number): Promise<Collection>,
}
