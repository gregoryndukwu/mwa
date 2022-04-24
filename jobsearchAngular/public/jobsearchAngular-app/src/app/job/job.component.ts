import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job, JobsComponent } from '../jobs/jobs.component';
import { JobDataService } from '../jobs-data.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  job!: Job;

  constructor(
    private route: ActivatedRoute,
    private JobDataService: JobDataService
  ) {}

  ngOnInit(): void {
    console.log('I am here');
    const jobId = this.route.snapshot.params['jobId'];
    this.JobDataService.getOne(jobId).subscribe((job) => {
      this.job = job;

      console.log(job);

      console.log(this.job.title, this.job.salary);
    });
  }
}
