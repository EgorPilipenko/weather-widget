import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from "@angular/material/slider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { WeatherWidgetComponent } from './components/wether-widget/weather-widget.component';
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS,HttpClient,HttpClientModule } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Overlay } from "@angular/cdk/overlay";
import { SelectCityComponent } from './components/select-city/select-city.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ApiKeyInterceptorService } from "./interceptor/api-key-interceptor.service";

@NgModule({
	declarations: [ AppComponent,WeatherWidgetComponent,SelectCityComponent ],
	imports: [ BrowserModule,BrowserAnimationsModule,MatSliderModule,MatToolbarModule,MatIconModule,MatButtonModule,MatInputModule,ReactiveFormsModule,HttpClientModule,MatProgressSpinnerModule ],
	providers: [ HttpClient,MatSnackBar,Overlay, {
		provide: HTTP_INTERCEPTORS,
		useClass: ApiKeyInterceptorService,
		multi: true,
	}, ],
	bootstrap: [ AppComponent ]
})
export class AppModule {
}
