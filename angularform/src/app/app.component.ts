import { Component } from '@angular/core';
import { StudentformComponent } from './studentform/studentform.component';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  imports: [FormsModule, StudentformComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angularform';
}
