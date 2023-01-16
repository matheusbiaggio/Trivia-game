import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { invalidTokenQuestionsResponse, questionsResponse } from '../../cypress/mocks/questions';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const EMAIL_TESTE = 'teste@teste.com';
const NAME_TESTE = 'Teste';

questionsResponse.results[0].correct_answer = 'True';
questionsResponse.results[0].incorrect_answers[0] = 'False';

describe('Teste da pagina de jogo', () => {
  it('Testar ser finaliza todas as questões e clica no playagain',async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(questionsResponse)
    });

    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', {name: /play/i});

    userEvent.type(inputEmail, EMAIL_TESTE);
    userEvent.type(inputName, NAME_TESTE);
    userEvent.click(buttonPlay);

    await waitForElementToBeRemoved(inputName);

    const nameElement = screen.getByRole('heading', {  name: /teste/i, level: 2});
    expect(nameElement).toBeInTheDocument();

    const categoryElement = await screen.findByText(/Geography/i);
    expect(categoryElement).toBeInTheDocument();

    const imageElement = screen.getByRole('img', {  name: /avatar/i});
    expect(imageElement).toBeInTheDocument();

    const questionElement1 = screen.getByText(/The Republic of Malta is the smallest microstate worldwide./i);
    expect(questionElement1).toBeInTheDocument();

    const buttonsElement = screen.getAllByRole('button');
    expect(buttonsElement).toHaveLength(2);

    const correctElement = screen.getByTestId('correct-answer');
    const incorrectElement = screen.getByTestId('wrong-answer-0');
    expect(correctElement).toBeInTheDocument();
    expect(incorrectElement).toBeInTheDocument();

    userEvent.click(incorrectElement);

    const wordScoreElement = screen.getByText(/score:/i);
    expect(wordScoreElement).toBeInTheDocument();

    const ScoreElement = screen.getByTestId('header-score');
    expect(ScoreElement).toBeInTheDocument();

    const nextElement = screen.getByRole('button', {  name: /next/i});
    expect(nextElement).toBeInTheDocument();

    userEvent.click(nextElement);

    const questionElement2 = screen.getByText(/In quantum physics, which of these theorised sub-atomic particles has yet to be observed?/i);
    expect(questionElement2).toBeInTheDocument();

    const correctElement2 = screen.getByTestId('correct-answer');
    expect(correctElement2).toBeInTheDocument();

    userEvent.click(correctElement2);

    const nextElement2 = screen.getByRole('button', {  name: /next/i});
    expect(nextElement2).toBeInTheDocument();

    userEvent.click(nextElement2);

    const questionElement3 = screen.getByText(/Generally, which component of a computer draws the most power?/i);
    expect(questionElement3).toBeInTheDocument();

    const correctElement3 = screen.getByTestId('correct-answer');
    expect(correctElement3).toBeInTheDocument();

    userEvent.click(correctElement3);

    const nextElement3 = screen.getByRole('button', {  name: /next/i});
    expect(nextElement3).toBeInTheDocument();

    userEvent.click(nextElement3);

    const questionElement4 = screen.getByText(/What is the most expensive weapon in Counter-Strike: Global Offensive?/i);
    expect(questionElement4).toBeInTheDocument();

    const correctElement4 = screen.getByTestId('correct-answer');
    expect(correctElement4).toBeInTheDocument();

    userEvent.click(correctElement4);

    const nextElement4 = screen.getByRole('button', {  name: /next/i});
    expect(nextElement4).toBeInTheDocument();

    userEvent.click(nextElement4);

    const questionElement5 = screen.getByText(/Who was the Author of the manga Uzumaki?/i);
    expect(questionElement5).toBeInTheDocument();

    const correctElement5 = screen.getByTestId('correct-answer');
    expect(correctElement5).toBeInTheDocument();

    userEvent.click(correctElement5);

    const nextElement5 = screen.getByRole('button', {  name: /next/i});
    expect(nextElement5).toBeInTheDocument();

    userEvent.click(nextElement5);

    const buttonPlayAgain = screen.getByRole('button', {  name: /play again/i});
    expect(buttonPlayAgain).toBeInTheDocument();

    userEvent.click(buttonPlayAgain);

    expect(history.location.pathname).toBe('/');
  }),

  it('Testar ser finaliza todas as questões e clica no ranking',async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse)
  });
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', {name: /play/i});
    userEvent.type(inputEmail, EMAIL_TESTE);
    userEvent.type(inputName, NAME_TESTE);
    userEvent.click(buttonPlay);
    await waitForElementToBeRemoved(inputName);
    const nameElement = screen.getByRole('heading', {  name: /teste/i, level: 2});
    expect(nameElement).toBeInTheDocument();
    const categoryElement = await screen.findByText(/Geography/i);
    expect(categoryElement).toBeInTheDocument();
    const imageElement = screen.getByRole('img', {  name: /avatar/i});
    expect(imageElement).toBeInTheDocument();
    const questionElement1 = screen.getByText(/The Republic of Malta is the smallest microstate worldwide./i);
    expect(questionElement1).toBeInTheDocument();
    const buttonsElement = screen.getAllByRole('button');
    expect(buttonsElement).toHaveLength(2);
    const correctElement = screen.getByTestId('correct-answer');
    const incorrectElement = screen.getByTestId('wrong-answer-0');
    expect(correctElement).toBeInTheDocument();
    expect(incorrectElement).toBeInTheDocument();
    userEvent.click(correctElement);
    const wordScoreElement = screen.getByText(/score:/i);
    expect(wordScoreElement).toBeInTheDocument();
    const ScoreElement = screen.getByTestId('header-score');
    expect(ScoreElement).toBeInTheDocument();
    const nextElement = screen.getByRole('button', {  name: /next/i});
    expect(nextElement).toBeInTheDocument();
    userEvent.click(nextElement);
    const questionElement2 = screen.getByText(/In quantum physics, which of these theorised sub-atomic particles has yet to be observed?/i);
    expect(questionElement2).toBeInTheDocument();
    const correctElement2 = screen.getByTestId('correct-answer');
    expect(correctElement2).toBeInTheDocument();
      userEvent.click(correctElement2);
      const nextElement2 = screen.getByRole('button', {  name: /next/i});
      expect(nextElement2).toBeInTheDocument();
      userEvent.click(nextElement2);
    const questionElement3 = screen.getByText(/Generally, which component of a computer draws the most power?/i);
    expect(questionElement3).toBeInTheDocument();
    const correctElement3 = screen.getByTestId('correct-answer');
    expect(correctElement3).toBeInTheDocument();
      userEvent.click(correctElement3);
      const nextElement3 = screen.getByRole('button', {  name: /next/i});
      expect(nextElement3).toBeInTheDocument();
      userEvent.click(nextElement3);
      const questionElement4 = screen.getByText(/What is the most expensive weapon in Counter-Strike: Global Offensive?/i);
      expect(questionElement4).toBeInTheDocument();
      const correctElement4 = screen.getByTestId('correct-answer');
      expect(correctElement4).toBeInTheDocument();
        userEvent.click(correctElement4);
        const nextElement4 = screen.getByRole('button', {  name: /next/i});
        expect(nextElement4).toBeInTheDocument();
        userEvent.click(nextElement4);
        const questionElement5 = screen.getByText(/Who was the Author of the manga Uzumaki?/i);
      expect(questionElement5).toBeInTheDocument();
      const correctElement5 = screen.getByTestId('correct-answer');
      expect(correctElement5).toBeInTheDocument();
        userEvent.click(correctElement5);
        const nextElement5 = screen.getByRole('button', {  name: /next/i});
        expect(nextElement5).toBeInTheDocument();
        userEvent.click(nextElement5);
        const buttonRanking = screen.getByRole('button', {  name: /ranking/i});
        expect(buttonRanking).toBeInTheDocument();
        userEvent.click(buttonRanking);
        expect(history.location.pathname).toBe('/ranking');
  }),
  it('testar se o fetch tem um token invalido', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse)
    });
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', {name: /play/i});
    userEvent.type(inputEmail, EMAIL_TESTE);
    userEvent.type(inputName, NAME_TESTE);
    userEvent.click(buttonPlay);
    await waitForElementToBeRemoved(inputName);
    const nameElement = screen.getByRole('heading', {  name: /teste/i, level: 2});
    expect(nameElement).toBeInTheDocument();
    await screen.findAllByRole('button'); // só para parar de dar warning
  })
})