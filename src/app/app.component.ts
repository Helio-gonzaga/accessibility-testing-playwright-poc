import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  mensagem = '';
  cadastroRealizado = false;

  cadastroForm;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sexo: ['', Validators.required],
    });
  }

  cadastrar() {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      return;
    }

    const { nome, sobrenome } = this.cadastroForm.value;

    this.mensagem = `Cadastro realizado para ${nome} ${sobrenome}`;

    this.cadastroRealizado = true;
  }

  voltar() {
    this.cadastroRealizado = false;

    this.cadastroForm.reset();
  }
}
