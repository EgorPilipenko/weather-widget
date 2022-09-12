import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from "@angular/common/http";
import { WeatherInterface } from "../interfaces/weather.interface";
import { catchError,Observable,throwError } from "rxjs";


const API_KEY = '1890fcd579ac51bb12f42af3ceed6428'

@Injectable({
	providedIn: 'root'
})
export class ApiWeatherService {

	constructor(private http: HttpClient) {
	}

	public $getWeatherByCity(city: string): Observable<WeatherInterface> {
		return this.http.get<WeatherInterface>('https://api.openweathermap.org/data/2.5/weather',{
			params: {
				appid: API_KEY,
				q: city,
				lang: 'ru',
				units: 'metric'
			}
		}).pipe(catchError(this.handleError))
	}

	private handleError(error: HttpErrorResponse ){
		return throwError(()=>new Error(error.error.message))
	}
}
