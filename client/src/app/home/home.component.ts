import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;
  @Output() progress = new EventEmitter();
  bsModalRef: BsModalRef;


  constructor( private modalService: BsModalService, public accountService: AccountService) { }

  ngOnInit(): void {

    document.body.className = "selector";
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
    
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

  openConfirmModal(){
    const config = {
      class: 'modal-dialog-centered'
    };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, config);
    this.bsModalRef.content.subscribe(p => {
      if(p){
        this.modalService.hide();
        return;
      }

    })
  }

}
