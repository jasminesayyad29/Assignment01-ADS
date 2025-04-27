import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf and ngFor

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]  // Ensure CommonModule is imported
})
export class StudentformComponent implements OnInit {
  tables: string[] = [];
  selectedTable: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTables();
  }

  getTables() {
    this.http.get<string[]>('http://localhost:3000/tables')  // Explicitly define the response type as string[]
      .subscribe(
        response => {
          this.tables = response;
        },
        error => {
          alert('Error fetching tables: ' + error.message);
        }
      );
  }

  onSubmit(form: any) {
    const formData = {
      PRN: form.value.prn,
      FullName: form.value.name,
      Branch: form.value.branch,
      Phone: form.value.phone
    };

    this.http.post('http://localhost:3000/submit', formData, { responseType: 'text' })
      .subscribe(
        response => {
          alert('Data submitted successfully: ' + response);
          console.log(formData);
          location.reload();
        },
        error => {
          alert('Error submitting data: ' + error.message);
        }
      );
  }

  onTableSelect(table: string) {
    this.selectedTable = table;
  }
}
