import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const EMAIL_TESTE = 'teste@teste.com';
const NAME_TESTE = 'Teste';

describe('Testar tela de login', () => {
  it('Testar se os inputs e os botões estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', {name: /play/i});
    const buttonSettings = screen.getByRole('button', {  name: /configurações/i});

    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
  }),

  it('Testar se o botão play esta desativado inicialmente', () => {
    renderWithRouterAndRedux(<App />);

    const buttonPlay = screen.getByRole('button', {name: /play/i});

    expect(buttonPlay).toBeDisabled();
  }),
  it('Testar se o botão é ativado ao preencher os inputs', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', {name: /play/i});

    userEvent.type(inputEmail, EMAIL_TESTE);
    expect(buttonPlay).toBeDisabled();

    userEvent.type(inputName, NAME_TESTE);
    userEvent.clear(inputEmail);
    expect(buttonPlay).toBeDisabled();

    userEvent.type(inputEmail, EMAIL_TESTE);
    expect(buttonPlay).toBeEnabled();
  }),
  it('testar se o botão de configuração muda a pagina para "/settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByRole('button', {  name: /configurações/i});

    userEvent.click(buttonSettings);

    expect(history.location.pathname).toBe('/settings');
  }),
  it('testar se o botão play redireciona a pagina e chama a função fetch', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', {name: /play/i});

    userEvent.type(inputEmail, EMAIL_TESTE);
    userEvent.type(inputName, NAME_TESTE);
    userEvent.click(buttonPlay);

    waitFor(() => {
      expect(history.location.pathname).toBe('/game');
    });
  })
})