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
