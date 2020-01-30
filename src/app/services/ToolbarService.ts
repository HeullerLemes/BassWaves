import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToolbarService {

    constructor() { } 

    private changeToolbar$ = new BehaviorSubject<string>("");

    setChangeToolbar(color: string) {
        this.changeToolbar$.next(color);
    }

    get getChangeToolbar() {
        return this.changeToolbar$.asObservable();
    }
}