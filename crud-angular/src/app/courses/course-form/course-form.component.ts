import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _coursesService: CoursesService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.form = this._formBuilder.group({
      name: [null],
      category: [null]
    });

  }

  ngOnInit(): void {
  }
  
  onSubmit() {
    console.log('Submitting...');
    if (this.form.valid) {
      console.log(this.form.value);
      this._coursesService
      .save(this.form.value)
      .subscribe({
        next: result => console.log(result),
        error: err => {
          console.warn(err);
          this.onError(err);
        }
      });
    }
  } 
  
  onCancel() {
    console.log('Canceling...');
    this.form.reset();
  }

  onError(err: Error) {
    this._snackBar.open(
      `Ocorreu um erro! Detalhe: ${ err.message }`, 
      '', 
      { duration: 5000 }
    );
    this.onCancel();
  }
}
