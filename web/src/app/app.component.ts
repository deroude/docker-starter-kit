import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Poem {
  title: string;
  author: string;
  stanzas: string[][];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) { }

  poem: Poem;

  ngOnInit() {
    this.http.get<Poem>('http://localhost:3000/random-poem').subscribe(poem => {
      this.poem = poem;
    });
  }
}
