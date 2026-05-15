import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function expectNoA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
}

test('formulário de cadastro sem violações de acessibilidade', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Cadastro de Pessoa' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cadastrar' })).toBeDisabled();

  await expectNoA11yViolations(page);
});

test('envia o cadastro, valida a tela de sucesso via ngIf e mantém acessibilidade', async ({
  page,
}) => {
  await page.goto('/');

  await page.getByRole('textbox', { name: 'Nome', exact: true }).fill('Maria');
  await page.getByRole('textbox', { name: 'Sobrenome' }).fill('Silva');
  await page.getByLabel('E-mail').fill('maria.silva@example.com');
  await page.getByLabel('Sexo').selectOption('feminino');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(
    page.getByRole('heading', { name: 'Cadastro realizado com sucesso' }),
  ).toBeVisible();
  await expect(page.getByRole('status')).toHaveText(
    'Cadastro realizado para Maria Silva',
  );
  await expect(
    page.getByRole('heading', { name: 'Cadastro de Pessoa' }),
  ).toBeHidden();
  await expect(
    page.getByRole('textbox', { name: 'Nome', exact: true }),
  ).toBeHidden();

  await expectNoA11yViolations(page);
});
