import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidarCampos {
  static mustMatch(primeiroCampo: string, segundoCampo: string): any {
    return (grupo: AbstractControl) => {
      const formGroup = grupo as FormGroup;
      const controle = formGroup.controls[primeiroCampo];
      const controleMatch = formGroup.controls[segundoCampo];

      if (controleMatch.errors && !controleMatch.errors.mustMatch) {
        return null;
      }

      if (controle.value != controleMatch.value)
        controleMatch.setErrors({ mustMatch: true });
      else {
        controleMatch.setErrors(null);
      }
      return null;
    };
  }
}
