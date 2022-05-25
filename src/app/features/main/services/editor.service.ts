import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EditorService {
  private _tactCode$ = new BehaviorSubject<string>('');

  private _funcCode$ = new BehaviorSubject<string>('');

  public tactCode$ = this._tactCode$.asObservable();

  public funcCode$ = this._funcCode$.asObservable();

  public get tactCode(): string {
    return this._tactCode$.getValue();
  }

  public get funcCode(): string {
    return this._funcCode$.getValue();
  }

  public set tactCode(value: string) {
    this._tactCode$.next(value);
  }

  constructor() {}
}
