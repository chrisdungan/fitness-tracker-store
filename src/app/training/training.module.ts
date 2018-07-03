import { NgModule } from '@angular/core';

import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
// import { AngularFirestoreModule } from 'angularfire2/firestore';



@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
    CurrentTrainingComponent
  ],
  imports: [
    SharedModule,
    // AngularFirestoreModule,
    TrainingRoutingModule
  ],
  entryComponents: [StopTrainingComponent] // Components that are instantianted neither by template selector nor by routing.
                                              // i.e. modal dialog components - tells Angular "be prepared to use it..."
})
export class TrainingModule { }
