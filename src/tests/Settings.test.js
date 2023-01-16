import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testar tela de Settings', () => {
  it('Teste para 100% de coverage', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(buttonSettings);

    const title = await screen.findByRole('heading', {  name: /configurações/i});
    const inputDifficulty = screen.getByLabelText('difficulty');
    const inputCategory = screen.getByLabelText('category');
    const inputType = screen.getByLabelText('type');
    const buttonPlay = screen.getByRole('button', { name: /jogar/i })

    userEvent.selectOptions(inputDifficulty, 'easy');
    userEvent.selectOptions(inputCategory, 'General Knowledge');
    userEvent.selectOptions(inputType, 'boolean');

    expect(history.location.pathname).toBe('/settings');
    expect(title).toBeInTheDocument();    
    expect(inputDifficulty).toBeInTheDocument();
    expect(inputCategory).toBeInTheDocument();
    expect(inputType).toBeInTheDocument();

    userEvent.click(buttonPlay);

    await screen.findByRole('button', { name: /play/i });
    expect(history.location.pathname).toBe('/');
  });
});