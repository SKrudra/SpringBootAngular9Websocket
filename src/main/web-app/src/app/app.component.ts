import { WebSocketAPI } from './web-socket-api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SpringBoot Angular9 WebSocket';

  webSocketAPI: WebSocketAPI;
  greeting: string = 'sandeep';
  name: string;

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new AppComponent());
  }

  connect() {
    this.webSocketAPI.connect();
  }

  disconnect() {
    this.webSocketAPI.disconnect();
  }

  sendMessage() {
    this.webSocketAPI.send(this.name);
  }

  handleMessage(message) {
    console.log(message);
    this.greeting = JSON.parse(message).content;
    alert(this.greeting);
    this.greeting = 'Done';
  }
}


