import { Component } from '@angular/core';
import { WeatherInterface } from "./interfaces/weather.interface";
import { WeatherService } from "./services/weather.service";

const MAX_WIDGET_WEATHER_COUNT = 5;


@Component({
	selector: 'app-root',templateUrl: './app.component.html',styleUrls: [ './app.component.scss' ],
})
export class AppComponent {
	widgetWeathersData: WeatherInterface[] = [];

	constructor(private weatherService: WeatherService) {
		this.updateWidgetData()
		this.widgetWeathersData = JSON.parse(localStorage.getItem('weatherWidgets') || '[]') as WeatherInterface[];
	}

	addWidgetWeather(newWeatherWidgetData: WeatherInterface) {
		if (this.widgetWeathersData.length < MAX_WIDGET_WEATHER_COUNT && !this.hasDuplicateWidgets(newWeatherWidgetData.name)) {
			this.widgetWeathersData.push(newWeatherWidgetData)
		}
		this.updateLocalStorage();
	}

	hasDuplicateWidgets(city: string) {
		return this.widgetWeathersData.some((widgetWeatherData => widgetWeatherData.name === city));
	}

	closeWidget(index: number) {
		this.widgetWeathersData.splice(index,1);
		this.updateLocalStorage();
	}

	updateWidgetData() {
		this.weatherService.$updateWeatherWidgetData(this.getCitesFromLocalStorage()).subscribe(res => {
			this.widgetWeathersData = res;
			this.updateLocalStorage();
		})
	}

	getCitesFromLocalStorage() {
		return (JSON.parse(localStorage.getItem('weatherWidgets') || '[]') as WeatherInterface[]).map(weatherData => weatherData.name);
	}

	updateLocalStorage() {
		localStorage.setItem('weatherWidgets',JSON.stringify(this.widgetWeathersData));
	}
}
