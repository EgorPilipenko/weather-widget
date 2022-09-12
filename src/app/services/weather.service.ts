import { Injectable } from '@angular/core';
import { ApiWeatherService } from "./api.weather.service";
import { forkJoin } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class WeatherService {

	constructor(private weatherService: ApiWeatherService) {
	}

	$updateWeatherWidgetData(cites: string[]) {
		const weatherWidgetDataRequests = cites.map(city => this.weatherService.$getWeatherByCity(city));
		return forkJoin(weatherWidgetDataRequests);
	}
}
