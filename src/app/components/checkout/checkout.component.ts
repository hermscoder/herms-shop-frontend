import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { ShopValidator } from 'src/app/validators/shop-validator';
import { State } from 'src/app/common/state';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  creditCardMonths: number[] = []
  creditCardYears: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  checkoutFormGroup: FormGroup = this.buildCheckoutForm();

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder,
    private shopFormService: ShopFormService) { }

  ngOnInit(): void {
    this.shopFormService.getCreditCardMonths(1).subscribe(data => { this.creditCardMonths = data });
    this.shopFormService.getCreditCardYears().subscribe(data => { this.creditCardYears = data });
    this.shopFormService.getCountries().subscribe(data => this.countries = data);
  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value)

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    if (formGroupName == 'shippingAddress') {
      this.shopFormService.getStates(countryCode).subscribe(data => this.shippingAddressStates = data);
    } else {
      this.shopFormService.getStates(countryCode).subscribe(data => this.billingAddressStates = data);
    }
  }

  copyShippingAddressToBillingAddress(event: Event) {
    if ((<HTMLInputElement>event.target).checked) {
      this.checkoutFormGroup
        .controls
        .billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startingMonth: number = 1;
    if (currentYear == selectedYear) {
      startingMonth = new Date().getMonth() + 1;
    }
    this.shopFormService.getCreditCardMonths(startingMonth).subscribe(data => { this.creditCardMonths = data });

  }

  private buildCheckoutForm(): FormGroup {
    return this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidator.notBlank
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidator.notBlank
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ShopValidator.notBlank
        ])
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        cardName: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }
}
