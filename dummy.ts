import { Component,ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-start-end',
  template: `
    <br>
    <br>
    <nz-date-picker 
    [nzDisabledTime]="disabledDateStartTime"
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      (ngModelChange)="onStartChange($event)"
      [(ngModel)]="startValue"
      nzPlaceHolder="Start"
      (nzOnOpenChange)="handleStartOpenChange($event)" >
    </nz-date-picker>
    <br>
    <br>
    <nz-date-picker
      [nzDisabledDate]="disabledEndDate"
      [nzDisabledTime]="disabledDateEndTime"
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      [nzOpen]="endOpen"
      [(ngModel)]="endValue"
      (ngModelChange)="onEndChange($event)"
      nzPlaceHolder="End"
      (nzOnOpenChange)="handleEndOpenChange($event)"
      (nzOnOk)="clickedOk($event)"
      (click)="endOpen=true"
      >
    </nz-date-picker>
  `,
  styles: [
    `
      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  startValue: Date | null = null;
  endValue: Date | null = null;
  endOpen: boolean = false;
  disabledStartHours: number = null;
  disabledStartMinutes: number = null;
  disabledStartSeconds: number = null;
  disabledEndHours: number = null;
  disabledEndMinutes: number = null;
  disabledEndSeconds: number = null;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(){}

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDateStartTime = (value): object => {
    let defaultHourStart = 24;
    let defaultMinuteStart = 60;
    let defaultSecStart = 60;
    this.disabledStartHours = this.endValue ? this.endValue.getHours()+1 : 24;
    this.disabledStartMinutes = this.endValue ? this.endValue.getMinutes()+1 : 60;
    this.disabledStartSeconds = this.endValue ? this.endValue.getSeconds() : 60;
    //console.log("############## ",value.getDate());
    if(value){
      // console.log(value.getDate());
      // console.log(this.endValue);
      if(this.endValue){
        // console.log("this.endValue ",this.endValue);
        if(value.getDate() === this.endValue.getDate()){
          // console.log("both dates are equal ");
          if ((this.startValue ? this.startValue.getHours() : 0) === (this.endValue ? this.endValue.getHours() : 0)) {
            //  console.log("end hour equal ");
             defaultHourStart = 24;
             defaultMinuteStart = 60;
             this.disabledStartHours = this.endValue ? this.endValue.getHours()+1 : 24;
             this.disabledStartMinutes = this.endValue ? this.endValue.getMinutes()+1 : 60;
             this.disabledStartSeconds = this.endValue ? this.endValue.getSeconds() : 60;
            if ((this.startValue ? this.startValue.getMinutes() : 0) === (this.endValue ? this.endValue.getMinutes() : 0)) {
              // console.log("inside minutes equal condition ");
              defaultSecStart = 60;
            } else {
              defaultHourStart = 24;
              this.disabledStartSeconds = 60;
              defaultSecStart = 60;
            }
          } else {
            // console.log("end hour  NOT equal ");
            this.disabledStartMinutes = 60;
            this.disabledStartSeconds = 60;
            defaultHourStart = 24;
            defaultMinuteStart = 60;
            defaultSecStart = 60;
          }
        } else {
          this.disabledStartHours =  24;
          this.disabledStartMinutes =  60;
          this.disabledStartSeconds =  60;
        }
      }
      
    
    // console.log("this.disabledStartHours ", this.disabledStartHours);
    // console.log("this.disabledEndMinutes ", this.disabledStartMinutes);
    // console.log("this.disabledEndSeconds ", this.disabledStartSeconds);
    return {
      nzDisabledHours: () => this.range(0, 24).splice(this.disabledStartHours,defaultHourStart),
      nzDisabledMinutes: () => this.range(this.disabledStartMinutes,defaultMinuteStart),
      nzDisabledSeconds: () => this.range(this.disabledStartSeconds,defaultSecStart)
    };
  }
  };

  disabledDateEndTime = (value): object => {
    let defaultHourStart = 24;
    let defaultMinuteStart = 60;
    let defaultSecStart = 60;
    this.disabledEndHours = this.startValue ? this.startValue.getHours() : 0;
    this.disabledEndMinutes = this.startValue ? this.startValue.getMinutes() : 60;
    this.disabledEndSeconds = this.startValue ? this.startValue.getSeconds() + 1 : 60;
    //console.log("############## ",value.getDate());
    if(value){
      // console.log(value.getDate());
      // console.log(this.startValue.getDate());
      if(value.getDate() === this.startValue.getDate()){
        // console.log("both dates are equal ");
        if ((this.startValue ? this.startValue.getHours() : 0) === (this.endValue ? this.endValue.getHours() : 0)) {
          //  console.log("end hour equal ");
           defaultHourStart = 0;
           defaultMinuteStart = 0;
           this.disabledEndHours = this.startValue ? this.startValue.getHours() : 0;
           this.disabledEndMinutes = this.startValue ? this.startValue.getMinutes() : 60;
           this.disabledEndSeconds = this.startValue ? this.startValue.getSeconds() + 1 : 60;
          if ((this.startValue ? this.startValue.getMinutes() : 0) === (this.endValue ? this.endValue.getMinutes() : 0)) {
            // console.log("inside minutes equal condition ");
            defaultSecStart = 0;
          } else {
            defaultHourStart = 0;
            this.disabledEndSeconds = 60;
            defaultSecStart = 60;
          }
        } else {
          // console.log("end hour  NOT equal ");
          this.disabledEndMinutes = 60;
          this.disabledEndSeconds = 60;
          defaultHourStart = 0;
          defaultMinuteStart = 60;
          defaultSecStart = 60;
        }
      }
    
    // console.log("this.disabledEndMinutes ", this.disabledEndMinutes);
    // console.log("this.disabledEndSeconds ", this.disabledEndSeconds);
    return {
      nzDisabledHours: () => this.range(0, 24).splice(defaultHourStart, this.disabledEndHours),
      nzDisabledMinutes: () => this.range(defaultMinuteStart, this.disabledEndMinutes),
      nzDisabledSeconds: () => this.range(defaultSecStart, this.disabledEndSeconds)
    };
  }
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
    
    console.log('handleStartOpenChange', open, this.endOpen);
  }

  handleEndOpenChange(open: boolean): void {
    console.log("end open ",open);
    this.endOpen = !this.endOpen;
    console.log('handleEndOpenChange', open, this.endOpen);
    
  }

  clickedOk(status){
    //this.endOpen = !this.endOpen;
    console.log("clicked ob btn ",status);

  }

  
  onStartChange(date: Date): void {
    console.log('changed ', this.startValue?this.startValue.getDate():null, date.getDate());
    if(this.startValue && this.endValue){
      let oldValue:number = this.startValue.getDate()
      let dateDiff = date.getDate() - oldValue;
      
      console.log('Date Difference is : ',this.endValue.setDate(this.endValue.getDate() + dateDiff));
      console.log('new Date is : ',);
      console.log('end value ',this.endValue);
    }
    this.startValue = date;
    
  }

  onEndChange(date: Date): void {
    
    this.endValue = date;
    this.cd.detectChanges();
  }
}
