import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material'; // A token object that Angular uses under the hood
                                                        // to contain the data that we pass into the dialog modal
                                                            // the data object that we create in the modal caller
                                                                // see parent component dialog.open()...

@Component({
    selector: 'app-stop-training',
    template: `<h1 mat-dialog-title>Are you sure dude?</h1>
                <mat-dialog-content>
                    <p>You already did {{ passedData.progress }}%</p>
                </mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-button [mat-dialog-close]="true" >Yes</button>
                    <button mat-button [mat-dialog-close]="false">No</button>
                </mat-dialog-actions>
                `
})
export class StopTrainingComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { } // Give me the tokenized data and store it in the passedData property
}

