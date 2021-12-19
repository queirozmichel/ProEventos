import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { PaginatedResult, Pagination } from "src/app/models/Pagination";
import { Palestrante } from "src/app/models/Palestrante";
import { PalestranteService } from "src/app/services/palestrante.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-palestrante-lista",
  templateUrl: "./palestrante-lista.component.html",
  styleUrls: ["./palestrante-lista.component.scss"],
})
export class PalestranteListaComponent implements OnInit {
  termoBuscaChanged: Subject<string> = new Subject<string>();
  public palestrantes: Palestrante[] = [];
  public eventoId: number = 0;
  public pagination = {} as Pagination;

  constructor(
    private palestranteService: PalestranteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private rota: Router
  ) {}

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
    } as Pagination;
    this.carregarPalestrantes();
  }

  public filtrarPalestrantes(evt: any): void {
    if (this.termoBuscaChanged.observers.length == 0) {
      this.termoBuscaChanged.pipe(debounceTime(800)).subscribe((filtrarPor) => {
        this.spinner.show();
        this.palestranteService
          .getPalestrantes(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            filtrarPor
          )
          .subscribe({
            next: (paginatedResult: PaginatedResult<Palestrante[]>) => {
              this.palestrantes = paginatedResult.result;
              this.pagination = paginatedResult.pagination;
            },
            error: (error: any) => {
              this.spinner.hide();
              this.toastr.error("Erro ao carregar os eventos!", "Erro!");
            },
            complete: () => this.spinner.hide(),
          });
      });
    }
    this.termoBuscaChanged.next(evt.value);
  }

  public getImagemURL(imagemName: string): string {
    if (imagemName) {
      return environment.apiURL + `resources/perfil/${imagemName}`;
    } else {
      return "./assets/usuario.png";
    }
  }

  public carregarPalestrantes(): void {
    this.spinner.show();
    this.palestranteService
      .getPalestrantes(
        this.pagination.currentPage,
        this.pagination.itemsPerPage
      )
      .subscribe({
        next: (paginatedResult: PaginatedResult<Palestrante[]>) => {
          this.palestrantes = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error("Erro ao carregar os palestrantes!", "Erro!");
        },
        complete: () => this.spinner.hide(),
      });
  }
}
