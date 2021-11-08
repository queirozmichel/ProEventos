import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EventosComponent } from "./components/eventos/eventos.component";
import { PalestrantesComponent } from "./components/palestrantes/palestrantes.component";
import { NavComponent } from "./shared/nav/nav.component";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { ModalModule } from 'ngx-bootstrap/modal'
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxCurrencyModule } from "ngx-currency";
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { EventoService } from "./services/evento.service";
import { FormatarDataHoraPipe } from "./helpers/FormatarDataHora.pipe";
import { ContatosComponent } from "./components/contatos/contatos.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PerfilComponent } from "./components/user/perfil/perfil.component";
import { TituloComponent } from "./shared/titulo/titulo.component";
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { registerLocaleData } from "@angular/common";
import localePt from '@angular/common/locales/pt';
import { LoteService } from "./services/lote.service";


defineLocale('pt-br', ptBrLocale);
registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    TituloComponent,
    NavComponent,
    FormatarDataHoraPipe,
    EventoDetalheComponent,
    EventoListaComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    NgxCurrencyModule,
  ],
  providers: [EventoService, LoteService, {provide: LOCALE_ID, useValue: "pt"}], //injeção
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
