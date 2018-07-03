import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UIService } from './../../shared/ui.service';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading = true;
  private exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UIService) { }

   ngOnInit() {

    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
       isLoading => {
         this.isLoading = isLoading;
       }
    );

    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
        exercises => {
          this.exercises = exercises;
        }
    );

    this.fetchExercises();
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }

    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    console.log(form);
    this.trainingService.startExercise(form.value.exercise);
  }
}
