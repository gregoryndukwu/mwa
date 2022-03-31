const StudentData = require("../data/school.json");

let studentGetAll = function (req, res) {
    console.log("GET all Students");
    res.status(200).json(StudentData);
}

let getOne = (req, res) => {
    let studendId = parseInt(req.params.studentId, 10);
    console.log(studendId);

    if (studendId > StudentData.length -1 || studendId < 0) {
        res.status(404).json({'status':404,'data':'Not Found'});
    } else {
        res.status(200).json({ 'status': 200, 'data': StudentData[studendId]});
    }

};

module.exports = {
    getOne,
    studentGetAll
}
    


