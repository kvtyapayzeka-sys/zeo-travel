---
name: design-critic
description: Performs a rigorous visual, UX and conversion critique of a frontend and then improves the highest-impact issues. Use after substantial UI implementation or when reviewing a tourism, travel, accommodation, booking, landing, homepage, listing, or property page for generic AI aesthetics, weak hierarchy, poor mobile behavior, or template-like design.
---

# Design Critic

Review the interface as a senior design director, product designer, conversion specialist, and frontend QA reviewer.

Do not praise by default. Find what prevents the page from feeling deliberate, memorable, credible, and usable.

## Evidence first
If browser or Playwright tooling is available:
1. run the page;
2. inspect the rendered desktop view;
3. inspect a mobile view around 390px;
4. inspect relevant interaction states;
5. critique the rendered result, not only the source.

If visual rendering is unavailable, state internally that visual quality is not fully verified and use code/component structure as secondary evidence.

## Automatic red flags
Treat these as high-priority issues:
- page looks like a generic AI or template output;
- all sections use the same composition;
- “card soup”;
- overly rounded UI;
- generic gradients;
- arbitrary glassmorphism;
- generic SaaS typography;
- weak or inconsistent photographic direction;
- generic travel copy;
- hero has no recognizable concept;
- search/booking function is detached from the visual system;
- mobile is just stacked desktop;
- important accommodation facts are visually buried;
- repeated filler feature grids;
- fake social proof or invented commercial claims;
- accessibility sacrificed for aesthetics;
- animation used as decoration rather than communication.

## Scorecard
Score each category from 0–10.

### 1. Originality
Does the page have a specific visual idea?
Would it be recognizable without the logo?

### 2. Brand/destination fit
Does the design belong to this tourism product and destination?
Or could it be a fintech/SaaS/template with different photos?

### 3. Hierarchy
Is attention directed deliberately?
Is the primary action obvious?
Do secondary elements stay secondary?

### 4. Composition
Is there useful rhythm, contrast, alignment and whitespace?
Do sections vary intentionally without becoming chaotic?

### 5. Typography
Do fonts, scale, measure, tracking and line-height create character and readability?
Does the typography feel selected rather than defaulted?

### 6. Photography
Are image choices, crops, ratios and focal points coherent?
Does photography provide both emotion and proof?

### 7. Tourism UX
Can users quickly understand destination, suitability, key property facts and next action?
Are search/listing/detail flows efficient?

### 8. Mobile
Does the composition genuinely adapt?
Are controls touch-friendly and information priorities correct?

### 9. Motion and interaction
Are transitions meaningful and restrained?
Are states clear?
Does reduced-motion behavior exist where needed?

### 10. Accessibility and implementation quality
Check semantics, contrast, focus, keyboard access, responsive behavior, loading, layout shift, performance and component consistency.

## Overall rating
Calculate an overall score out of 100.

Interpretation:
- 90–100: distinctive and production-ready;
- 85–89: strong, but still refine obvious weak points;
- 75–84: competent but visibly template-like or inconsistent;
- 60–74: generic or structurally weak;
- below 60: redesign rather than polish.

A page with serious invented claims, broken mobile UX, inaccessible primary controls, or obvious generic-AI aesthetics cannot receive 90+.

## The AI-look audit
Explicitly look for:
1. gradient blobs;
2. generic dark navy + purple/blue accent;
3. glass cards;
4. uniform rounded cards;
5. repeated three-column grids;
6. Lucide/icon decoration everywhere;
7. pills used as decoration;
8. huge centered generic marketing copy;
9. same max-width on every section;
10. same vertical padding on every section;
11. repeated eyebrow/headline/paragraph formula;
12. bento grid with no information rationale;
13. random grain/noise;
14. over-animation;
15. generic stock imagery;
16. fake numbers/logos/reviews;
17. generic CTAs;
18. excessive badge systems;
19. tiny muted gray copy;
20. mobile layout that merely stacks desktop.

Flag each issue actually present. Do not flag absent patterns just to fill a list.

## The memorability test
After looking away from the page, what single visual behavior or composition would a user remember?

If the answer is “large photo and some cards,” memorability is inadequate.

Propose one *conceptually consistent* signature improvement, not five gimmicks.

## Conversion test
For the page type, determine the main user decision.

Examples:
- homepage: start discovery/search;
- listing: compare and narrow;
- property detail: establish fit/trust and move toward availability/booking;
- destination page: understand place and enter relevant inventory.

Check whether design hierarchy serves that decision.

## Tourism credibility test
Verify that:
- content does not invent availability, price, reviews, licenses or guarantees;
- destination wording is specific;
- property data hierarchy is practical;
- contact/trust information is not hidden;
- imagery matches product promises.

## Fix protocol
After critique:
1. rank issues by user/business impact, not personal taste;
2. identify the 3–5 highest-impact fixes;
3. implement those fixes when editing is within scope;
4. avoid unrelated refactoring;
5. re-check desktop and mobile;
6. re-score.

Do not stop after producing a critique if the user asked for implementation and the fixes are safe to make.

## Definition of done
Aim for 85+ without gaming the score.

Before completion, the interface should:
- feel intentional;
- avoid obvious AI-template patterns;
- have a recognizable visual thesis;
- remain easy to use;
- work on mobile;
- use verified content;
- preserve performance/accessibility;
- contain no major visual inconsistency.

If the page remains generic after polish, change the composition or art direction. Do not keep adding decorations.
