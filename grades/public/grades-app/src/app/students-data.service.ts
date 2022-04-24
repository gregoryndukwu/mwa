import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Student } from './students/students.component';

@Injectable({
  providedIn: 'root',
})
export class StudentDataService {
  baseUrl: string = 'http://localhost:3030/api';
  constructor(private http: HttpClient) {}

  public getStudents(): Observable<Student[]> {
    console.log('bengs');
    return this.http.get<Student[]>(this.baseUrl + '/students');
  }

  public deleteStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/student/' + studentId);
  }

  public getOne(studentId: string): Observable<Student> {
    console.log('get One ');
    return this.http.get<Student>(this.baseUrl + '/student/' + studentId);
  }
}
