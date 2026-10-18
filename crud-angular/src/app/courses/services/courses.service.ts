import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' //fica disponível no contexto global
})
export class CoursesService {

  private readonly API:string = "api/courses";

  constructor(private _http: HttpClient) { }

  list(): Observable<Course[]> {
    return this._http
      .get<Course[]>(`${this.API}`)
      .pipe(
        first(),
        delay(2000), //simula um delay de 2 segundos
        tap(courses => console.log(courses))
      );
  }

  save(record: Course): Observable<Course> {
    return this._http
      .post<Course>(`${this.API}a`, record)
      .pipe(first());
  }
}
