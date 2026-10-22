---
title: "Seis meses com IA em produção: o difícil começa depois do Hello World"
description: "Dois terços dos meus commits nos últimos seis meses foram correção, não funcionalidade nova. O que vi trabalhando com IA em ambiente corporativo, na ordem em que doeu."
date: 2026-10-22
tags: ["ia", "aprendizado", "carreira"]
---

Dois terços dos meus commits nos últimos seis meses foram correção, não funcionalidade nova. Eu sabia que trabalhar com IA em ambiente corporativo seria difícil. Não sabia que a dificuldade seria tão pouco glamorosa.

Sou estagiário e estou alocado em um projeto onde tenho o privilégio de lidar com tecnologias que a maioria só vê em palestra: RAG, MCP, harness, agentes em produção. E é bom. Mas, como eu já imaginava, não é NADA simples. Uso Claude Code no meu dia a dia, sem pudor, e foi usando que descobri bem rápido onde ele deixa de resolver.

É comum ver "AI na sua companhia" tratada como algo tão simples quanto um Hello World. E o Hello World é simples mesmo. É a única parte que é. Este texto é um registro do que eu vi nesses seis meses, na ordem em que doeu.

## Quando o modelo muda

Na faculdade aprendi que dependência é aquilo que você instala e versiona. Um modelo hospedado se comporta de outro jeito: ele muda debaixo dos seus pés. Um parâmetro que funcionava deixa de ser aceito (o `top_p` é o exemplo clássico). Um modelo novo altera o comportamento da geração e quebra o que estava estável. O custo muda, o nível de pensamento vira uma configuração nova e o limite de tokens de saída varia de um modelo para outro.

Por isso, quando um modelo é descontinuado, não basta trocar o nome na configuração.

O prompt que funcionava raramente se comporta igual no modelo novo, o limite de tokens de saída pode ser outro e ainda há funcionalidades presas à versão antiga, o que obriga a manter um fallback durante a migração. Descobrir o que quebrou, e onde, dá mais trabalho que consertar.

Em junho, por exemplo, removi da lista de modelos disponíveis uma geração antiga e liberei a seguinte para todos os perfis, mantendo um fallback para os prompts legados. O fallback existe para que nada que ainda dependa da versão antiga pare de funcionar durante a transição.

## Prompt cadastrado também quebra

Quando o sistema tem dezenas de funcionalidades de geração, os prompts deixam de caber dentro do código. Passam a ser cadastrados em um banco, com versão, título e parâmetros próprios (modelo, temperatura, nível de pensamento) para cada funcionalidade. Isso tira o prompt do ciclo de deploy e dá autonomia a quem não programa. Também cria uma família inteira de bugs que eu não imaginava:

- **Prompt não encontrado.** A busca por nome da funcionalidade, por rota ou por parâmetro falha de um jeito diferente em cada tela.
- **Prompt cadastrado, mas ignorado.** O refinamento de um resultado continuava usando o texto antigo em vez do que estava no cadastro.
- **Parâmetro gravado errado.** Um campo salvo em branco, um nível de pensamento que virava `null`.

A lição é velha, e eu só a aprendi na prática: tudo que muda sem deploy precisa de versão, de dono e de teste.

## Sem registro, não há investigação

Qual modelo gerou essa resposta? Com que temperatura e com qual nível de pensamento? Parece pergunta boba até o dia em que alguém reclama de uma geração ruim e você não tem como saber. Tive campos de modelo gravados em branco nas métricas e, depois, um nível de pensamento gravado como `null` no fluxo de refinamento. Sem esse registro, investigar vira adivinhação.

Passei a tratar a observabilidade de IA como parte da funcionalidade. Toda geração precisa registrar o modelo, o nível de pensamento, a temperatura e o custo e, de preferência, o prompt e a versão que a produziram.

## O encanamento ao redor da IA

A parte que leva o nome de "IA" no sistema é pequena. O resto é encanamento, e o encanamento também quebra.

O streaming é um bom exemplo. As respostas em tempo real passam por camadas que seguram o texto, e uma configuração de buffer ou de codificação faz o stream chegar de uma vez só. Em modelos com raciocínio, passos e blocos de pensamento chegaram repetidos na tela, e o contexto adicional precisou ser injetado também nas funcionalidades com streaming, não só nas demais.

Com integrações externas é parecido. Sem retry, uma falha transitória de rede ou um erro de SSL vira erro na tela do usuário, que naturalmente culpa o sistema. E há as pequenezas de infraestrutura: um horário gravado em UTC em vez de UTC-3, uma configuração que existia em um ambiente e faltava em outro.

Nada disso aparece em demonstração de IA, e tudo vira commit.

## A cerca velha

Chesterton tem uma imagem que não sai da minha cabeça. Um reformador encontra uma cerca no meio de uma estrada e diz que não vê serventia nela, então quer derrubá-la. A resposta sensata é: se você não vê para que ela serve, não vai derrubá-la. Vá embora e pense. Quando voltar sabendo para que ela serve, talvez eu o deixe derrubar.

Em projetos de IA essa cerca aparece com frequência. O fallback para prompts legados, por exemplo, parece sobra de código até o dia em que alguém ainda depende dele.

Quase sempre existe um motivo, e o motivo só aparece quando alguém precisa mexer. Por isso, antes de simplificar algo que não entendo, tento descobrir quem colocou aquilo ali e por quê.

## Usar Claude Code sem pudor, e o que ele não substitui

Uso Claude Code todo dia no trabalho e não vejo motivo para esconder. É uma ferramenta, como o editor ou o debugger, e o mercado já se acostumou com ela: na [pesquisa de desenvolvedores do Stack Overflow de 2026](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/), 73% de quem usa assistentes ou agentes de código os usa todos os dias.

O que a ferramenta não substitui é o que este texto vem descrevendo: ler a documentação do provedor, entender por que um parâmetro deixou de ser aceito, desconfiar de um resultado que parece certo, saber o que um erro significa antes de pedir a correção. A mesma pesquisa aponta que confiar no que a IA entrega exige atribuição da fonte (93%). Eu entendo bem essa desconfiança.

Pelo que vivi até aqui, a ferramenta acelera quem já sabe o que está procurando e atrapalha quem espera que ela saiba por ele.

## Conclusão

A profissão do dev mudou, sim. Mas, na minha experiência, IA ainda é difícil e complexa, e exige leitura de documentação e rigor humano.

Se eu tivesse que deixar um conselho para quem está começando, seria curto: leia a documentação do provedor antes de culpar o modelo.
