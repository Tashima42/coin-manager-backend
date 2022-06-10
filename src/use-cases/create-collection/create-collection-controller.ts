import {Request, Response} from "express";
import {CreateCollectionUseCase} from "./create-collection-use-case";

export class CreateCollectionController {
  constructor(private createCollectionUseCase: CreateCollectionUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    try {
      const {name, description} = request.body
      const {id} = response.locals.authorizedUser
      await this.createCollectionUseCase.execute(name, description, id)

      return response.status(200).json({success: true})
    } catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
