const express = require("express")

const Todo = require("../models/todo.model")

const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        const todos = await Todo.find().lean().exec();

        return res.status(200).send(todos)
    } catch (error) {
        return res.status(401).send({message:error.message})
    }
})

router.post("/",async(req,res)=>{
    try {
        const todo = await Todo.create(req.body)

        return res.status(200).send(todo)
    } catch (error) {
        return res.status(401).send({message:error.message})
    }
})



router.get("/:id",async(req,res)=>{
    try {
        const todo = await Todo.findById(req.params.id).populate({
            path:userId,
            select : {fistName:1, lastName:1}
        }).lean().exec();

        return res.status(200).send(todo)
    } catch (error) {
        return res.status(401).send({message:error.message})
    }
})

router.patch("/:id",async(req,res)=>{
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec();

        return res.status(200).send(todo)
    } catch (error) {
        return res.status(401).send({message:error.message})
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(todo)
    } catch (error) {
        return res.status(401).send({message:error.message})
    }
})

module.exports = router;