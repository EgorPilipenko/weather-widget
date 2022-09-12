import { Injectable } from '@angular/core';
import { HttpEvent,HttpHandler,HttpInterceptor,HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

const API_KEY = '1890fcd579ac51bb12f42af3ceed6428'


@Injectable({
	providedIn: 'root'
})
export class ApiKeyInterceptorService implements HttpInterceptor {
	constructor() {
	}

	intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
		const authReq = req.clone({
			params: req.params.set('appid',API_KEY),
		});

		return next.handle(authReq);
	}
}
