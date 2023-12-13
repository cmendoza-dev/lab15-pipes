import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {

  @Input() currentLanguage: string = 'es';
  profileForm!: FormGroup;
  enviado = false;
  resultados: { nombre: string, pipe: string, resultado: string }[] = [];

  constructor(private fb: FormBuilder) {
    this.iniciarFormulario();
  }

  private iniciarFormulario() {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      pipe: ['', Validators.required],
    });
  }

  aplicarPipe(valor: string, tipoPipe: string): string {
    const pipes: { [key: string]: (v: string) => string } = {
      capitalizado: (v: string) => this.capitalizePipe(v),
      uppercase: (v: string) => v.toUpperCase(),
      lowercase: (v: string) => v.toLowerCase(),
      slide2: (v: string) => this.slidePipe(v, 2),
      // Agrega más pipes según tus necesidades
    };

    if (pipes[tipoPipe]) {
      return pipes[tipoPipe](valor);
    } else {
      return valor;
    }
  }

  private slidePipe(valor: string, cantidad: number): string {
    return valor.slice(0, cantidad);
  }

  private capitalizePipe(valor: string): string {
    return valor
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  

  onSubmit() {
    this.enviado = true;
    if (this.profileForm.valid) {
      const nombre = this.profileForm.value.nombre;
      const pipe = this.profileForm.value.pipe;
      const resultado = this.aplicarPipe(nombre, pipe);

      // Agrega el resultado a la lista
      this.resultados.push({ nombre,  pipe, resultado });
    }
  }
}
