const {Admin} = require('../models/admin')

module.exports = {
    getAllAdmin (req, res) {
        Admin.find()
        .exec()
        .then(admins => {
            res.status(200).json({
                message: 'List Admin',
                admins
            })
        })
    },
    addAdmin (req, res) {
        const {adminname, email, password} = req.body
        const admin = new Admin()
        admin.adminname = adminname
        admin.email = email
        admin.password = password
        admin.save()
        .then(adminData => {
            res.status(201).json({
                message: 'New Admin added',
                adminData
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed add new Admin',
                err
            })
        })
    },
    editAdmin (req, res) {
        Admin.findOneAndUpdate({_id : req.params._id}, {$set: req.body}, {upsert: true}, (err, r) => {
            if(err){
                res.status(400).json({
                    message: 'Edit failed',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'Edit successfull',
                    data: req.body
                })
            }
        })
    },
    deleteAdmin (req, res) {
        Admin.remove({_id : req.params._id}, (err, r) => {
            if(err){
                res.status(400).json({
                    message: 'Delete failed',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'Delete successfull'
                })
            }
        })
    }
}