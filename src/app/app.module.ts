import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../app/components/chat/chat.service';

@NgModule({
  declarations: [AppComponent, ChatComponent, ChatDialogComponent],
  imports: [BrowserModule, CommonModule, FormsModule],
  providers: [ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
