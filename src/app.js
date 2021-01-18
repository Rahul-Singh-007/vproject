const express = require('express');
const db = require('./db/connection');
const app = express();
const port = process.env.PORT|| 3000;


// it will recognise json data which is coming from body
app.use(express.json());
const Student = require("./models/students")

app.get('/' , (req, res) => {
    res.send("!! Home Page !!");
})
// Create a new students
app.post("/students" , (req, res) => {
    console.log(req.body);
    const user = new Student(req.body);
    //It will save data in databse
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });

})

// Read  the data of registered Students
app.get("/students" ,async (req, res) => {
    try {
    const studentsData = await Student.find();
        res.send(studentsData);
} catch (error) {
        res.send(e);
    }
})
// Get the individual students  data using id

app.get('/students/:id' ,async (req, res) => {
    try {
        const _id = req.params.id;
        // console.log(req.params.id);
       const studentData = await Student.findById({_id: _id});
        //or you can use object destructuring
        //const studentData = await Student.findById({_id});
        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }

    } catch (e) {
        res.send(e);
    }
} )

//update the students by it id

app.patch('/students/:id',async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id , req.body,{
                new : true
            } );
        res.send(updateStudents);
    } catch (e) {

        res.status(404).send(e);
    }
})

//delete the studenst by id

app.delete("/students/:id" , async  (req,res) => {
    try {
        const id = req.params.id;
       const deleteStudent =  await  Student.findByIdAndDelete(id);
        if(!deleteStudent){
            return res.status(400).send();

        }
        res.send(deleteStudent);
    } catch (e) {
        res.status(500).send(e);
    }
})
app.listen( port, () => {
    console.log(` Connection Done and port number is port ${port}`);

} )
