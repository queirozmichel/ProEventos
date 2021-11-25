import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Evento } from "src/app/models/Evento";
import { PaginatedResult, Pagination } from "src/app/models/Pagination";
import { EventoService } from "src/app/services/evento.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-evento-lista",
  templateUrl: "./evento-lista.component.html",
  styleUrls: ["./evento-lista.component.scss"],
})
export class EventoListaComponent implements OnInit {
  modalRef?: BsModalRef;
  public eventos: Evento[] = []; //array de objetos
  public larguraImagem: number = 150;
  public margemImagem: number = 2;
  public exibirImagem: boolean = true;
  public eventoId: number = 0;
  public pagination = {} as Pagination;
  termoBuscaChanged: Subject<string> = new Subject<string>();

  public filtrarEventos(evt: any): void {
    if (this.termoBuscaChanged.observers.length == 0) {      
      this.termoBuscaChanged.pipe(debounceTime(800)).subscribe(
        filtrarPor =>{
          this.spinner.show();
          this.eventoService.getEventos(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            filtrarPor
          ).subscribe({
            next: (paginatedResult: PaginatedResult<Evento[]>) => {
              this.eventos = paginatedResult.result;
              this.pagination = paginatedResult.pagination;
            },
            error: (error: any) => {
              this.spinner.hide();
              this.toastr.error("Erro ao carregar os eventos!", "Erro!");
            },
            complete: () => this.spinner.hide(),
          }) 
        }
      )      
    }
    this.termoBuscaChanged.next(evt.value); 
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private rota: Router
  ) {}

  public ngOnInit(): void {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
    } as Pagination;
    this.carregarEventos();
  }

  public exibirOcultarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public mostraImagem(imagemURL: string): string {
    return imagemURL != ""
      ? `${environment.apiURL}resources/images/${imagemURL}`
      : "assets/semImagem.png";
  }

  public carregarEventos(): void {
    this.spinner.show();
    this.eventoService
      .getEventos(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (paginatedResult: PaginatedResult<Evento[]>) => {
          this.eventos = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error("Erro ao carregar os eventos!", "Erro!");
        },
        complete: () => this.spinner.hide(),
      });
  }

  public openModal(
    event: any,
    template: TemplateRef<any>,
    eventoId: number
  ): void {
    this.eventoId = eventoId;
    event.stopPropagation();
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  public confirm(): void {
    this.spinner.show();
    this.modalRef?.hide();
    this.eventoService.deleteEvento(this.eventoId).subscribe({
      next: (resultado: any) => {
        console.log(resultado);
        this.toastr.success("E evento foi deletado com sucesso!", "Deletado!");
        this.spinner.hide();
        this.carregarEventos();
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error(
          `Erro ao tentar deletar o evento ${this.eventoId}`,
          "Erro"
        );
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  public decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void {
    this.rota.navigate([`eventos/detalhe/${id}`]);
  }

  public pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.carregarEventos();
  }
}