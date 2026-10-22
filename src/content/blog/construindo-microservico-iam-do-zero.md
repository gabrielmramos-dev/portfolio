---
title: "O que aprendi construindo um Microsserviço IAM (Gerenciamento de acesso e identidade) do zero"
description: "Como encarei o desafio de projetar um serviço de identidade robusto, aplicando Clean Architecture, Refresh Token Rotation e testes E2E."
date: 2025-12-27
tags: ["estudos", "desafios técnicos", "aprendizado"]
---

Crescimento profissional exige desconforto. Por isso, nestas férias, decidi trocar o descanso por um desafio real: desenvolver um projeto que seguisse as métricas e padrões que o mercado de Engenharia de Software exige atualmente. Foquei em pilares como **Clean Architecture**, **JWT**, **Refresh Token com Rotation**, **Testes Unitários/E2E** e documentação rigorosa de API.

Eu poderia ter passado esse tempo apenas descansando, mas senti que precisava validar meu conhecimento para além dos tutoriais prontos. Escolhi construir um sistema de **Identity and Access Management (IAM)** porque ele é o "calcanhar de Aquiles" de muitas aplicações, se a gestão de identidade falha, toda a estrutura desmorona.

Vou ser sincero, aplicar **Clean Architecture** pela primeira vez não é um mar de rosas, para ser honesto, é um inferno. Foram momentos de puro estresse tentando entender como desacoplar o Prisma e o Fastify de um jeito que fizesse sentido, sem criar uma complexidade desnecessária. O desafio não era apenas fazer o código funcionar, mas garantir que ele fosse elegante, testável e seguro. Isso custou muitas horas mergulhado em documentações, discussões no StackOverflow e o apoio da IA para desatar nós lógicos.

Lidar com **cookies httpOnly**, garantir a resiliência do sistema para o usuário final e manter a barrinha verde nos testes unitários e E2E com o **Vitest** foi exaustivo. Mas cada erro de tipagem no **TypeScript** servia como um aviso de que eu estava no caminho certo, migrando finalmente da teoria confortável para a prática real da engenharia de software.

No final das contas, o que restou não foi apenas mais um repositório no GitHub. Foi a clareza de que, para ser um bom dev, é preciso aprender a conviver com o desconforto de não saber tudo de primeira. Abaixo, apresento o fluxo final do sistema:

![Fluxo de autenticação: rotas de login e refresh, com emissão de access token (10 min) e refresh token (7 dias) em cookie](/blog/iam-fluxo.png)
