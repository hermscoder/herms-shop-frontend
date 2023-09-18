import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidator {
    static notBlank(control: FormControl): ValidationErrors {
        if ((control.value != null) && (control.value.trim().length === 0)) {
            return { 'notBlank': true };
        }
        return {};
    }
}
