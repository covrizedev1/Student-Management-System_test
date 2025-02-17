const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    //write your code
    const { userId, roleId, name } = req.query;
    const students = await getAllStudents({ userId, roleId, name });
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    //write your code
    const { name,
        gender,
        phone,
        email,
        dob,
        currentAddress,
        permanentAddress,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        systemAccess,
        section,
        admissionDate,
        roll
    } = req.body;

    const payload = {
        name,
        gender,
        phone,
        email,
        dob,
        currentAddress,
        permanentAddress,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        systemAccess,
        section,
        admissionDate,
        roll
    };
    const result = await addNewStudent(payload);
    res.json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    //write your code
    const { id: userId } = req.params;
    const payload = req.body;
    const message = await updateStudent({ ...payload, userId });
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    //write your code
    const payload = req.body;
    const { id: userId } = req.params;
    const { id: reviewerId } = req.user;
    const message = await setStudentStatus({ ...payload, userId, reviewerId });
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
