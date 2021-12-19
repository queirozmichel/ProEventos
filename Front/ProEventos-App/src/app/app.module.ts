import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EventosComponent } from "./components/eventos/eventos.component";
import { PalestrantesComponent } from "./components/palestrantes/palestrantes.component";
import { NavComponent } from "./shared/nav/nav.component";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { ModalModule } from "ngx-bootstrap/modal";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ToastrModule } from "ngx-toastr";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { NgxCurrencyModule } from "ngx-currency";
import { defineLocale } from "ngx-bootstrap/chronos";
import { ptBrLocale } from "ngx-bootstrap/locale";
import { TabsModule } from "ngx-bootstrap/tabs";

import { EventoService } from "./services/evento.service";
import { FormatarDataHoraPipe } from "./helpers/FormatarDataHora.pipe";
import { ContatosComponent } from "./components/contatos/contatos.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PerfilComponent } from "./components/user/perfil/perfil.component";
import { TituloComponent } from "./shared/titulo/titulo.component";
import { EventoDetalheComponent } from "./components/eventos/evento-detalhe/evento-detalhe.component";
import { EventoListaComponent } from "./components/eventos/evento-lista/evento-lista.component";
import { UserComponent } from "./components/user/user.component";
import { LoginComponent } from "./components/user/login/login.component";
import { RegistrationComponent } from "./components/user/registration/registration.component";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import { LoteService } from "./services/lote.service";
import { AccountService } from "./services/account.service";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { HomeComponent } from "./components/home/home.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { PerfilDetalheComponent } from "./components/user/perfil/perfil-detalhe/perfil-detalhe.component";
import { PalestranteListaComponent } from "./components/palestrantes/palestrante-lista/palestrante-lista.component";
import { PalestranteDetalheComponent } from "./components/palestrantes/palestrante-detalhe/palestrante-detalhe.component";
import { RedesSociaisComponent } from "./components/redesSociais/redesSociais.component";

defineLocale("pt-br", ptBrLocale);
registerLocaleData(localePt, "pt");

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    PalestranteListaComponent,
    PalestranteDetalheComponent,
    RedesSociaisComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    PerfilDetalheComponent,
    TituloComponent,
    NavComponent,
    FormatarDataHoraPipe,
    EventoDetalheComponent,
    EventoListaComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
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
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      progressBar: true,
    }),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    NgxCurrencyModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [
    AccountService,
    EventoService,
    LoteService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "pt" },
  ], //injeção
  bootstrap: [AppComponent],
})
export class AppModule {}
