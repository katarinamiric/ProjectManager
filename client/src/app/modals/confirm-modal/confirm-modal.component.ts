import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  @Output() saveOrCancel = new EventEmitter();
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;
  result: boolean;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  

  save() {
    this.result = true;
    this.bsModalRef.hide();
  }

  cancel() {
    this.result = false;
    this.bsModalRef.hide();
  }





}
