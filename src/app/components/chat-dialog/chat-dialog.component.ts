import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat/chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css'],
})
export class ChatDialogComponent implements OnInit {
  constructor(private chat: ChatService) {}

  messages = [];
  formValue: string;
  suggestions = [];
  suggestionBlock = false;

  ngOnInit(): void {}

  sendMessage(value) {
    this.formValue = value ? value : this.formValue;
    if (this.formValue == 'Payment Link') {
      this.wait(5000);
      this.formValue = 'Yes';
    }
    const userMessage = new Message(this.formValue, 'user');
    this.messages.push(userMessage);

    this.chat.converse(this.formValue).then((res) => {
      this.formValue = '';

      console.log(res.result);
      const speech = res.result.fulfillment.speech;
      if (speech.includes('I am your travel planner')) {
        this.suggestions = [];
        this.suggestions.push('Book a flight');
        this.suggestions.push('Book a Room');
      } else if (
        speech.includes('flying from') ||
        speech.includes('provide destination')
      ) {
        this.suggestions = [];
        this.suggestions.push('Delhi');
        this.suggestions.push('Mumbai');
        this.suggestions.push('Bangalore');
        this.suggestions.push('Enter your choice');
      } else if (speech.includes('flying to')) {
        this.suggestions = [];
        this.suggestions.push('Delhi');
        this.suggestions.push('Mumbai');
        this.suggestions.push('Bangalore');
        this.suggestions.push('Enter your choice');
      } else if (
        speech.includes('book tickets for') ||
        speech.includes('when you want to book Room')
      ) {
        this.suggestions = [];
        this.suggestions.push('Today');
        this.suggestions.push('Tomorrow');
        this.suggestions.push('Friday');
        this.suggestions.push('Enter the date');
      } else if (speech.includes('Which class')) {
        this.suggestions = [];
        this.suggestions.push('Economy');
        this.suggestions.push('Business');
        this.suggestions.push('Enter your choice');
      } else if (
        speech.includes('want to select seat') ||
        speech.includes('Your tickets have been booked')
      ) {
        this.suggestions = [];
        this.suggestions.push('Yes');
        this.suggestions.push('No');
      } else if (speech.includes('complete payment')) {
        this.suggestions = [];
        this.suggestions.push('Payment Link');
      } else if (speech.includes('please select your seat')) {
        this.suggestions = [];
        this.suggestions = this.getSeats();
      } else if (speech.includes('available hotels')) {
        this.suggestions = [];
        let hotelString = speech.split(':');
        this.suggestions = hotelString[1].split(',');
      } else if (
        speech.includes('again') ||
        speech.includes('missed') ||
        speech.includes('What was')
      ) {
      } else {
        this.suggestions = [];
      }
      const botMessage = new Message(speech, 'bot');
      this.messages.push(botMessage);
    });
  }

  // update(msg: Message) {
  //   this.messages.push(msg);
  // }

  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  getSeats() {
    let seats = [];
    seats.push('A1');
    seats.push('A2');
    seats.push('A3');
    seats.push('A4');
    seats.push('A5');
    seats.push('A6');
    seats.push('B1');
    seats.push('B2');
    seats.push('B3');
    seats.push('B4');
    seats.push('B5');
    seats.push('B6');
    seats.push('C1');
    seats.push('C2');
    seats.push('C3');
    seats.push('C4');
    seats.push('C5');
    seats.push('C6');
    return seats;
  }
}

export class Message {
  constructor(public content: string, public sentBy: string) {}
}
