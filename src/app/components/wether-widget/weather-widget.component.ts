import { Component,EventEmitter,Input,Output } from '@angular/core';
import { WeatherInterface } from "../../interfaces/weather.interface";

@Component({
	selector: 'app-weather-widget',
	templateUrl: './weather-widget.component.html',
	styleUrls: [ './weather-widget.component.scss' ]
})
export class WeatherWidgetComponent {
	@Input() weatherData!: WeatherInterface;
	@Output() closeWidget = new EventEmitter();

	closeWeatherWidget() {
		this.closeWidget.emit();
	}
}
