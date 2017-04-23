import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { IMyOptions } from 'mydatepicker';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public myDatePickerOptions: IMyOptions = {
        dateFormat: 'mm/dd/yyyy',
        inline: false,
        height: '34px',
        width: '260px',
    };

  searchForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }
              
  priceFromErrorMsg = '';
  priceToErrorMsg = '';

  ngOnInit() {
    this.searchForm = this.fb.group({
      dateFrom: [],
      dateTo: [],
      inStock:[],
      priceFrom:[,this.priceValidator],
      priceTo:[,this.priceValidator],
      color:[]
    });

    this.searchForm.valueChanges.subscribe(
      (data) => {
        let queryParams = {};

        data.dateFrom ? queryParams['dateFrom'] = data.dateFrom.formatted : '';
        data.dateTo ? queryParams['dateTo'] = data.dateTo.formatted : '';  
        data.inStock ? queryParams['inStock'] = data.inStock : '';
        data.priceFrom ? queryParams['priceFrom'] = data.priceFrom : '';  
        data.priceTo ? queryParams['priceTo'] = data.priceTo : '';
        data.color ?  queryParams['color'] = data.color : '';

        if (this.searchForm.valid) {
          this.priceFromErrorMsg = '';
          this.priceToErrorMsg = '';
          this.router.navigate(['query'], { queryParams: queryParams , relativeTo: this.route});
        } else {
          let priceFrom = this.searchForm.controls.priceFrom;
          let priceTo = this.searchForm.controls.priceTo;

          if (priceFrom.errors && priceFrom.errors.minValueError) {
            this.priceFromErrorMsg ="'Price from' must be > 0";
          }

          if (priceTo.errors && priceTo.errors.minValueError) {
            this.priceToErrorMsg ="'Price to' must be > 0";
          }

        }

      });

  }

  private priceValidator(control: FormControl) : {[s:string]: boolean} {

    if (control.value !== null  && +control.value < 0.01) {
      return {'minValueError': true}
    }

    return null;
  }

}
