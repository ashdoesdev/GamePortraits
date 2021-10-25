import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Games } from "../Model/Games";

@Injectable()
export class FetchDataService {
    constructor(private http: HttpClient) {}
    
    public getGamePortraits(): Observable<Games> {
        return this.http.get<Games>('assets/game-portraits.json');
    } 
}