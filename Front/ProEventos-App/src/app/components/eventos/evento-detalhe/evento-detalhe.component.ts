import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { NgxSpinner, NgxSpinnerService, Spinner } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Evento } from "src/app/models/Evento";
import { Lote } from "src/app/models/Lote";
import { EventoService } from "src/app/services/evento.service";
import { LoteService } from "src/app/services/lote.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-evento-detalhe",
  templateUrl: "./evento-detalhe.component.html",
  styleUrls: ["./evento-detalhe.component.scss"],
})
export class EventoDetalheComponent implements OnInit {
  eventoId: number;
  formulario: FormGroup;
  evento = {} as Evento; //cria variável passando um objeto vazio
  novoEventoOuSalvarVelho = "post";
  modalRef: BsModalRef;
  loteAtual = { id: 0, nome: "", indice: 0 };
  imagemURL = "assets/upload.png";
  file: File;

  get f(): any {
    return this.formulario.controls;
  }

  get lotes(): FormArray {
    return this.formulario.get("lotes") as FormArray;
  }

  get modoEditar(): boolean {
    return this.novoEventoOuSalvarVelho == "put";
  }

  constructor(
    private fb: FormBuilder,
    private rotaAtiva: ActivatedRoute,
    private eventoService: EventoService,
    private loteService: LoteService,
    private efeitoToaster: ToastrService,
    private efeitoSpinner: NgxSpinnerService,
    private rota: Router,
    private modalService: BsModalService
  ) {}

  public carregarEvento(): any {
    this.eventoId = +this.rotaAtiva.snapshot.paramMap.get("id");
    if (this.eventoId != null && this.eventoId != 0) {
      this.novoEventoOuSalvarVelho = "put";
      this.eventoService.getEventoById(this.eventoId).subscribe({
        next: (evento: Evento) => {
          this.evento = { ...evento }; //...spread
          this.formulario.patchValue(this.evento);
          if (this.evento.imagemURL != "") {
            this.imagemURL =
              environment.apiURL + "resources/images/" + this.evento.imagemURL;
          }
          this.carregarLotes();
        },
        error: (error: any) => {
          this.efeitoToaster.error("Erro ao tentar carregar o evento!");
          console.error(error);
        },
        complete: () => {},
      });
    }
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarEvento();
  }

  public validacao(): void {
    this.formulario = this.fb.group({
      tema: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      local: ["", Validators.required],
      dataEvento: ["", Validators.required],
      qtdPessoas: ["", [Validators.required, Validators.max(120000)]],
      telefone: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      imagemURL: [""],
      lotes: this.fb.array([]),
    });
  }

  public addLote(): void {
    this.lotes.push(this.criarLote({ id: 0 } as Lote));
  }

  public criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio, Validators.required],
      dataFim: [lote.dataFim, Validators.required],
    });
  }

  public resetarForm(): void {
    this.formulario.reset();
  }

  public cssValidacao(campo: FormControl | AbstractControl | null): any {
    return { "is-invalid": campo?.errors && campo.touched };
  }

  public salvarEvento(): void {
    this.efeitoSpinner.show();
    if (this.formulario.valid) {
      if (this.novoEventoOuSalvarVelho == "post") {
        this.evento = { ...this.formulario.value };
        this.eventoService.postEvento(this.evento).subscribe({
          next: (eventoRetorno: Evento) => {
            this.efeitoToaster.success("Evento salvo com sucesso!", "Sucesso!");
            this.rota.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
          },

          error: (error: any) => {
            console.error(error);
            this.efeitoSpinner.hide();
            this.efeitoToaster.error(
              "Ocorreu um erro ao tentar salvar o evento!",
              "Erro!"
            );
          },
          complete: () => this.efeitoSpinner.hide(),
        });
      } else {
        this.evento = { id: this.evento.id, ...this.formulario.value };
        this.eventoService.putEvento(this.evento.id, this.evento).subscribe({
          next: () =>
            this.efeitoToaster.success("Evento salvo com sucesso!", "Sucesso!"),
          error: (error: any) => {
            console.error(error);
            this.efeitoSpinner.hide();
            this.efeitoToaster.error(
              "Ocorre um erro ao tentar salvar o evento!",
              "Erro!"
            );
          },
          complete: () => this.efeitoSpinner.hide(),
        });
      }
    }
  }
  public salvarLotes(): void {
    if (this.formulario.controls.lotes.valid) {
      this.efeitoSpinner.show();
      this.loteService
        .saveLote(this.eventoId, this.formulario.value.lotes)
        .subscribe({
          next: () => {
            this.efeitoToaster.success("Lotes salvos com sucesso!", "Sucesso!");
          },
          error: (error: any) => {
            console.error(error);
            this.efeitoSpinner.hide();
            this.efeitoToaster.error(
              "Ocorre um erro ao tentar salvar lotes!",
              "Erro!"
            );
          },
          complete: () => {
            this.efeitoSpinner.hide();
            // this.carregarLotes();
            // this.rota.navigateByUrl()
            this.rota.navigate([`/eventos/lista`]);
          },
        });
    }
  }

  public carregarLotes(): void {
    this.loteService.getLotesByEventosId(this.eventoId).subscribe({
      next: (lotesRetorno: Lote[]) => {
        lotesRetorno.forEach((lote) => {
          this.lotes.push(this.criarLote(lote));
        });
      },
      error: (error: any) => {
        console.error(error);
        this.efeitoToaster.error(
          "Ocorre um erro ao carregar os lotes!",
          "Erro!"
        );
      },
      complete: () => this.efeitoSpinner.hide(),
    });
  }

  public removerLote(template: TemplateRef<any>, indice: number): void {
    this.loteAtual.id = this.lotes.get(indice + ".id").value;
    this.loteAtual.nome = this.lotes.get(indice + ".nome").value;
    this.loteAtual.indice = indice;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  public confirmDeleteLote(): void {
    this.modalRef.hide();
    this.efeitoSpinner.show();
    this.loteService.deleteLote(this.eventoId, this.loteAtual.id).subscribe({
      next: () => {
        this.efeitoToaster.success(
          `Lote (${this.loteAtual.nome}) deletado com sucesso!`,
          "Sucesso"
        );
        this.lotes.removeAt(this.loteAtual.indice);
      },
      error: (error: any) => {
        this.efeitoToaster.error(
          `Erro ao deletar o lote ${this.loteAtual.id}`,
          "Erro"
        );
      },
      complete: () => this.efeitoSpinner.hide(),
    });
  }

  public retornaTituloLote(nomeLote: string): string {
    return nomeLote == null || nomeLote == "" ? "Nome do lote" : nomeLote;
  }

  public declineDeleteLote(): void {
    this.modalRef.hide();
  }

  public onFileChange(ev: any): void {
    const reader = new FileReader();
    reader.onload = (evento: any) => (this.imagemURL = evento.target.result);
    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);
    this.uploadImagem();
  }

  public uploadImagem(): void {
    this.efeitoSpinner.show();
    this.eventoService.postUpload(this.eventoId, this.file).subscribe({
      next: () => {
        // this.rota.navigate([`eventos/detalhe/${this.eventoId}`]);
        this.carregarEvento();
        this.efeitoToaster.success("Imagem atualizada com sucesso!", "Sucesso");
      },
      error: (error: any) => {
        this.efeitoToaster.error("Erro ao carregar a imagem!", "Erro");
        console.log(error);
        this.efeitoSpinner.hide();
      },
      complete: () => this.efeitoSpinner.hide(),
    });
  }
}
