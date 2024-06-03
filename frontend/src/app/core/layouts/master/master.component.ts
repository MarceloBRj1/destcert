import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { TodoStatusComponent } from '../../components/todostatus/todostatus.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TodoStatusComponent, FooterComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss'
})
export class MasterComponent {

}
