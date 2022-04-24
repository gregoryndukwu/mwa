import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../students/students.component';
import { StudentDataService } from '../students-data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  student!: Student;

  constructor(
    private route: ActivatedRoute,
    private studentsDataService: StudentDataService
  ) {}

  ngOnInit(): void {
    console.log('I am Here');
    const studentId = this.route.snapshot.params['studentId'];
    this.studentsDataService.getOne(studentId).subscribe((student) => {
      this.student = student;
      console.log(student);
    });
  }
}
