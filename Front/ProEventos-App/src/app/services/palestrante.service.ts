import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { PaginatedResult } from "../models/Pagination";
import { Palestrante } from "../models/Palestrante";

@Injectable({
  providedIn: "root",
})
export class PalestranteService {
  constructor(private http: HttpClient) {}

  private baseURL = environment.apiURL + "api/palestrantes";

  public getPalestrantes(
    page?: number,
    itemsPerPage?: number,
    termo?: string
  ): Observable<PaginatedResult<Palestrante[]>> {
    const paginatedResult: PaginatedResult<Palestrante[]> = new PaginatedResult<
      Palestrante[]
    >();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page.toString());
      params = params.append("pageSize", itemsPerPage.toString());
    }

    if (termo != null && termo != "") {
      params = params.append("term", termo);
    }

    return this.http
      .get<Palestrante[]>(this.baseURL + "/all", {
        observe: "response",
        params,
      })
      .pipe(
        take(1),
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.has("Pagination")) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      ); // pipe().take(1) executa uma vez e se desinscreve
  }

  public getPalestrante(): Observable<Palestrante> {
    return this.http.get<Palestrante>(`${this.baseURL}`).pipe(take(1));
  }
  public postPalestrante(): Observable<Palestrante> {
    return this.http
      .post<Palestrante>(this.baseURL, {} as Palestrante)
      .pipe(take(1));
  }
  public putPalestrante(palestrante: Palestrante): Observable<Palestrante> {
    return this.http
      .put<Palestrante>(`${this.baseURL}`, palestrante)
      .pipe(take(1));
  }
}
