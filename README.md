# Escape Room de Vendas 3D

Jogo web multiusuario para treinamento em tecnicas de vendas. Os alunos entram em grupos, caminham com avatares em uma ala de shopping 3D, resolvem enigmas operacionais, taticos e estrategicos e somam ate 21 pontos em tres fases.

## Como iniciar

```powershell
npm start
```

Depois abra:

```text
http://localhost:3200
```

Use o mesmo nome de grupo em tres ou mais navegadores/computadores para formar uma equipe. Cada grupo fica isolado em seu proprio estado de jogo, com placar, timer e respostas compartilhadas.

## GitHub Pages

No GitHub Pages, o jogo roda em modo estatico usando o armazenamento local do navegador. Esse modo permite jogar e testar as tres fases, mas nao sincroniza equipes entre computadores diferentes. Para uso multiusuario real em sala ou laboratorio, inicie pelo servidor Node com `npm start`.

## Regras

- Pontuacao maxima: 21 pontos.
- Fase 1: 7 perguntas de multipla escolha, valendo 7 pontos no total.
- Tempo da fase 1: 15 minutos.
- Ao atingir 7 pontos, uma porta abre e leva o grupo ao nivel 2.
- Fase 2: 7 perguntas de resposta digitada, valendo mais 7 pontos.
- Tempo da fase 2: 15 minutos.
- Ao atingir 14 pontos, uma porta abre para a Sala 3.
- Fase 3: 7 perguntas escondidas, valendo mais 7 pontos. O painel mostra enigmas que indicam onde encontrar cada pergunta.
- Tempo da fase 3: 15 minutos.
- Ao atingir 21 pontos, o jogo dispara fogos e musica de vitoria.
- Se o tempo acabar antes da meta da fase atual, o grupo fica bloqueado e precisa recomecar do zero.
