const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')

const getAllJobs = async (req, res) => {
const work = await Job.find({createdBy:req.user.userId}).sort('createdAt')
res.status(StatusCodes.OK).json({work,count:work.length})
    
}
const getJob = async (req, res) => {
const {user:{userId},params:{id:jobId}} = req
const work = await Job.findOne({
    _id:jobId,createdBy:userId
})
if (!work) {
    throw new NotFoundError(`no job with id ${jobId}`)
}
res.status(StatusCodes.OK).json({work})
}

const createJob = async (req, res) => {
req.body.createdBy = req.user.userId 
   
const work = await Job.create(req.body)
res.status(StatusCodes.CREATED).json({work})
}

const updateJob = async (req, res) => {
    const {
    body:{company,position},    
    user:{userId},
    params:{id:jobId}} = req

if (company === '' || position === '') {
    throw new BadRequestError('Company or Postion fields cannot be empty')
}
const work = await Job.findOneAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true, runValidators:true})

if (!work) {
    throw new NotFoundError(`no job with id ${jobId}`)
}

res.status(StatusCodes.OK).json({work})
}


const deleteJob = async (req, res) => {
  const {user:{userId},params:{id:jobId}} = req
  const work = await Job.findOneAndRemove({_id:jobId,createdBy:userId})
 
  if (!work) {
    throw new NotFoundError(`no job with id ${jobId}`)
 }

res.status(StatusCodes.OK).json({work})
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    
}