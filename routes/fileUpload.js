import express from 'express'
import { imageReducer, imageUpload, localFileUpload, videoUpload } from '../controller/fileUpload.js';

const router = express.Router();

router.get('/', (req, res)=>{
    res.send('<h1>Hello, this is a dummy page</h1>')
})
router.post('/localFileUpload', localFileUpload)
router.post('/imageUpload', imageUpload)
router.post('/videoUpload',videoUpload)
router.post('/imageReducer',imageReducer)

export default router