# Angular Accessibility Testing POC with Playwright and Axe Core

## Sobre a POC

Esta POC (Proof of Concept) foi criada com o objetivo de estudar e validar estratégias modernas de testes automatizados de acessibilidade em aplicações Angular utilizando Playwright e Axe Core.

O principal foco deste projeto é simular um cenário muito comum em aplicações enterprise e arquiteturas de microfrontend, onde não existe navegação tradicional utilizando Angular Router. Em vez disso, a aplicação realiza troca de telas dinamicamente utilizando apenas controle de renderização com `ngIf`.

A ideia é validar como ferramentas modernas de automação E2E conseguem testar acessibilidade mesmo em aplicações que:

- Não possuem rotas reais
- Utilizam renderização dinâmica
- Trabalham com troca de componentes em runtime
- Simulam navegação através de estados internos
- Possuem fluxo semelhante a microfrontends corporativos

Além disso, esta POC também serve para explorar:

- Testes automatizados WCAG
- Integração entre Playwright e Axe Core
- Testes E2E focados em acessibilidade
- Navegação por teclado
- Estrutura semântica HTML
- Estratégias futuras utilizando MCP + IA para geração automática de testes

---

# Tecnologias utilizadas

- Angular 19
- Playwright
- Axe Core
- TypeScript
- Reactive Forms

---

# Fluxo da aplicação

A aplicação possui 2 telas principais.

## 1. Tela de formulário

Tela inicial contendo:

- Título e subtítulo
- Formulário reativo
- Campos:
  - Nome
  - Sobrenome
  - E-mail
  - Sexo

- Botão de cadastro
- Validações acessíveis

### Recursos de acessibilidade implementados

- Labels associados aos inputs
- Navegação por teclado
- Focus visível
- `aria-describedby`
- `role="status"`
- Estrutura HTML semântica

---

## 2. Tela de sucesso

Após o envio do formulário:

- O formulário desaparece
- Uma nova tela é exibida via `ngIf`
- Exibe mensagem de sucesso
- Possui botão para retornar ao formulário

Esse fluxo foi criado propositalmente para simular aplicações sem roteamento tradicional.

---

# Estrutura do projeto

```txt
src/
 └── app/
      ├── app.component.html
      ├── app.component.ts
      └── app.component.css

tests/
 └── accessibility/
      └── home.a11y.spec.ts

playwright-report/
test-results/
```

---

# Instalação

## Instalar dependências

```bash
npm install
```

---

## Instalar navegadores do Playwright

```bash
npx playwright install
```

---

# Executando a aplicação

```bash
npm start
```

Aplicação disponível em:

```txt
http://localhost:4200
```

---

# Executando testes

## Rodar todos os testes E2E

```bash
npm run e2e
```

---

## Rodar somente testes de acessibilidade

```bash
npm run a11y
```

Esse comando executa os testes em `tests/accessibility` usando Playwright com Axe Core.

O `playwright.config.ts` já está configurado com:

- `baseURL: http://localhost:4200`
- `webServer` executando `npm run start`
- `reuseExistingServer` habilitado fora do CI

Na prática, você pode rodar `npm run a11y` diretamente. O Playwright sobe a aplicação Angular automaticamente caso ela ainda não esteja rodando, ou reutiliza o servidor local existente em `localhost:4200`.

---

## Executar testes com navegador visível

```bash
npm run e2e:headed
```

---

## Abrir interface visual do Playwright

```bash
npm run e2e:ui
```

---

# Scripts disponíveis

```json
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "ng test",
  "e2e": "playwright test",
  "a11y": "playwright test tests/accessibility",
  "e2e:ui": "playwright test --ui",
  "e2e:headed": "playwright test --headed"
}
```

---

# Testes de acessibilidade

Os testes utilizam:

- Playwright para automação E2E
- Axe Core para análise WCAG automática

Arquivo principal:

```txt
tests/accessibility/home.a11y.spec.ts
```

## Como rodar

```bash
npm run a11y
```

O comando executa a suíte de acessibilidade nos navegadores configurados no Playwright:

- Chromium
- Firefox
- WebKit

## O que a suíte atual cobre

- Carregamento da tela inicial do formulário
- Validação de que o botão `Cadastrar` inicia desabilitado
- Análise de acessibilidade da tela inicial com Axe
- Preenchimento do formulário Angular
- Envio do cadastro
- Validação da tela de sucesso renderizada via `ngIf`/`@if`
- Confirmação de que o formulário saiu da tela após o cadastro
- Análise de acessibilidade da tela de sucesso com Axe

Exemplo:

```ts
const results = await new AxeBuilder({ page }).analyze();

expect(results.violations).toEqual([]);
```

---

# O que os testes validam

- Inputs sem label
- Problemas de contraste
- Estrutura HTML semântica
- ARIA inválido
- Navegação por teclado
- IDs duplicados
- Problemas de screen reader
- Botões sem nome acessível

---

# Relatórios

Após execução dos testes:

```bash
npx playwright show-report
```

O relatório abre em uma URL local parecida com:

```txt
http://localhost:9323
```

Relatórios ficam em:

```txt
playwright-report/
```

---

# Objetivo final

O objetivo desta POC é servir como base para estudos mais avançados relacionados a:

- Acessibilidade
- WCAG
- Angular
- Playwright
- Automação E2E
- Microfrontends
- Fluxos sem roteamento tradicional
- MCP
- IA aplicada à geração automática de testes
