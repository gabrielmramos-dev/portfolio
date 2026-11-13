---
title: "What I learned building an IAM (Identity and Access Management) microservice from scratch"
description: "How I took on the challenge of designing a robust identity service, applying Clean Architecture, Refresh Token Rotation and E2E tests."
date: 2025-12-27
tags: ["technical challenges", "learning"]
---

Professional growth takes discomfort. So, during this vacation, I decided to trade rest for a real challenge: building a project that followed the metrics and standards the Software Engineering market demands today. I focused on pillars such as **Clean Architecture**, **JWT**, **Refresh Token with Rotation**, **Unit/E2E tests** and rigorous API documentation.

I could have spent that time just resting, but I felt I needed to validate my knowledge beyond ready-made tutorials. I chose to build an **Identity and Access Management (IAM)** system because it is the "Achilles' heel" of many applications: if identity management fails, the whole structure collapses.

I'll be honest: applying **Clean Architecture** for the first time is no walk in the park. To be frank, it is hell. There were moments of pure stress trying to understand how to decouple Prisma and Fastify in a way that made sense, without creating unnecessary complexity. The challenge was not just making the code work, but making sure it was elegant, testable and secure. That cost many hours buried in documentation, StackOverflow threads and AI support to untangle logical knots.

Dealing with **httpOnly cookies**, ensuring the system's resilience for the end user and keeping the green bar on unit and E2E tests with **Vitest** was exhausting. But every typing error in **TypeScript** was a sign that I was on the right track, finally moving from comfortable theory to the real practice of software engineering.

In the end, what remained was not just another repository on GitHub. It was the clarity that, to be a good dev, you have to learn to live with the discomfort of not knowing everything at first. Below, I present the system's final flow:

![Authentication flow: login and refresh routes, issuing an access token (10 min) and a refresh token (7 days) in a cookie](/blog/iam-fluxo.png)

The project's code is at [gabrielmramos-dev/iam-microservice-node](https://github.com/gabrielmramos-dev/iam-microservice-node).
