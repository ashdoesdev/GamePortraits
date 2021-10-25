import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class SharedObservablesService {
    private _sendRefreshSubject = new BehaviorSubject<boolean>(false);
    public sendRefreshObservable$ = this._sendRefreshSubject.asObservable();

    public sendRefresh(value: boolean): void {
        this._sendRefreshSubject.next(value);
    }

    private _setImageInputSubject = new BehaviorSubject<string>('');
    public setImageInputObservable$ = this._setImageInputSubject.asObservable();

    public setImageInput(value: string): void {
        this._setImageInputSubject.next(value);
    }
}