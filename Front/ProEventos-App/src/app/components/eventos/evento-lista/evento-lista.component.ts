import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Evento } from "src/app/models/Evento";
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
  public eventosFiltrados: Evento[] = [];
  public larguraImagem: number = 180;
  public margemImagem: number = 2;
  public exibirImagem: boolean = true;
  private _filtroLista: string = "";
  public eventoId: number = 0;

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string }) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private rota: Router
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
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
    this.eventoService.getEventos().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
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
}
