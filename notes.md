Progressão das telas
ScreenManager define a ordem: 0 1 2 1 2 1 2 1 2 1 2 3
Telas: não sabem de ordem. Só se importam em chamar a "próxima"

Compartilhamento de estado

    SM: state { answer, colors, selected }
        handleOptionClik(option) calculateNewState(option)

AS telas nao podem mudar o estado! É responsabilidade do "pai" SM
render(state)
onClick(option)

NS
render(newState)

## Game Manager

Lógica de mostrar a tela.

_if state == start -> show new StartScreen(onStartCallback)_

## Game States

- inicio - demonstra start button / regras
- pergunta - demontra a pergunta e as opcoes, pontuacao, rodada (10)
- resposta - mostra resposta certa ou errada e botao (click) para proximo rodada
- fim - mostra pontuacao final, mensagem e reiniciar

### StartScreen

EventListener de um botão

Chamar outra classe

## Notes

_vai usar o color generator para seleccionar uma das cores como sendo a resposta correcta
(com jquery vamos mostrar a resposta no svg)
vai validar resposta e atribuir pontuacao_

**Problema**: indefinição na interface.

**Solução**: Usar approach "XYZ", ou seja, reduzir o escopo de implementação e integração e ir desenvolvendo a interface e a funcionalidade passo a passo.

tenho de alterar a classe mãe para screen
arranjar uma forma de passar info para classe manager
confirmar as alterações para id
considerar mudar para criar os elementos

// "jest": {
// "setupFiles": [
// "./test/jest-pretest.js"
// ]
// },

## Base Functional

import $ from "jquery";

const SCREENS = {
start: function _renderStartScreen(_, onActionClick) {
// console.log("[_renderStartScreen] state:", state);
const $root = $("#app");
    $root
      .html(
        `
      <div id="start-screen">
        <button>New game</button>
      </div>`
      )
      .one("click", () => {
        console.log("[_renderStartScreen.one.click]");
        onActionClick();
      });
  },
  question: function _renderQuestionScreen(
    { round, score, questions },
    onActionClick
  ) {
    // console.log("[_renderQuestionScreen] state:", state);
    const $root = $("#app");
    const question = questions[round - 1];
    $root
      .html(
        `
    <div id="question-screen">
      <h2>Round: ${round} - Score: ${score}</h2>
      <h3>Guess the color of ${question.colorName}</h3>
      <div>
        <button>${question.options[0]}</button>
<button>${question.options[1]}</button>
        <button>${question.options[2]}</button>
</div>
</div>`
)
.find("button")
.one("click", function () {
const clickedIndex = $("button").index(this);
// console.log("[_renderQuestionScreen] clickedIndex:", clickedIndex);
// question.picked = clickedIndex;
onActionClick(clickedIndex);
});
},
answer: function \_renderAnswerScreen({ round, questions }, onActionClick) {
// disable all buttons, and striketrought wrong options
const question = questions[round - 1];
$("#question-screen button")
.prop("disabled", true)
.filter((index) => index !== question.answer)
.wrapInner("<s></s>");

    const message = question.picked === question.answer ? "CORRECT" : "WRONG";

    $("#question-screen")
      .append(
        `
      <h3>That is ${message}!</h3>
      <button>Next question</button>
    `
      )
      .find("button")
      .one("click", () => onActionClick());

},
finish: function \_renderFinishScreen({ score }) {
const $root = $("#app");
const message =
score === 30 ? "AWESOME!" : score <= 10 ? "Lame..." : "Nice";
$root
.html(
` <div id="finish-screen"> <h2>Game Over</h2> <h3>Final score: ${score}</h3> <h4>That was ${message}</h4> <button>Try again?</button> </div> `
)
.find("button")
.one("click", initGame);
}
};

function initGame() {
// Screens: start, question, answer, finish
// State: round, score, questions, currentScreen
const state = {
round: 1,
score: 0,
questions: [
// TODO: generate random colors and options
{
colorName: "Ruby Red",
options: ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)"],
answer: 0,
picked: -1
},
{
colorName: "Emerald Green",
options: ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)"],
answer: 1,
picked: -1
},
{
colorName: "Cobalt Blue",
options: ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)"],
answer: 2,
picked: -1
}
],
currentScreen: SCREENS.start
};

function updateState(params) {
console.log("[updateState] params:", params);
switch (state.currentScreen) {
case SCREENS.start:
state.currentScreen = SCREENS.question;
break;

      case SCREENS.question:
        const question = state.questions[state.round - 1];
        question.picked = params;
        state.score += question.answer === question.picked ? 10 : 0;
        state.currentScreen = SCREENS.answer;
        break;

      case SCREENS.answer:
        if (state.round === state.questions.length) {
          state.currentScreen = SCREENS.finish;
        } else {
          state.round++;
          state.currentScreen = SCREENS.question;
        }
        break;

      default:
        throw new Error(
          `Invalid state. Unknown screen: ${state.currentScreen}`
        );
    }

    // SCREENS[state.currentScreen](state, updateState);
    state.currentScreen(state, updateState);

}

// SCREENS.start(state);
// SCREENS[state.currentScreen](state, updateState);
state.currentScreen({ ...state }, updateState);
}

initGame();
