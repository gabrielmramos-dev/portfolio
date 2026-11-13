---
title: "Six months with AI in production: the hard part starts after Hello World"
description: "Two thirds of my commits in the last six months were fixes, not new features. What I saw working with AI in a corporate environment, in the order it hurt."
date: 2026-10-22
tags: ["ai", "career"]
---

Two thirds of my commits in the last six months were fixes, not new features. I knew working with AI in a corporate environment would be hard. I did not know the difficulty would be so unglamorous.

I'm an intern, placed on a project where I have the privilege of working with technologies most people only see in conference talks: RAG, MCP, harnesses, agents in production. And it is great. But, as I already suspected, it is NOT simple at all. I use Claude Code in my day to day, without shame, and it was by using it that I quickly found out where it stops solving things.

It is common to see "AI in your company" treated as something as simple as a Hello World. And Hello World is indeed simple. It is the only part that is. This text is a record of what I saw in these six months, in the order it hurt.

## When the model changes

In college I learned that a dependency is something you install and version. A hosted model behaves differently: it changes under your feet. A parameter that used to work stops being accepted (`top_p` is the classic example). A new model changes generation behavior and breaks what was stable. The cost changes, the thinking level becomes a new setting and the output token limit varies from one model to another.

That is why, when a model is deprecated, it is not enough to swap the name in the configuration.

The prompt that worked rarely behaves the same on the new model, the output token limit may be different and some features are still tied to the old version, which forces you to keep a fallback during the migration. Finding out what broke, and where, is more work than fixing it.

In June, for example, I removed an old generation from the list of available models and released the next one to all profiles, keeping a fallback for legacy prompts. The fallback exists so that nothing that still depends on the old version stops working during the transition.

## Stored prompts break too

When the system has dozens of generation features, prompts stop fitting inside the code. They start being stored in a database, with a version, title and their own parameters (model, temperature, thinking level) for each feature. That takes the prompt out of the deploy cycle and gives autonomy to people who don't program. It also creates a whole family of bugs I never imagined:

- **Prompt not found.** The lookup by feature name, by route or by parameter fails in a different way on each screen.
- **Prompt stored, but ignored.** Refining a result kept using the old text instead of what was in the store.
- **Wrong parameter saved.** A field saved blank, a thinking level that became `null`.

The lesson is old, and I only learned it in practice: everything that changes without a deploy needs a version, an owner and a test.

## Without a record, there is no investigation

Which model generated this answer? With what temperature and at what thinking level? It sounds like a silly question until the day someone complains about a bad generation and you have no way to know. I had model fields saved blank in the metrics and, later, a thinking level saved as `null` in the refinement flow. Without that record, investigating becomes guessing.

I started treating AI observability as part of the feature. Every generation must record the model, the thinking level, the temperature and the cost and, preferably, the prompt and version that produced it.

## The plumbing around the AI

The part that carries the name "AI" in the system is small. The rest is plumbing, and plumbing breaks too.

Streaming is a good example. Real-time responses go through layers that hold the text back, and a buffer or encoding setting makes the stream arrive all at once. In reasoning models, steps and thinking blocks showed up repeated on screen, and the extra context also had to be injected into the streaming features, not just the others.

External integrations are similar. Without a retry, a transient network failure or an SSL error becomes an error on the user's screen, and the user naturally blames the system. And there are the small infrastructure things: a time saved in UTC instead of UTC-3, a setting that existed in one environment and was missing in another.

None of this shows up in an AI demo, and all of it becomes a commit.

## The old fence

Chesterton has an image that I can't get out of my head. A reformer finds a fence in the middle of a road and says he sees no use for it, so he wants to tear it down. The sensible answer is: if you don't see what it is for, you won't tear it down. Go away and think. When you come back knowing what it is for, maybe I will let you tear it down.

In AI projects, that fence shows up often. The fallback for legacy prompts, for example, looks like leftover code until the day someone still depends on it.

There is almost always a reason, and the reason only shows up when someone needs to change it. So before simplifying something I don't understand, I try to find out who put it there and why.

## Using Claude Code without shame, and what it does not replace

I use Claude Code every day at work and I see no reason to hide it. It is a tool, like the editor or the debugger, and the market has already gotten used to it: in the [Stack Overflow 2026 developer survey](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/), 73% of those who use code assistants or agents use them every day.

What the tool does not replace is what this text has been describing: reading the provider's documentation, understanding why a parameter stopped being accepted, distrusting a result that looks right, knowing what an error means before asking for the fix. The same survey points out that trusting what AI delivers requires source attribution (93%). I understand that distrust well.

From what I have lived so far, the tool speeds up those who already know what they are looking for and gets in the way of those who expect it to know for them.

## Conclusion

The developer profession has changed, yes. But, in my experience, AI is still hard and complex, and it demands reading documentation and human rigor.

If I had to leave one piece of advice for someone starting out, it would be short: read the provider's documentation before blaming the model.
