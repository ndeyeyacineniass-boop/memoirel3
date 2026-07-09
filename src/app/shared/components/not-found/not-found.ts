import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      this.router.url
    );
  }
}
