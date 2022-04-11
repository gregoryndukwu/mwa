import { DE_Student } from "./DEStudent.js";
let jack = new DE_Student(1, "Jack", 3.0);
console.log(jack);
console.log(jack.getName(), "is enrolled in,", jack["course"]);
console.log(jack.getName(), "can you program?,", jack["canProgram"]);
if (jack["canProgram"]) {
    jack["program"]();
}
else {
    console.log("Don´t worry you will learn after this course");
}
