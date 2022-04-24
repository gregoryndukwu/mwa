import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../students-data.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  constructor(private studentDataService: StudentDataService) {}

  students: Student[] = [];
  ngOnInit(): void {
    console.log('Eis me aqui2323');
    this.getStudents();
    console.log('after');
  }

  getStudents() {
    console.log('to no ');
    this.studentDataService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }

  deleteStudent(studentId: string) {
    let text = 'Press Ok To confirm \n or Cancel.';
    if (confirm(text) == true) {
      this.studentDataService.deleteStudent(studentId).subscribe((result) => {
        console.log(result);
        console.log('GAME DELETED !');
        this.getStudents();
      });
    } else {
      text = 'You canceled!';
      this.getStudents();
    }
  }
}

export class Scores {
  _id!: string;
  type!: string;
  score!: string;

  constructor(id: string, type: string, score?: string) {
    this._id = id;
    this.type = type;
    this.score = score ?? '';
  }
}

export class Student {
  _id!: string;
  student_id!: string;
  scores!: any[];
  class_id!: string;

  constructor(
    student_id: string,
    class_id: string,
    scores?: any[],
    id?: string
  ) {
    this._id = id ?? '';
    this.student_id = student_id;
    this.class_id = class_id;
    this.scores = scores ?? [];
  }
}
