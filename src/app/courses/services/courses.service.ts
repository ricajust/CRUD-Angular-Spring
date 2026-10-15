import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' //fica disponível no contexto global
})
export class CoursesService {

  private readonly API:string = "/assets/courses.json";

  constructor(private http: HttpClient) { }

  list() {
    return this.http
      .get<Course[]>(`${this.API}`)
      .pipe(
        first(),
        delay(2000), //simula um delay de 2 segundos
        tap(courses => console.log(courses))
      );
  }
}
