import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { questionsResponse } from '../../cypress/mocks/questions';

const email = 'email@email.com';
const name = 'nome';

describe('Testar tela de Ranking', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(questionsResponse),
    });
  });

  it('Teste para 100% coverage da tela Ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    let inputEmail = screen.getByTestId('input-gravatar-email');
    let inputName = screen.getByTestId('input-player-name');
    let buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputEmail, email);
    userEvent.type(inputName, name);
    userEvent.click(buttonPlay);

      let i = 0;
      while (i < 5) {
        i += 1;

        const correctAnswer = await screen.findByTestId('correct-answer');
        userEvent.click(correctAnswer);

        const nextButton = screen.getByRole('button', { name: /Next/i });
        userEvent.click(nextButton);
      };

      const buttonPlayAgain = screen.getByRole('button', { name: /play again/i });
      userEvent.click(buttonPlayAgain);

      inputEmail = screen.getByTestId('input-gravatar-email');
      inputName = screen.getByTestId('input-player-name');
      buttonPlay = screen.getByRole('button', { name: /play/i });

      userEvent.type(inputEmail, email);
      userEvent.type(inputName, name);
      userEvent.click(buttonPlay);

      i = 0;
      while (i < 5) {
        i += 1;

        const correctAnswer = await screen.findByTestId('correct-answer');
        userEvent.click(correctAnswer);

        const nextButton = screen.getByRole('button', { name: /Next/i });
        userEvent.click(nextButton);
      };

      const buttonRanking = screen.getByRole('button', { name: /Ranking/i });
      userEvent.click(buttonRanking);

      const title = screen.getByRole('heading', { name: /ranking/i });
      const buttonHome = screen.getByRole('button', { name: /Home/i });
      const playerCard = screen.getAllByRole('listitem');


      expect(history.location.pathname).toBe('/ranking');
      expect(title).toBeInTheDocument();
      expect(buttonHome).toBeInTheDocument();
      expect(playerCard).toHaveLength(2);

      userEvent.click(buttonHome);
    });
});