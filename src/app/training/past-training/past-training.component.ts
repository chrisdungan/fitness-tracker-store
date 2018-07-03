import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { Subscription } from 'rxjs';
import { TrainingService } from './../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exerciseChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) pageinator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
        console.log('past ', exercises);
    });
    this.trainingService.fetchCompletedorCancelledExercises();
  }

  ngOnDestroy(): void {
    if (this.exerciseChangedSubscription) {
      this.exerciseChangedSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.pageinator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
