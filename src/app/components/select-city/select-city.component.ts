import { Component,EventEmitter,Output } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from "@angular/forms";
import { ApiWeatherService } from "../../services/api.weather.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { WeatherInterface } from "../../interfaces/weather.interface";



@Component({
	selector: 'app-select-city',
	templateUrl: './select-city.component.html',
	styleUrls: [ './select-city.component.css' ],
})

export class SelectCityComponent {
	@Output() addNweCity = new EventEmitter<WeatherInterface>()
	formCity!: FormGroup;
	weathersInfo: WeatherInterface[] = [];

	constructor(private fb: FormBuilder,private weatherService: ApiWeatherService,private _snackBar: MatSnackBar) {
		this.createForm();
	}

	createForm() {
		this.formCity = this.fb.group({
			city: [ null,Validators.required ]
		})
	}

	addNewCity() {
		const city = this.formCity.get('city')?.value;

		if (city) {
			this.weatherService.$getWeatherByCity(city).subscribe((res) => {
				this.addNweCity.emit(res)
			},(error) => {
				this._snackBar.open(error.message,'Close',{ duration: 3000 })
			})
		}

		this.formCity.reset();
	}
}
