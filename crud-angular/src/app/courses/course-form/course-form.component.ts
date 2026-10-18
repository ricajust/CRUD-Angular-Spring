import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this._formBuilder.group({ // pode ser aqui ou dentro do construtor | Estamos declarando e tipando
    // name: new FormControl<string>('', { nonNullable: true }), //pode ser assim ...
    // category: ['', { nonNullable: true }]// ... ou assim, mais simplificado ...
    name: [''], // ... ou vc pode usar a classe NonNullableFormBuilder que insere a validação automaticamente ...
    category: [''] // ... que deixa tudo mais simplificado
  });

  constructor(
    private _coursesService: CoursesService,
    private _formBuilder: NonNullableFormBuilder, 
    // private _formBuilder: FormBuilder, //Aqui a referência do comentário
    private _snackBar: MatSnackBar,
    private _location: Location,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    console.log('Submitting...');
    if (this.form.valid) {
      console.log(this.form.value);
      this._coursesService
      .save(this.form.value)
      .subscribe({
        next: () => this.onSuccess(),
        error: err => this.onError(err)
      });
    }
  } 
  
  onCancel() {
    this.form.reset();
    this._location.back();
  }

  onSuccess() {
    this._snackBar.open(
      'Curso salvo com sucesso!',
      '',
      { duration: 3000 }
    );
    this.onCancel();
  }

  onError(err: Error) {
    this.dialog.open(ErrorDialogComponent, {
      data: `Ocorreu um erro! Detalhe: ${ err.message }`
    });
    this.onCancel();
  }
}
