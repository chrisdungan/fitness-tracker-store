import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs-compat/add/operator/map';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';


@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private runningExcercise: Exercise;
    private availableExcercises: Exercise[] = [];
    private fbSubs: Subscription [] = [];

    constructor(private db: AngularFirestore, private uiService: UIService) {}

    fetchAvailableExercises() {
        this.uiService.loadingStateChanged.next(true);

        this.fbSubs.push(this.db
        .collection('availableExercises')
        .snapshotChanges()
        .map(docArray => {
            // throw(new Error());
            return docArray.map(doc => {
            const data = doc.payload.doc.data() as Exercise;
            const id = doc.payload.doc.id;
            return { id, ...data };
          });
        })
        .subscribe((exercises: Exercise[]) => {
            this.uiService.loadingStateChanged.next(false);
            this.availableExcercises = exercises;
            this.exercisesChanged.next([...this.availableExcercises]);
        }, error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
            this.exercisesChanged.next(null);
        }));
    }

    startExercise(exercise: Exercise) {
        this.runningExcercise = this.availableExcercises.find(ex => ex.id === exercise.toString());
        this.exerciseChanged.next({...this.runningExcercise});
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExcercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExcercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExcercise,
            duration: this.runningExcercise.duration * (progress / 100),
            calories: this.runningExcercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExcercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return {...this.runningExcercise };
    }

    fetchCompletedorCancelledExercises() {
        this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
        });
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
