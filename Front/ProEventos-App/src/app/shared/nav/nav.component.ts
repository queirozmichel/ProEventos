import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  constructor(public accountService: AccountService, private rota: Router) {}

  ngOnInit(): void {}

  logout() { 
    window.location.reload();   
    this.accountService.logout();
    // this.rota.navigateByUrl("/user/login");    
  }

  mostrarMenu(): boolean {
    return this.rota.url != "/user/login";
  }
}
