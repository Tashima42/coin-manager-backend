import {Router} from "express";

import {authenticateUserController} from "./use-cases/authenticate-user";
import {authorizeUserMiddleware} from "./use-cases/authorize-user";
import {userCollectionsController} from "./use-cases/user-collections"
import {userProfileController} from "./use-cases/user-profile";
import {getCollectionController} from "./use-cases/get-collection";
import {getListingsController} from "./use-cases/get-listings";
import {getCoinsController} from "./use-cases/get-coins";
import {getCollectionCoinsController} from "./use-cases/get-collection-coins"
import {addCoinToCollectionController} from "./use-cases/add-coin-to-collection";

const router = Router()


// Register routes from controllers declared on use-cases
router.get('/', (_, res) => res.status(200).json({success: true}))
router.post('/user/authenticate', (req, res) => authenticateUserController.handle(req, res))

router.use((req, res, next) => authorizeUserMiddleware.handle(req, res, next))
router.get('/authenticated', (req, res) => res.status(200).json({success: true, authorizedUser: req.body.authorizedUser}))
router.get('/user/collection/all', (req, res) => userCollectionsController.handle(req, res))
router.get('/user', (req, res) => userProfileController.handle(req, res))
router.get('/collection/:id', (req, res) => getCollectionController.handle(req, res))
router.get('/listing/all', (req, res) => getListingsController.handle(req, res))
router.get('/coin/all', (req, res) => getCoinsController.handle(req, res))
router.get('/collection/:id/coin/all', (req, res) => getCollectionCoinsController.handle(req, res))
router.post('/collection/:collection_id/coin/:coin_id', (req, res) => addCoinToCollectionController.handle(req, res))

export {router}
