import { Component, OnInit } from '@angular/core';
import { JobDataService } from '../jobs-data.service';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  constructor(private jobsDataService: JobDataService) {}

  jobs: Job[] = [];

  ngOnInit(): void {
    this.getJobs();
  }
  getJobs() {
    this.jobsDataService.getJobs().subscribe((jobs) => {
      console.log(jobs);
      this.jobs = jobs;
    });
  }
  deleteJob(jobId: string) {
    let text = 'Press Ok To confirm \n or Cancel.';
    if (confirm(text) == true) {
      this.jobsDataService.deleteJob(jobId).subscribe((result) => {
        console.log(result);
        console.log('GAME DELETED !');
        this.getJobs();
      });
    } else {
      text = 'You canceled!';
      this.getJobs();
    }
  }
}

export class Skills {
  _id!: string;
  name!: string;
  level!: string;

  constructor(id: string, name: string, level?: string) {
    this._id = id;
    this.name = name;
    this.level = level ?? '';
  }
}

export class Job {
  _id!: string;
  title!: string;
  salary!: string;
  location!: string;
  description!: string;
  experience!: string;
  skills!: any[];
  postDate!: string;

  constructor(
    title: string,
    salary: string,
    location: string,
    description: string,
    experience: string,
    skills: any[],
    postDate: string,
    id?: string
  ) {
    this._id = id ?? '';
    this.title = title;
    this.salary = salary;
    this.location = location;
    this.description = description;
    this.experience = experience;
    this.skills = skills ?? [];
    this.postDate = postDate;
  }
}
