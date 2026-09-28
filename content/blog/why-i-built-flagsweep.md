---
title: "Why I built Flagsweep"
date: 2026-09-28
description: "Several teams I worked with had the same trouble with feature flags. Flagsweep is my answer to it."
image: /images/projects/flagsweep.jpg
---

On 26 September I released the first version of [Flagsweep](https://flagsweep.com/), a free and open source tool for managing the feature flags a team keeps in Azure App Configuration. This post explains where the idea came from and why I think it's worth building.

![Flagsweep: part of the flag list, with each flag's state in Development, Staging and Production, its status badge and its owner](/images/projects/flagsweep.jpg)

## What I kept seeing

I've spent ten years building and running .NET systems for banks, pension providers and energy companies. In that time I watched several teams struggle with their feature flags, and the trouble looked the same each time.

Clients sat down to test a feature and found it switched off in their environment. A flag would be on in staging and off in production, and nobody was sure why. Azure's revision history is no help there, because it doesn't record who made a change.

The people who most needed to switch flags were product owners and support. They couldn't make sense of the Azure portal, so they asked a developer every time.

No one owned the flags either. Once a rollout was done the flag stayed where it was, in the code and in the store, and the technical debt kept piling up.

## The opportunity

Azure App Configuration does the runtime part well. It stores the flags, and the application reads them through Microsoft's feature management libraries. What it lacks is the part that concerns people: who is allowed to change a flag, who did change it, who owns it, and when it should go away.

The established feature flag platforms cover that, but they come with their own flag store and their own SDKs. A team that already runs on App Configuration would have to move its flags and change its applications to use one.

I saw room for something smaller: leave Azure in charge of the runtime and add the missing layer on top. With Flagsweep the flags stay in Azure, and applications keep reading them with the SDKs they already use. Flagsweep writes to the same store and leaves any feature filters and variants set in the portal as they are.

I used the [FeatureOps manifesto](https://featureops.io/) as the checklist for what that layer should contain.

## What the first release does

I tried to answer each of those problems directly.

The flag list shows every flag as one row with its state in each environment, and marks the flags that are switched differently between environments. Anyone on the team can check what is on where before a test session starts.

People are invited by link and don't need access to the Azure account. There are two roles, admin and member. An environment such as production can be protected, so that only admins change flags there.

Every change goes into an audit trail with who made it, in which environment, when, and the old and new values. Changes made outside Flagsweep, in the portal, the CLI or a pipeline, are marked as out of sync.

Every flag has an owner and a retire-by date, which is 90 days out unless you mark the flag permanent. Overdue flags get a badge, so the stale ones are easy to find.

## What I left out

This release handles boolean flags on Azure only. I had built multi-variant flags and AWS AppConfig support, and I removed both before the release. I wanted the first version to do one thing on one provider.

Flagsweep is self-hosted. It ships as one Docker image and keeps its data in a SQLite file, so the connection string to your store stays on your own infrastructure.

The licence is Apache-2.0. I chose it so that a company's open source policy doesn't stop anyone from installing it.

## Building it alone

I built most of Flagsweep while working full time as a contract principal engineer. I finished it while I was between jobs.

## What comes next

AWS AppConfig is next. After that I plan an Enterprise edition with approval workflows, single sign-on, drift alerts and CI integrations.

I don't know yet whether other teams feel this pain as strongly as the ones I worked with, and I'd like to find out before I build more. If your team keeps flags in a cloud store, tell me which one you use, roughly how many flags and environments you have, and what happens today when a flag goes stale.

The site and docs are at [flagsweep.com](https://flagsweep.com/), the code is on [GitHub](https://github.com/flagsweep-hq/flagsweep), and questions and ideas go in [Discussions](https://github.com/flagsweep-hq/flagsweep/discussions).
