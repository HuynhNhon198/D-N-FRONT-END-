import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private message: NzMessageService
  ) { }

  createMessage(mess: string, type: string, duration?: number): void {
    this.message.create(type, mess, {nzDuration: duration || 2000});
  }

  createLoadingMessage(message?: string, close?: boolean): void {
    if (close) {
      this.message.remove();
    } else {
      this.message.loading(message || '', { nzDuration: 0 });
    }
  }
}
