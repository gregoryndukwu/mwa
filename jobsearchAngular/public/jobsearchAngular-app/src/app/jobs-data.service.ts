import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Job, JobsComponent } from './jobs/jobs.component';

@Injectable({
  providedIn: 'root',
})
export class JobDataService {
  baseUrl: string = 'http://localhost:5356/api';
  constructor(private http: HttpClient) {}

  public getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.baseUrl + '/job');
  }

  public getOne(jobId: string): Observable<Job> {
    console.log('get One Job');
    console.log(jobId);
    return this.http.get<Job>(this.baseUrl + '/Job/' + jobId);
  }
  public deleteJob(jobId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/job/' + jobId);
  }

  addOne(newOne: any) {
    const url: string = this.baseUrl + '/job/';
    return this.http.post(url, newOne);
  }
  addSkills(newSkills: any, jobId: string) {
    console.log(newSkills);

    const url: string = this.baseUrl + '/job/' + jobId + '/skills';
    return this.http.post(url, newSkills);
  }
  deleteSkills(skillId: any, jobId: string) {
    const url: string = this.baseUrl + '/job/' + jobId + '/skills/' + skillId;
    return this.http.delete(url);
  }
}
