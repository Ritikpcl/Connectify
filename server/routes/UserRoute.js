import express from 'express'
import { deleteUser, followUser, getAllUsers, getUser, unfollowUser, updateUser, getSearchedUser} from '../controllers/UserController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router()

router.get('/:id', getUser);
router.get('/search/:query', getSearchedUser)
router.get('/', getAllUsers)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.patch('/follow/:id',authMiddleWare, followUser)
router.patch('/unfollow/:id',authMiddleWare, unfollowUser)

export default router