import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  today: string|number|Date;
  value: string|number;
  text: string;

  // Agrega esta propiedad para almacenar el idioma actual
  currentLanguage: string = 'es';

  constructor(private translate: TranslateService) {
    this.today = new Date();
    this.value = 0;
    this.text = '';
    this.translate.use('en');
  }

  // Modifica este método para cambiar el idioma actual
  setLanguage(language: string) {
    this.currentLanguage = language;
    console.log(`Language set to: ${language}`);
  }

}
