import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


export class AuthInterceptor implements HttpInterceptor {
  
  // intercepte une requête HTTP et vérifie s'il existe un token JWT dans le localStorage de l'utilisateur
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("jwt");
    
    // si token on clone la requête actuelle en lui ajoutant un headers authorization contenant le token
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set("authorization", token)
      });
      // et retourne la nouvelle requête
      return next.handle(authReq);
      // sinon on ne fait rien et retourne la requête initiale
    } else {
      return next.handle(req);
    }
  }
}
