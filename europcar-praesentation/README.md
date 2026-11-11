# Europcar interview — interactive presentation

**Technical and content documentation · status: DRAFT · last updated 11 Nov 2026**

Live page: <https://jorgeaguilarsalas.github.io/emnify-case-interactives/europcar-praesentation/>

This document explains every view, every visual element, every interaction and every number in the interactive presentation prepared for the interview *Head of Fleet Planning & Lifecycle Management* (Europcar Mobility Group, 12 Nov 2026). It is written so that anyone (Jorge, a collaborator, or an AI assistant) can answer a follow-up question without reading the code.

> **Read this first.** The presentation mixes three kinds of content: **verified facts** (Jorge's CV and portfolio, the German minimum wage), **illustrative model inputs** (inherited from the Nexio Partner P&L Cockpit, not customer data), and **simulated values** (the 48-vehicle fleet in View 04). Section 2 lists which is which. Never quote an illustrative or simulated number as a real Nexio, customer or Europcar figure.

---

## Contents

0. [Version 2: five views, guided mode, figure policy](#0-version-2-reviewer-feedback-11-nov-2026--read-this-before-the-older-sections)
1. [What this is and how it is built](#1-what-this-is-and-how-it-is-built)
2. [Provenance: what is real, what is illustrative](#2-provenance-what-is-real-what-is-illustrative)
3. [The shell: welcome page and navigation](#3-the-shell-welcome-page-and-navigation)
4. [View 01 — Werdegang (career route, slide 3)](#4-view-01--werdegang-career-route-slide-3)
5. [View 03 — Nexio Fleet data flow (slide 4)](#5-view-03--nexio-fleet-data-flow-slide-4)
6. [View 04 — Business Intelligence case (slide 5)](#6-view-04--business-intelligence-case-slide-5)
7. [Shared UI conventions](#7-shared-ui-conventions)
8. [How to change something](#8-how-to-change-something)
9. [Appendix A — the 48 simulated vehicles](#appendix-a--the-48-simulated-vehicles)
10. [Appendix B — German terms used on screen](#appendix-b--german-terms-used-on-screen)
11. [Appendix C — version history](#appendix-c--version-history)

---

## 0. Version 2 (reviewer feedback, 11 Nov 2026) — read this before the older sections

Version 2 implements the reviewer feedback: People Management gets its own view, the presentation ends with an explicit Europcar closing view, a **guided mode** shows only 10 core steps, the Europcar data-flow mode is labelled as a conceptual model, and figures that are not in the approved deck were moved out of the main path.

**Numbering changed.** The page now has five views. Sections 1–8 below have been updated to the new numbers (in v1.1 the data flow was "View 02" and the BI case "View 03"):

| Now | View | Source file | Older section |
|---|---|---|---|
| 01 | Werdegang | `src/folie3_werdegang.html` | §4 |
| 02 | People Management (**new**) | `src/people_src.html` | §0.3 |
| 03 | Datenplattform (Nexio data flow) | `src/folie4_datenfluss.html` | §5 |
| 04 | Business Intelligence (48-vehicle case) | `src/folie5_bi.html` | §6 |
| 05 | Mein Beitrag bei Europcar (**new**) | `src/europcar_src.html` | §0.4 |

**Role of this page.** The approved Google Slides deck (v1.1) stays the primary presentation. This page is supporting material: either shown in guided mode, or opened in free mode to answer questions.

### 0.1 Guided mode (default) and free mode

The top bar has a switch **Geführt | Frei** (key `G`), a counter `n / 10` with arrows, and a thin indigo progress bar under the bar.

In **Geführt**, the arrow keys, space bar and the counter arrows move through exactly these 10 steps, whatever view is open:

| # | View | Step inside the view (0-based index) | What is said |
|---|---|---|---|
| 1 | 01 Werdegang | Überblick (0) | Route Wolt → Bolt → Bliq → Nexio, two trainings |
| 2 | 01 Werdegang | Roter Faden (5) | Menschen · Prozesse · Daten come together at Nexio |
| 3 | 02 People | Erfahrung bei Bliq (0) | 4 direct reports, five responsibilities, what I learned |
| 4 | 02 People | Ansatz bei Europcar (2) | Get to know the five specialists → standards → coaching/cross-training → clear ownership |
| 5 | 03 Datenplattform | Die Herausforderung (1) | Separate sources, no shared basis |
| 6 | 03 Datenplattform | Mein Beitrag (5) | My role: needs → requirements → priorities → build & test |
| 7 | 04 BI | Standzeit & Auslastung (3) | Answer to question 3 (maintenance, downtime, utilisation) |
| 8 | 04 BI | Szenarien (4) | Mindestlohn 2027 scenario and counter-measures |
| 9 | 05 Europcar | Mein Verständnis der Rolle (0) | Analytics Hub, three tasks |
| 10 | 05 Europcar | Zusammengefasst (2) | Three pillars, closing sentence, "Vielen Dank" |

Clicking a tab or a start-page card in guided mode jumps to the first core step of that view. Everything inside a view (step bar, details, vehicle grid, Nexio/Europcar switch) stays clickable; the next arrow press continues the guided route from where it was.

In **Frei**, arrows walk through every step of every view (the old behaviour, 6 + 3 + 7 + 7 + 3 = 26 steps), and pass from the last step of one view to the next view.

The start page has two buttons: *Geführte Präsentation starten* (guided step 1) and *Alle Details frei erkunden* (free mode, view 01). Keys: `0` start, `1`–`5` views, `G` mode, `F` fullscreen of the graphic, `I` details.

**Important for speaking.** The guided order puts People Management *before* the data platform. The DE-v1.2 script has a different order (slides 3, 4, 5, then People on slide 7), so transitions must be adapted when the guided mode is used.

Implementation: `GUIDE` array in `src/shell_template.html`; each view exposes `window.__goto(stepIndex)`. Views 01 and 03 start after fonts load, so a step requested before that is stored in `window.__initStep` and applied at start.

### 0.2 Figure policy (what is on the main path)

Only figures in the approved deck v1.1 appear on the main path (cards, chips, drawer headers):
- Wolt **−30 %** procurement cost for equipment.
- Bliq **4 direct reports** (never 6).

Changed in View 01 for v2:
- The Bolt chip now reads **"Bedarfssteuerung"** (was "Aktivierung 25 → 58 %").
- Drawer headers no longer show 2.000+ couriers, 25 → 58 %, −18 %, <50 → >80 %, 8 operators or 800+ drivers.

These CV and portfolio figures remain only inside the expanded **Belege** cell of each station (opened with "Details einblenden"):
- 25 → 58 % activation and −18 % cancellations (Bolt);
- <50 → >80 % partner retention and the €3M ARR pilot (Bliq);
- 8 operators / 800+ drivers and 60–70 % less admin effort (Nexio);
- the Ironhack diploma details.

**Jorge must confirm each of these against the CV before using it in the conversation.** Simulated BI numbers (View 04) remain labelled as illustrative.

The small canvas labels in View 01 were enlarged by 1 px:
- 8.5 → 9.5 px: station names inside competence blocks;
- 9.5 → 10.5 px: HEUTE, WEITERBILDUNG and the station year line.

### 0.3 View 02 — People Management (new)

A simple step view built with the shared `base.css` + `engine.js`. Text is taken from the DE-v1.2 People Management slide and Jorge's own management practice.

- **Step 1 "Erfahrung bei Bliq"**
  - Org chart: JA (Supply Operations Manager) plus four anonymous direct reports, numbered 1–4. No names or roles are invented.
  - Five responsibilities: tasks/projects distributed, KPIs tracked, regular 1:1s, coaching, input to performance reviews.
  - Learned: clear goals · ownership · regular feedback.
  - Drawer: role facts plus the script text.
- **Step 2 "Meine Arbeitsweise"** (free mode only, not in the guided route)
  - The 1:1 in five parts: Ankommen, Deine Themen zuerst, Meine Punkte, Nach vorne, Abschluss.
  - Four modes, with Unterstützung as the default: Orientierung, Unterstützung, Verbindlichkeit, Entwicklung, each with its key question.
  - Principle: "Ein 1:1 ist kein Status-Meeting".
  - Drawer: cadence (weekly 30 min; bi-weekly 45 min for senior staff; monthly 60 min development), rules, and the coaching loop.
- **Step 3 "Ansatz bei Europcar"**
  - Four phases: Kennenlernen (the five specialists) → Standards stärken → Entwicklung (coaching, cross-training) → Klare Verantwortung.
  - Goal statement.
  - The specialists' actual roles at Europcar are deliberately not described.

### 0.4 View 05 — Mein Beitrag bei Europcar (new)

Every step that describes Europcar carries the dashed blue label **"Mein Verständnis aus der Stellenausschreibung – keine Kenntnis interner Europcar-Systeme"**.

- **Step 1 "Mein Verständnis der Rolle"**
  - Analytics Hub with three tasks:
    1. Daten verbinden: purchasing, maintenance, damage, remarketing, operations; data quality; shared KPIs.
    2. Wirtschaftlichkeit & Lebenszyklus: TCO, repair cost, downtime, holding period, residual values; demand-based fleet planning; utilisation.
    3. Planung & Szenarien: annual/budget planning, forecasts and scenarios with Fleet Controlling.
- **Step 2 "Wie ich vorgehe"**
  - "Erst verstehen, dann gemeinsam verbessern": not copying the Nexio model; first understand the existing systems with Fleet Controlling, the Fleet Director and the business units.
  - Mapping from experience to task:
    - Datenintegration (Nexio) → task 1;
    - Fleet Economics & BI → task 2;
    - Budgets & Szenarien (Bliq · BI) → task 3;
    - Teamführung (Bliq, 4 direct reports) → team of five specialists.
- **Step 3 "Zusammengefasst"**
  - Pillars: Flottenbetrieb · Datenintegration · Teamführung.
  - "Genau diese Kombination möchte ich bei Europcar einbringen und weiterentwickeln. Vielen Dank. Ich freue mich auf eure Fragen."

### 0.5 Conceptual-model label in View 03 (data flow)

When the Nexio/Europcar switch is on **Europcar**, a dashed blue pill appears in the legend under the graphic:
- Text: "Konzeptmodell – keine Kenntnis interner Europcar-Systeme".
- Implementation: CSS `body.ecmode .ecnote{display:inline-flex}`.

### 0.6 Offline backup

`Europcar_Praesentation_Backup.pdf` (in Drive) has 11 landscape pages: the start page plus the 10 guided steps. Screenshots were taken at 1440×900 at 2× resolution. Use it if the browser or network fails during screen sharing.

### 0.7 Build

`python3 europcar-praesentation/src/build_index.py` (run from the repo root) builds the published page `europcar-praesentation/index.html`:
- it inlines `base.css` and `engine.js` into `people_src.html` and `europcar_src.html` at the markers `/*BASE_CSS*/` and `/*ENGINE_JS*/`;
- it embeds the five views into the shell (`var SRC=[null,P1..P5]`).

An optional argument sets another output path. Outside a `src/` folder (Jorge's working copy), the default output is `Europcar_Praesentation.html` next to the script, plus standalone copies of Views 02 and 05.

---

## 1. What this is and how it is built

### 1.1 Purpose

The slide deck *Europcar — HR Interview — Presentation v1.1* has seven content slides. Slides 3, 4 and 5 each received an interactive companion view, and v2 added two short views for People Management and the Europcar closing (see §0). They can be rehearsed, shown in guided mode, or used in Q&A:

| View | Deck slide | Deck title | Question from the agenda slide |
|---|---|---|---|
| 01 · Werdegang | 3 | 01 / Mein Hintergrund | Welche Erfahrung bringe ich mit? |
| 02 · People Management | 7 | People Management | Wie führe ich ein Team? |
| 03 · Datenplattform | 4 | 02 / Nexio Fleet in der Praxis | Wie entwickeln wir bei Nexio Fleet eine zentrale Daten- und Analyseplattform? |
| 04 · Business Intelligence | 5 | 03 / Business Intelligence | (same question, economic side) |

| 05 · Mein Beitrag bei Europcar | 6–8 | Mein Beitrag bei Europcar / Zusammenfassung | Was davon ist für Europcar relevant? |

Agenda question 3 (*Was davon ist für Europcar relevant?*) is answered by View 05 (and by deck slides 6–8). The BI view still ends with a short bridge to Europcar.

All on-screen text is **German** (informal *du*-form script DE-v1.2). This documentation is in English.

### 1.2 Files

| Path | What it is |
|---|---|
| `europcar-praesentation/index.html` | The published page. **Built file**: the welcome page plus the five views embedded inside it. Do not edit by hand; rebuild it (section 8). |
| `europcar-praesentation/src/shell_template.html` | Welcome page, top bar and navigation logic. Also holds the guided-mode route (`GUIDE`). Contains the placeholder `var SRC=[null,/*P1*/,/*P2*/,/*P3*/,/*P4*/,/*P5*/];`. |
| `europcar-praesentation/src/folie3_werdegang.html` | View 01, standalone page. |
| `europcar-praesentation/src/people_src.html` | View 02 People Management. Needs `base.css` + `engine.js` inlined by the build (open the built page, not this file). |
| `europcar-praesentation/src/folie4_datenfluss.html` | View 03, standalone page (Jorge's own edited version, v3). |
| `europcar-praesentation/src/folie5_bi.html` | View 04, standalone page. |
| `europcar-praesentation/src/europcar_src.html` | View 05 Mein Beitrag bei Europcar. Same build requirement as View 02. |
| `europcar-praesentation/src/base.css`, `src/engine.js` | Shared styles and step engine of Views 02 and 05 (page defines `window.VIEW={steps:[…]}`). |
| `europcar-praesentation/src/build_index.py` | Builds `index.html` from the shell, the five views and the two shared files. |
| `europcar/index.html` + `europcar/i18n.js` | The separate *Nexio Partner P&L Cockpit* (documented in `europcar/README.md`). View 04 reuses its per-vehicle-day constants. |

Views 01, 03 and 04 also work on their own (open the file directly in a browser). Views 02 and 05 only work after the build. The offline backup PDF (11 pages) is kept in Drive, not in the repo.

### 1.3 Technology

- Plain HTML, CSS and vanilla JavaScript. No framework, no build tool other than the small Python script, no external data.
- Fonts: Inter and JetBrains Mono from Google Fonts. Without internet the system font is used, and everything else still works.
- Views 01 and 03 draw on an HTML `<canvas>` (animated, redrawn every frame with `requestAnimationFrame`). View 04 uses HTML plus inline SVG charts.
- All five views are forced to light theme (`<html data-theme="light">`).
- The shell embeds each view as an `<iframe srcdoc>`. The view's HTML is stored as a JSON string inside the shell and only loaded when the view is first opened.

---

## 2. Provenance: what is real, what is illustrative

| Category | Where it appears | Source | May be quoted as fact? |
|---|---|---|---|
| Job titles, employers, dates | View 01 cards, detail panels | Jorge's CV and portfolio (jorgeag.com), verified bullet bank | Yes |
| Wolt: equipment procurement −30 % vs prior year; 2,000+ couriers in 6 cities; ~525 weekly courier contacts restructured | View 01 | CV / portfolio || Main path: only −30 % (Wolt) and 4 direct reports (Bliq), both in the approved deck. All other figures only in the expanded *Belege*; **Jorge confirms each against the CV before quoting it.** |
| Bolt: activation ~25 % → ~58 % across 1,000+ registrations in six weeks; cancellation rate −18 % | View 01 | CV / portfolio || Main path: only −30 % (Wolt) and 4 direct reports (Bliq), both in the approved deck. All other figures only in the expanded *Belege*; **Jorge confirms each against the CV before quoting it.** |
| Bliq: **4 direct reports**; partner retention <50 % → >80 %; €3M ARR cross-functional pilot in four months | View 01 | CV / portfolio. Never "6 direct reports". || Main path: only −30 % (Wolt) and 4 direct reports (Bliq), both in the approved deck. All other figures only in the expanded *Belege*; **Jorge confirms each against the CV before quoting it.** |
| Nexio Fleet: title *Senior Strategy & Operations Manager*; used by 8 fleet operators with 800+ drivers in Berlin and Brandenburg; operators report ~60–70 % less admin time per compliance cycle | View 01 | CV / portfolio || Main path: only −30 % (Wolt) and 4 direct reports (Bliq), both in the approved deck. All other figures only in the expanded *Belege*; **Jorge confirms each against the CV before quoting it.** |
| Ironhack Data Analytics (Mar–Jun 2023) and DevOps & Cloud Computing (Jan–Mar 2026) | View 01 | Portfolio education section || Main path: only −30 % (Wolt) and 4 direct reports (Bliq), both in the approved deck. All other figures only in the expanded *Belege*; **Jorge confirms each against the CV before quoting it.** |
| German minimum wage €13.90/h (2026), €14.60/h from 1 Jan 2027 | View 04 | Decision of the *Mindestlohnkommission*, adopted by regulation | Yes |
| Per-vehicle-day constants: gross €393.10, commission 22.5 %, driver €221.80, fixed €42, variable €30 | View 04 | *Nexio Partner P&L Cockpit*, itself an **illustrative** model | No: "illustrative model" |
| The 48 vehicles (age, km, days, repairs, damage, revenue spread) | View 04 | **Simulated** with a fixed random seed | No: "simulated example" |
| Fleet result €6,495/month, break-even 24.2 days, 15 of 48 loss-making, scenario deltas | View 04 | **Calculated** from the above | Only as "in this illustrative example" |
| Data sources, checks ("Prüffälle"), KPI example definitions | View 03 | Written as **typical** examples of fleet data work | No: "typical example" |
| Europcar mirror (data areas, decisions, mappings) and the Analytics Hub tasks | Views 03, 04 and 05 | **Hypothesis** derived from the job description | No: "my understanding / hypothesis" |
| Thickness of competence blocks | View 01 | **Qualitative** self-assessment | No: illustrative |
| Bliq team facts (4 direct reports, responsibilities) | View 02 | CV and deck v1.1 | Yes |
| 1:1 structure, four modes, cadence | View 02 | Jorge's own management practice | Yes, as "how I work" |
| Team of five specialists at Europcar | Views 02 and 05 | Job description | Yes, as stated in the job ad |

---

## 3. The shell: welcome page and navigation

### 3.1 Layout

- **Top bar (fixed, 56 px), left to right:**
  - monogram "JA", name, and the line *Head of Fleet Planning & Lifecycle Management · 12.11.2026* (click: welcome page);
  - tabs *Start · 01 Werdegang · 02 People · 03 Datenplattform · 04 BI · 05 Europcar*;
  - in guided mode only: back arrow, counter `n / 10`, forward arrow;
  - the mode switch *Geführt | Frei*;
  - a full-screen button for the whole presentation.
  - In guided mode a 3 px indigo progress bar sits under the top bar.
- **Welcome page:**
  - kicker *Europcar Mobility Group · Gespräch am 12. November 2026* and the title;
  - section *Fünf Ansichten · ein roter Faden* with five cards (three in the first row, two centred below), each with a small animated SVG: route, org chart with four reports, data flow, result bars, Analytics Hub;
  - buttons *Geführte Präsentation starten* and *Alle Details frei erkunden*, plus a keyboard legend.
- **View area:** one iframe per view below the top bar; only the active one is visible.

### 3.2 Navigation logic

The page starts in **guided mode** (§0.1).

| Input | Guided mode | Free mode |
|---|---|---|
| `→`, `Space`, `PageDown`, forward arrow in top bar | Next of the 10 core steps (from the welcome page: core step 1). After step 10: toast "Ende der Präsentation". | Next step inside the view; on the last step of a view, opens the next view. After View 05: "Ende der Präsentation". |
| `←`, `PageUp` | Previous core step; before step 1: welcome page. | Previous step; on step 1, goes back to the previous view and fast-forwards it to its last step. |
| Card, tab, `1`–`5` | First core step of that view. | Opens that view where it was left. |
| `0`, monogram | Welcome page. | Welcome page. |
| `G` or the switch | Toggles mode. Switching to guided picks the first core step of the current view. | |
| Clicks inside a view | Always allowed (step pills, details, vehicle grid, Nexio/Europcar switch). The next arrow continues from the current core step. | |

How it works:

- Each view exposes `window.__goto(i)`. The shell calls it to show a given step. If a view is not ready yet, the shell keeps the request and applies it after loading. Views 01 and 03 store it in `window.__initStep` until their fonts are loaded.
- The shell intercepts keys inside the iframes in the capture phase. In free mode it reads the step counter (`#capN`, "n / N") to know when a view ends.
- The URL hash (`#0`–`#5`) is updated so a reload returns to the same view. The update is wrapped in `try/catch` because sandboxed previews forbid it.
- A toast in the bottom centre briefly shows the core step (for example "3 / 10 · People · Erfahrung bei Bliq") or the view name.

---

## 4. View 01 — Werdegang (career route, slide 3)

### 4.1 Story

The view tells *"Von Operations zur datenbasierten Flottensteuerung"*:

- four employers (Wolt → Bolt → Bliq → Nexio Fleet), plus a start as courier partner;
- two trainings: Ironhack Data Analytics and DevOps & Cloud;
- how each stage added to three competence areas: **Menschen** (people), **Prozesse** (processes) and **Daten** (data).

The three areas together are the *roter Faden*, which is the closing sentence of slide 3.

### 4.2 Steps (match the DE-v1.2 script of slide 3)

| # | Step | Caption | Car drives to | Detail panel shows |
|---|---|---|---|---|
| 1 | Überblick | Von Operations zur datenbasierten Flottensteuerung. | Replays the whole route from the start to *heute* | Overview, key numbers "4 Stationen · 2 Weiterbildungen" |
| 2 | Wolt | Prozesse und Bestände steuern – Beschaffungskosten rund −30 %. | End of Wolt (Feb 2023) | Station 01 |
| 3 | Bolt | Flottenpartner, Fahreraktivierung, Angebot nach Nachfrage. | End of Bolt (Jun 2024) | Station 02 |
| 4 | Bliq | Mehr Verantwortung: Team, Budgets, KPIs, Partnerprogramme. | End of Bliq (Jul 2025) | Station 03 |
| 5 | Nexio Fleet | Heute: eine zentrale Daten- und Analyseplattform mitentwickeln. | *heute* (Nov 2026) | Station 04 |
| 6 | Roter Faden | Menschen, Prozesse und Daten verbinden, um bessere Ergebnisse zu erreichen. | stays at *heute* | Three columns Menschen / Prozesse / Daten with the Europcar meaning |

### 4.3 Canvas elements (top to bottom)

1. **Station cards** (four white cards). Each shows:
   - number and years;
   - company;
   - a sub-line identical to the deck slide;
   - a green chip with the slide's key fact: *Einkauf −30 %*, *Bedarfssteuerung*, *4 direkte Mitarbeitende*, *Datenplattform* (v2: the Bolt chip no longer shows 25 → 58 %).

   A dashed line connects each card to its station on the road. The active card gets a dark border and a left accent bar; the others fade.
2. **Road (time axis)** from Oct 2020 to Nov 2026, with year ticks 2021–2026 and the label *HEUTE*. The part already driven turns dark. Station markers are rings that fill when the car has passed them; the active one pulses. The left end is labelled *Start als Kurierpartner*.
3. **Car**: a side-view sedan. Speed follows `v = max(0.4, 1.5 × remaining distance)` in years per second, so it eases into each station. The wheels turn and the body bounces slightly while moving.
4. **Weiterbildung lane**: two orange pills on a dotted line below the road, *Data Analytics · 2023* and *DevOps & Cloud · 2026*. They are faded until the car has reached their start date.
5. **Kompetenzprofil**: three rows (Menschen = indigo, Prozesse = teal, Daten = green). Each row is filled with blocks in chronological order.
   - Block width = gain × 142 px × progress.
   - Progress is how far the car has travelled through that stage (0–1), so blocks grow while the car drives.
   - Training blocks are orange.
   - In each block: the source in small caps, then a short label.
6. **Roter Faden node** on the right. A bracket joins the three rows into a ringed node labelled *ROTER FADEN · Menschen, Prozesse und Daten verbinden*. It is faint until the car reaches *heute*, and drawn solid and pulsing in step 6.

### 4.4 Data behind the canvas

Timeline (decimal years used by the code):

| Item | Start | End | Shown dates |
|---|---|---|---|
| Kurierpartner (Wolt) | 2020.75 | 2021.08 | Oct 2020 – Feb 2021 |
| Wolt, Operations Associate (Service & Gear Operations) | 2021.08 | 2023.08 | Feb 2021 – Feb 2023 |
| Ironhack Diploma Data Analytics | 2023.17 | 2023.42 | Mar – Jun 2023 |
| Bolt, Operations Specialist (München / Süddeutschland) | 2023.42 | 2024.42 | Jun 2023 – Jun 2024 |
| Bliq, Supply Operations Manager (Berlin) | 2024.50 | 2025.50 | Jul 2024 – Jul 2025 |
| Nexio Fleet, Senior Strategy & Operations Manager (Berlin & Brandenburg) | 2025.50 | 2026.86 (*heute*) | since Jul 2025 |
| Ironhack Diploma DevOps & Cloud Computing | 2026.00 | 2026.21 | Jan – Mar 2026 |

Competence gains (qualitative units; 1 unit = 142 px). Labels on the canvas are shortened where blocks are narrow; the full label appears in the detail panel.

| Source | Menschen | Prozesse | Daten |
|---|---|---|---|
| Kurierpartner | 0.5 · Frontline: Kuriere | 0.5 · Abläufe von innen | – |
| Wolt | 1.0 · Gear-Team koordiniert | 1.5 · Lager- & Serviceprozesse | 0.5 · Bestandsanalyse |
| Ironhack Data Analytics | – | – | 1.0 · Data Analytics |
| Bolt | 0.5 · Fahrer & Flottenpartner | 0.5 · Onboarding-Funnel | 1.0 · Funnel-Daten |
| Bliq | 1.5 · 4 direkte Mitarbeitende | 0.5 · SLAs & Partnerprogramme | 0.5 · KPIs & Budgets |
| Nexio Fleet | 0.5 · Betreiber & Entwickler | 1.0 · Anforderungen & Prozesse | 1.5 · Datenplattform & BI |
| Ironhack DevOps & Cloud | – | 0.45 · CI/CD | 0.5 · Cloud & DevOps |
| **Total** | **4.0** | **4.45** | **5.0** |

The design intent is that each employer strengthened one area most: Prozesse at Wolt, Daten at Bolt, Menschen at Bliq, and all three at Nexio. These widths are a self-assessment, not a measurement.

### 4.5 Detail panel per station

Each station panel has the same structure. The header shows the title and the dates; since v2 it shows key numbers only where they are in the approved deck (Wolt −30 %, Bliq 4 direct reports). The overview header shows *4 Stationen · 2 Weiterbildungen*. The body has three boxes: *Was ich gemacht habe*, *Belege* (evidence) and *Relevanz für Europcar*.

- **Wolt**
  - Header number: −30 % procurement cost for equipment. (2,000+ couriers in 6 cities was removed from the header in v2.)
  - What I did: introduced and ran the gear-warehouse processes; analysed stock; improved the workflow; took back, refurbished and reissued equipment; ran courier onboarding and offboarding in Berlin and coordinated a small team of Gear Associates.
  - Evidence: −30 % vs the prior year; ~525 weekly courier contacts moved into a categorised service model.
  - Europcar: steering stock, returns and reuse follows the same logic as vehicles over their lifecycle.
- **Bolt**
  - Header number: none since v2. Evidence (expanded only): activation ~25 → ~58 % with 1,000+ registrations in six weeks; cancellation rate −18 %.
  - What I did: worked with fleet partners (partnerships, account management, operations); measured the funnel from registration to first ride; planned supply against demand.
  - Europcar: matching supply to demand is the core of fleet planning.
- **Bliq**
  - Header number: 4 direct reports. (Partner retention <50 → >80 % is now only in the evidence box.)
  - What I did: with four direct reports I assigned tasks, tracked KPIs, ran 1:1s, coached and took part in performance reviews; ran supply budgets, KPIs and partner programmes; built an earnings-per-hour model with SLAs.
  - Evidence: the retention result; the €3M ARR pilot in four months.
  - Europcar: leading a team of five specialists and steering budgets and KPIs.
- **Nexio Fleet**
  - Header number: none since v2. (8 operators / 800+ drivers is only in the evidence box.)
  - What I did: involved from the start in building a central data and analytics platform; defined requirements, processes and KPIs; prioritised features; implemented and tested them with the developer team.
  - Evidence: the operator and driver numbers; operators report ~60–70 % less admin time.
  - Europcar: data integration, shared KPIs and BI for TCO and P&L are exactly what an Analytics Hub needs.
- **Trainings** (click a pill or an orange block):
  - Data Analytics: Python, MySQL, Tableau, Pandas, statistics, data visualisation, applied ML. Europcar: understanding and checking analyses and models, and prioritising with analysts as a peer.
  - DevOps & Cloud: CI/CD, Terraform, Docker, Kubernetes, AWS, Azure, monitoring, cloud governance. Europcar: talking to IT and data engineering about pipelines, cloud infrastructure and running an Analytics Hub.
- **Threads** (click a row label):
  - lists every contribution to that area, station by station;
  - adds the Europcar meaning. Menschen: lead five specialists and work with Fleet Controlling, the Fleet Director and the business functions. Prozesse: improve planning, budget and forecast processes with Fleet Controlling. Daten: an Analytics Hub joining data, shared KPIs, TCO, lifecycle and scenarios.

### 4.6 Interactions

- Click a station card, a station marker or any employer block to jump to that step.
- Click a training pill or block to open the training panel.
- Click a row label to see the thread panel.
- Click the Roter Faden node to go to step 6.
- `Esc` closes the panel or clears the selection. `I` toggles the panel. `F` puts the graphic in full screen.

---

## 5. View 03 — Nexio Fleet data flow (slide 4)

This view is Jorge's own edited version (v3). It was kept unchanged except for one shared change: the detail panel now opens downwards (section 7).

### 5.1 Story

Data from separate systems is integrated, structured and checked, becomes one shared data basis and shared KPIs, and finally supports decisions. Jorge's role (*Mein Beitrag*) is shown as a separate band. A switch at the top right (*Nexio / Europcar*) relabels everything as a **hypothetical** Europcar Analytics Hub.

### 5.2 Steps (match the DE-v1.2 script of slide 4)

| # | Step | What the canvas does |
|---|---|---|
| 1 | Überblick | The full flow runs: dots leave the five sources, pass integration and structuring, and reach KPIs and decisions. |
| 2 | Die Herausforderung | Only the sources are active. Dots bounce inside each source box ("silos"), red dashed broken links with an ×, and the text *Getrennte Systeme: keine gemeinsame Sicht, keine gemeinsamen Definitionen.* |
| 3 | Datenquellen | Dots flow from the sources into *Datenintegration* and stop there. |
| 4 | Strukturieren & prüfen | Dots continue through *Strukturieren*. About 13 % are flagged: they turn orange and drop into the tray *MARKIERTE PRÜFFÄLLE*. The others turn green and merge at the node *EINE GEMEINSAME DATENBASIS*. |
| 5 | Gemeinsame Kennzahlen | Green dots continue into the three KPI boxes, which glow. |
| 6 | Mein Beitrag | The animation pauses automatically and the indigo band slides in. The band shows six steps: needs of the fleet operators → requirements → processes → KPI design → prioritisation → implementation & tests, with a dashed loop back. Dotted lines show where the role touches the system (integration, checks, KPIs). Sources and decisions are greyed out. |
| 7 | Entscheidungen | Full flow again; the four decision boxes glow. Leaving step 6 restarts the animation if it was paused automatically. |

### 5.3 Elements (Nexio mode)

| Column | Box | Sub-line | Typical check shown in the panel |
|---|---|---|---|
| Datenquellen | Plattformen | Fahrten · Umsatz | Trip without a clear driver or vehicle |
| | Fahrzeuge | Telematik · Wartung | Telematics mileage does not match the workshop invoice |
| | Operations | Fahrer · Schichten | Overlapping shifts or a shift without a vehicle |
| | Finanzen | Kosten · Billing | Cost line with no vehicle or cost centre |
| | Compliance | Zeiten · Regeln | Working time above the legal limit |
| Nexio Fleet | Datenintegration | API · Datenimport · App | – |
| | Strukturieren | Normalisieren · Prüfen · Verknüpfen | Flagged records are marked, not silently accepted |
| Analytik & KPIs | Operative KPIs | Verfügbarkeit · Nutzung | Example: availability = ready vehicle-days ÷ total vehicle-days |
| | Wirtschaftliche KPIs | Umsatz · Kosten · Auslastung | Example: result per vehicle and month = revenue − variable − fixed costs |
| | Datenqualität & Regeln | Plausibilität · Arbeitszeiten | Example: share of records passing all checks |
| Entscheidungen | 01 Verfügbarkeit & Einsatz, 02 Kosten & Profitabilität, 03 Risiken & Compliance, 04 Budget & Abweichungen | – | Each panel lists the KPIs and sources it relies on |

Which source feeds which KPI, and which KPI feeds which decision, is fixed in two tables in the code. They drive both the dot routing and the highlighting when a box is clicked.

| Source → KPIs (Nexio) | Operative | Wirtschaftlich | Datenqualität |
|---|---|---|---|
| Plattformen | ✓ | ✓ | ✓ |
| Fahrzeuge | ✓ | ✓ | ✓ |
| Operations | ✓ | ✓ | ✓ |
| Finanzen | | ✓ | |
| Compliance | | | ✓ |

| KPI → decisions (Nexio) | 01 Verfügbarkeit | 02 Kosten | 03 Risiken | 04 Budget |
|---|---|---|---|---|
| Operative KPIs | ✓ | | ✓ | |
| Wirtschaftliche KPIs | | ✓ | | ✓ |
| Datenqualität & Regeln | ✓ | | ✓ | |

### 5.4 Europcar mode (hypothesis)

The column titles become *FLOTTENBEREICHE · ANALYTICS HUB · ANALYTIK & KPIs · ENTSCHEIDUNGEN*, and every caption changes to a Europcar wording. Since v2 a dashed blue pill **"Konzeptmodell – keine Kenntnis interner Europcar-Systeme"** is shown in the legend while this mode is on.

- **Sources:**
  - *Fleet Einkauf* (orders · buy-back);
  - *Instandhaltung* (maintenance · repairs);
  - *Schadenmanagement* (damage · recovery);
  - *Remarketing* (residual values · sales);
  - *Operations* (stations · utilisation).

  Each has its own example check, for example "vehicle in stock without a matching order or contract type".
- **Middle:**
  - integration = "existing systems: understand first, then build interfaces where missing";
  - structuring = "definitions with Fleet Controlling, checks, linking by vehicle from order to sale";
  - data basis = "one vehicle, one history".
- **KPIs:**
  - operational (availability · *Standzeiten*);
  - economic (TCO · costs · residual values);
  - data quality (plausibility · definitions).
- **Decisions:**
  - demand & in-fleeting;
  - TCO & holding period;
  - residual value & remarketing;
  - budget & forecast.
- **Role band:** questions from the business functions → requirements → definitions → KPI design → prioritisation → implementation with team & IT.
- **Mappings:**
  - sources → KPIs: Einkauf → economic, quality; Instandhaltung → operational, economic; Schaden → economic, quality, operational; Remarketing → economic; Operations → operational, quality.
  - KPIs → decisions: operational → demand, TCO; economic → TCO, residual value, budget; quality → budget, demand.

These are Jorge's reading of the job description, not Europcar facts.

### 5.5 Animation parameters

| Parameter | Value |
|---|---|
| New dots | 4.5 per second (2 with reduced motion) |
| Dot speed | 72 px/s (45 with reduced motion) |
| Share flagged as Prüffall | 13 % (random) |
| Tray | keeps the last 26 flagged dots |
| Pre-fill when entering a step | 300 simulation ticks, so a step never starts empty |
| Role band highlight | the animation pauses automatically in step 6, so the chips stay still; after resuming with `P` the highlight moves one chip every ~4.5 s |

The dot counts are purely visual and carry **no data meaning** (the panel says so).

### 5.6 Interactions

- Click any box. Its connections stay lit, the rest fades, and the panel explains the box and lists linked KPIs, decisions or sources as clickable chips.
- Click again or press `Esc` to clear.
- Keys: `E` switches Nexio/Europcar, `P` pauses, `F` full screen, `I` toggles the panel.

---

## 6. View 04 — Business Intelligence case (slide 5)

### 6.1 Story

A fictional **ride-hailing rental-car fleet (Mietwagen) with 48 vehicles**, employed drivers, operating on platforms such as Uber and Bolt. On average the fleet makes money, but only 1.3 % of revenue. The view shows how BI answers the three questions of slide 5:

1. What is the total cost per vehicle?
2. Which costs drive profitability?
3. What role do maintenance, idle days and utilisation play?

It then simulates scenarios, shows Jorge's role and bridges to Europcar.

### 6.2 Model inputs

| Symbol | Meaning | Value | Source |
|---|---|---|---|
| `MD` | days per month | 30.4 | convention |
| `G0` | reference gross revenue per **active day** (day with a driver) | €393.10 | Nexio cockpit (illustrative) |
| `c` | platform commission | 22.5 % of gross | Nexio cockpit (illustrative) |
| `DRV0` | loaded driver cost per active day at €13.90/h | €221.80 | Nexio cockpit (illustrative; 12.6 driver-hours × €17.60 loaded cost) |
| `VAR` | variable vehicle cost per active day (energy, maintenance, cleaning, net damage) | €30.00 | Nexio cockpit (illustrative) |
| `FIX` | fixed vehicle cost per **calendar** day (leasing/depreciation, insurance, licence, telematics) | €42.00 | Nexio cockpit (illustrative) |
| `FIXNEW` | fixed cost per day of a replacement (new) vehicle | €48.00 | assumption for the replacement scenario |
| `mw` | minimum wage | €13.90 (2026) / €14.60 (2027) | verified |

**Driver cost scales with the minimum wage:** `driver per active day = 221.80 × mw / 13.90`. This is a simplification: the whole loaded driver cost is assumed to move in proportion to the minimum wage.

### 6.3 How the 48 vehicles are generated

Deterministic pseudo-random generator (*mulberry32*, seed 42): the fleet is identical on every load. For each vehicle *i* = 1…48, in this order:

```
age_months = round(3 + R×42)                          → 3 … 45 months
km         = round(age_months × 6,150 × (0.85 + R×0.30))   (≈ 73,800 km/year, ±15 %)
workshop_days = (km > 180,000) ? 1 + R×3 : R×1.2       per month
no_driver_days = (R < 0.30) ? 2 + R×5 : R×1.5          per month (30 % of cars have driver gaps)
idle_days  = min(12, workshop_days + no_driver_days + 0.8)   (0.8 = other downtime: cleaning, transfers)
active_days d = round1(30.4 − idle_days)
G (gross per active day) = 393.10 × (0.97 + R×0.09)    → €381.31 … €416.69
damage     = (R < 0.15) ? 150 + R×450 : 0              € per month (15 % of cars)
repairs    = max(0, km − 150,000) × 0.0028 + damage    € per month, rounded
```

`R` is the next random number. Repairs grow with the odometer: €0 below 150,000 km, about €140/month at 200,000 km, €280/month at 250,000 km. The full resulting table is in Appendix A.

Fleet profile: ages 3–45 months, km from 26,777 to 292,239; 20 vehicles above 150,000 km and 13 above 200,000 km; 5 with a damage event; active days 20.1–29.3, average 26.15.

### 6.4 Formulas per vehicle and month

```
d        = active days            idle = 30.4 − d
revenue  = G × d
commission = revenue × c
driver   = 221.80 × (mw / 13.90) × d
variable = 30 × d
contribution (Deckungsbeitrag) = revenue − commission − driver − variable
fixed on active days = FIX × d
fixed on idle days   = FIX × idle            (cost without revenue)
fixed total          = FIX × 30.4 = €1,276.80
result (Ergebnis)    = contribution − fixed total − repairs
vehicle cost         = fixed total + variable + repairs        ("TCO je Fahrzeug" in this view)
vehicle cost per active day = vehicle cost ÷ d
```

**Contribution per active day** at reference revenue: 393.10 × (1 − 0.225) − 221.80 − 30 = **€52.85**.

**Break-even active days** (fleet reference, no repairs):

```
BE = FIX × 30.4 ÷ (G0 × (1 − c) − DRV0 × mw/13.90 − VAR)
   = 1,276.80 ÷ 52.85 = 24.16 days per month
```

At €14.60 the break-even becomes 30.63 days, which is above the 30.4 days of a month: at the reference revenue no vehicle can break even. The KPI tile then shows *nicht erreichbar*.

**Important interpretation.** An idle day does not "cost €42": the fixed cost is paid anyway. What an idle day really costs is the **lost contribution of €52.85**. The chart annotation "42,00 € Fixkosten je Standtag, ohne Umsatz" describes the fixed cost that runs without revenue; the economic loss per lost day is €52.85.

### 6.5 Fleet totals (base case, €/month)

| Line | Amount |
|---|---|
| Gross revenue (Umsatz brutto) | €502,715 |
| − Commission | −€113,111 |
| − Drivers | −€278,359 |
| − Variable vehicle costs | −€37,650 |
| **= Contribution (Deckungsbeitrag)** | **€73,595** |
| − Fixed costs (all calendar days) | −€61,286 |
|   of which on idle days | (€8,576) |
| − Repairs & damage | −€5,814 |
| **= Result (Ergebnis)** | **€6,495** |

Further base figures:

- Result as share of gross revenue: **1.29 %**.
- Average active days: **26.15**.
- Loss-making vehicles: **15 of 48**. Of these, 8 are below the 24.2-day break-even (idle days) and 7 are above it but lose money through repairs/damage or below-average revenue. 3 vehicles are below the break-even but still positive thanks to above-reference revenue per day.
- Vehicle cost per active day ranges from **€73.58 to €108.78**.
- Results range from **€722 to +€703** per vehicle and month.

### 6.6 Right-hand panel (always visible)

- **Four KPI tiles:**
  - fleet result per month (with margin, or with the delta to base in step 5);
  - vehicles in loss ("x von 48");
  - average active days ("von 30,4 Kalendertagen");
  - break-even active days ("bei Ø Umsatz je Einsatztag").

  Numbers animate (count up) when they change.
- **Fleet grid:** 48 tiles, numbered 1–48 = F-01…F-48. The colour depends on the step:
  - step 1: neutral;
  - step 2: cost per active day, light to dark orange between the fleet minimum and maximum;
  - steps 3–7: result per vehicle, on a diverging scale −€600 (orange) … 0 (white) … +€600 (green), clipped beyond ±600. In step 5 the scenario result is shown.
- Clicking a tile selects the vehicle and opens its P&L in the detail panel.

### 6.7 Steps and charts

| # | Step | Left panel | Script line (DE-v1.2) |
|---|---|---|---|
| 1 | Die Fragen | Three question cards and the box "Flottenergebnis heute €6,495 / Monat · nur 1,3 % vom Umsatz" | *Ein wichtiger Teil meiner Arbeit ist es, herauszufinden, welche Informationen Flottenbetreiber … brauchen.* |
| 2 | 01 · TCO je Fahrzeug | Stacked bars for all 48 vehicles (see below) | *Wie hoch sind die Gesamtkosten pro Fahrzeug?* |
| 3 | 02 · Flotten-P&L | Waterfall from gross revenue to result, for the fleet or for a clicked vehicle (button "← Flotte" returns) | *Welche Kosten beeinflussen die Profitabilität?* |
| 4 | Standzeit & Auslastung | Scatter of result vs active days with break-even line | *Und welche Rolle spielen Wartung, Standzeiten und Auslastung?* |
| 5 | 03 · Szenarien | Levers, presets and result bridge | *Je nach Kundenbedarf entwickeln wir passende Kennzahlen, Analysen für TCO und P&L sowie individuelle Funktionen und Szenarien.* |
| 6 | Mein Beitrag | Four process cards | *Mein Beitrag ist es, … die Fragestellungen zu klären, den Datenbedarf zu definieren und … die Analysen zu priorisieren.* |
| 7 | Brücke zu Europcar | Transfer table | *Genau hier sehe ich eine wichtige Verbindung zu Fleet Planning und Lifecycle Management bei Europcar.* |

**Step 2: TCO bars.**
- One bar per vehicle, sorted from the highest to the lowest **vehicle cost per active day**.
- Each bar stacks four parts: fixed cost on active days (slate), fixed cost on idle days (orange), variable cost (grey), repairs & damage (lavender).
- Message: monthly vehicle cost is fairly similar across the fleet (€1,925–2,686). What differs is how much of it falls on idle days and how high repairs are for high-mileage cars.
- Note: this view's "TCO" is the **monthly vehicle cost** (no residual value, no financing). Full lifecycle TCO would add depreciation vs resale and financing cost.

**Step 3: waterfall.**
- Bars: Umsatz brutto → Provision → Fahrer → Variable Kosten → Deckungsbeitrag → Fixkosten → Reparaturen & Schäden → Ergebnis.
- Fleet values are in 6.5.
- Message: drivers and commission take most of the revenue (≈ 78 %); what remains has to carry the fixed costs of **all** calendar days.

**Step 4: scatter.**
- x = active days (17–30), y = result per vehicle and month.
- Dot size grows with repairs & damage; colour green or orange by the sign of the result.
- A dashed vertical line marks the break-even at 24.2 days, with the zone to its left tinted.
- Annotations: "+52,85 € je zusätzlichem Einsatztag", "42,00 € Fixkosten je Standtag, ohne Umsatz", "Kreisgröße = Reparaturen & Schäden".
- Dots are clickable.

**Step 5: levers.** All computed live over the 48 vehicles.

| Lever | Control | Effect in the formulas |
|---|---|---|
| Mindestlohn | 13,90 € (2026) / 14,60 € (2027) | driver cost × mw/13.90 on every active day |
| Provision Plattform | slider 18–27 %, step 0.5 | commission rate `c` |
| Umsatz je Einsatztag | slider +0…+5 %, step 0.5 | every vehicle's G × (1 + up). Example meaning: shifts placed on demand peaks. |
| Standzeit senken | slider 0–4 days, step 0.5 | adds days only to vehicles **below the base break-even (24.16 days)**: d = min(29.5, d + x) |
| Fahrzeuge ersetzen ab | nie / 250,000 / 200,000 / 175,000 km | vehicles above the threshold: repairs and damage = 0, fixed cost €48/day instead of €42 (a new car costs more but does not break down) |

Presets:

- *Mindestlohn 2027*: minimum wage €14.60 only.
- *Mindestlohn 2027 + Gegenmaßnahmen*: €14.60, idle days −2, replacement above 200,000 km, revenue per active day +2 %.
- *Zurücksetzen*: back to base.

**Result bridge.**
- Bars: Basis → Mindestlohn → Provision → Umsatz je Einsatztag → Standzeit → Ersatz alter Fahrzeuge → Szenario.
- Levers are applied **one after another in this order**, and each bar shows the change caused by adding that lever. Interaction effects are therefore attributed to the later lever.
- The vehicle P&L in the panel also switches to scenario values in this step.

Scenario results (each lever alone vs base result €6,495; the counter-measures preset in bridge order):

| Scenario | Fleet result | Δ vs base | Vehicles in loss | Break-even days |
|---|---|---|---|---|
| Base (2026) | €6,495 | ±0 | 15 of 48 | 24.16 |
| Minimum wage €14.60 (2027) | −€7,523 | −€14,018 | 34 of 48 | not reachable (30.63) |
| Commission 21 % | €14,036 | +€7,541 | 9 of 48 | 21.73 |
| Commission 24 % | −€1,046 | −€7,541 | 25 of 48 | 27.19 |
| Revenue per active day +1 % | €10,391 | +€3,896 | 11 of 48 | 22.84 |
| Revenue per active day +2 % | €14,287 | +€7,792 | 9 of 48 | 21.66 |
| Idle days −1 (vehicles below break-even) | €7,173 | +€678 | 14 of 48 | 24.16 |
| Idle days −2 (vehicles below break-even) | €7,850 | +€1,356 | 12 of 48 | 24.16 |
| Replace above 250,000 km | €7,266 | +€771 | 13 of 48 | 24.16 |
| Replace above 200,000 km | €7,722 | +€1,227 | 12 of 48 | 24.16 |
| Replace above 175,000 km | €7,582 | +€1,087 | 12 of 48 | 24.16 |
| Preset "Mindestlohn 2027 + Gegenmaßnahmen" | €2,743 | −€3,752 | 20 of 48 | 26.72 |

Bridge of the counter-measures preset: base €6,495 → minimum wage −€14,018 → commission ±€0 → revenue +2 % +€7,792 → idle days −2 +€1,248 → replacement >200,000 km +€1,227 → scenario €2,743.

Reading:

- The minimum-wage increase alone (−€14,018/month) wipes out the margin and leaves the fleet loss-making.
- Operational levers (idle days, replacement timing) are worth roughly €700–1,400 each.
- Revenue per active day (+2 % ≈ +€7,800) or commission (−1.5 points ≈ +€7,500) matter far more.
- Even all counter-measures together leave the result below today's. A fleet operator therefore needs price, mix or productivity decisions, not only cost control.

**Step 6: Mein Beitrag.** Four cards.

1. Clarify the question **with the operator**:
   - which vehicles lose money and why;
   - what the 2027 minimum wage will cost;
   - when to replace a vehicle.
2. Define the data needed **with the operator and product**:
   - trips and revenue per vehicle from the platforms;
   - shifts and driver costs;
   - workshop days, repairs and damage;
   - leasing, insurance and parking.
3. Prioritise the analyses **with the BI specialists**:
   1. a monthly vehicle P&L (high value, data available);
   2. idle days by cause;
   3. replacement timing by mileage;
   4. scenarios for wages and commission.
4. Decide and implement **at the operator**: monthly vehicle review, managing idle days by cause, planned replacement instead of endless repair, budget with scenarios.

Closing line: Jorge translates the operational question into an analysis and sets the order; the BI specialists build the models; the operator decides.

**Step 7: Brücke zu Europcar.**

| In this case | At Europcar | Transferable |
|---|---|---|
| Cost per vehicle and month, fixed and variable | Holding and operating cost per vehicle and month | Directly |
| Idle day = fixed cost without revenue | Idle days, workshop, transfers between stations | Directly |
| Break-even active days | Break-even utilisation by segment, station, season | Directly |
| Repairs rise with mileage | Holding period, residual value, timing of remarketing | Adapted |
| Result bridge base → scenario | Budget, forecast and plan/actual with Fleet Controlling | Directly |
| Driver cost, minimum wage, commission | Does not apply (the customer drives); instead pricing and sales channels | Not transferable |

Closing line: first understand Europcar's existing models, then improve them together with Fleet Controlling.

### 6.8 Vehicle P&L panel

Clicking a vehicle opens the panel. It shows:

- **Header:** id, age, km, the monthly result (green or orange) and the active days.
- **Sub-line:** active and idle days, and vehicle cost per active day; in step 5 also whether the vehicle is replaced.
- **P&L table:** gross revenue, commission, drivers, variable costs, contribution, fixed costs on active days, fixed costs on idle days, repairs & damage, result.

**Automatic diagnosis rules.** The text says *verliert Geld* if the result is below zero, otherwise *trägt sich*. It then lists every rule that applies:

- active days < 24.16 → "x Standtage: € Fixkosten ohne Umsatz", plus "(davon rund y Werkstatttage)" if workshop days > 1;
- repairs & damage > €200 → "… bei km: Ersatzzeitpunkt prüfen";
- gross per active day < 99 % of €393.10 → "Umsatz je Einsatztag unter Flottenschnitt: Schichtplanung prüfen". Precisely, this compares against the reference €393.10, not against the fleet's actual average (≈ €400.70).

**Worked example F-02** (step 3, base case):

| Line | Calculation | € / month |
|---|---|---|
| Active days | 30.4 − (2.4 workshop + 6.4 no-driver + 0.8 other), rounded | 20.8 |
| Gross revenue | 407.69 × 20.8 | 8,479.96 |
| − Commission | 22.5 % | −1,907.99 |
| − Drivers | 221.80 × 20.8 | −4,613.44 |
| − Variable | 30 × 20.8 | −624.00 |
| = Contribution | | 1,334.53 |
| − Fixed on active days | 42 × 20.8 | −873.60 |
| − Fixed on idle days | 42 × 9.6 | −403.20 |
| − Repairs & damage | (197,905 − 150,000) × 0.0028 | −134.00 |
| **= Result** | | **−€76.27** |

Diagnosis: loses money; 9.6 idle days (€403 of fixed cost without revenue, of which about 2.4 workshop days). With three more active days it would earn about **+€116**: each extra day adds 407.69 × 0.775 − 221.80 − 30 = €64.16 at this vehicle's own revenue level, so −76.27 + 3 × 64.16 ≈ +116.

### 6.9 Known simplifications (say these if asked)

1. **Illustrative inputs and simulated spread.** The fleet is not a customer; it shows the method.
2. **One month, steady state.** No seasonality, no ramp-up of new cars, no financing or residual-value effects in "TCO".
3. **Driver cost is linear in the minimum wage** and only paid on active days. Idle days without a driver therefore cost no wage; idle days with a driver standing would be worse.
4. **The idle-day lever** applies only to vehicles below the base break-even and is capped at 29.5 active days.
5. **Replacement** sets repairs to zero and fixed cost to €48/day. Purchase price, resale value and the timing of the switch are not modelled.
6. **Break-even KPI** uses the reference revenue €393.10, not each vehicle's own revenue.
7. **Bridge attribution** depends on the order of the levers.
8. **Grid colours clip at ±€600.**

### 6.10 Likely questions and short answers

- **"Where do the numbers come from?"** From an illustrative cost model I built for fleet partners (per vehicle-day: revenue, commission, driver, fixed and variable vehicle costs). The 48 vehicles are simulated around it. Only the minimum wage is real data.
- **"Why is the margin so thin?"** Employed drivers cost €221.80 of the €304.65 net revenue per day. What remains after variable costs (€52.85) barely exceeds the fixed costs per calendar day (€42 × 30.4 ÷ active days).
- **"What is the main lever?"** Active days: each additional active day is worth €52.85. Then revenue per active day. Repairs matter for a minority of high-mileage cars.
- **"How does this transfer to Europcar?"** The logic of vehicle-day, idle days, holding period and scenario bridge transfers. Driver cost does not. The Europcar levers are utilisation, fleet sizing, holding period and residual value.

---

## 7. Shared UI conventions

- **Palette:**
  - background #fbfaf8;
  - text #1a1a1a;
  - green #13804f (checked, positive);
  - orange #b8650f (flagged, negative, training);
  - indigo #3f46b0 ("Mein Beitrag", Menschen);
  - muted source colours #5d7899, #4f8a8c, #7f7aa8, #a08a5a, #a07068.
- **Top of each view:** step pills; a caption with *Schritt n · title* and a headline; prev/next buttons with the counter "n / N"; a full-screen icon (View 03 also has a pause icon and the Nexio/Europcar switch; in Europcar mode a dashed blue "Konzeptmodell" pill appears in the legend). Views 02 and 05 share the same chrome via `base.css`/`engine.js`.
- **Detail panel ("Details einblenden / Ausblenden"):**
  - sits **below** the graphic and opens **downwards**;
  - the header shows a tag, a title and, in View 01, only deck-approved key numbers;
  - opening it scrolls just enough to show the content;
  - `I` toggles it and `Esc` closes it.
- **Accessibility:** buttons have labels; reduced-motion settings slow or stop animations.

---

## 8. How to change something

1. Edit the source file in `europcar-praesentation/src/`, for example a German text in `folie5_bi.html`.
2. Test it: Views 01, 03 and 04 open on their own; for Views 02 and 05 (and the shell) rebuild first and open `index.html`.
3. Rebuild the published page: `python3 europcar-praesentation/src/build_index.py`. Run from the repo, it rewrites `europcar-praesentation/index.html`.
4. To change the guided route, edit the `GUIDE` array in `src/shell_template.html` (`[view, 0-based step, label]`) and the table in §0.1.
5. If the guided steps change, regenerate the offline PDF (screenshots of the start page and the 10 core steps at 1440×900) and upload it to Drive as a new version.
6. Commit and push to `main`. GitHub Pages republishes within about a minute.

Rules:

- Keep the provenance rules of section 2: new numbers must be labelled verified, illustrative or simulated.
- At Bliq, always 4 direct reports.
- The Nexio title is always *Senior Strategy & Operations Manager*.
- Do not remove the "illustrative model" note in View 04, the "Konzeptmodell" pill in View 03, or the job-description note in View 05.
- Main path (cards, chips, drawer headers, guided steps): only figures from the approved deck. Other CV figures go into the expanded evidence boxes.
- If you change the model in View 04, re-run the numbers in sections 6.4–6.8 and Appendix A (they are produced from the code, not typed by hand).

---

## Appendix A — the 48 simulated vehicles

Base case. Columns:

- km = odometer;
- d = active days per month;
- idle = 30.4 − d;
- ws = workshop days;
- gap = days without a driver;
- G = gross per active day;
- rep = repairs & damage per month (incl. damage);
- dmg = damage part;
- cost/d = vehicle cost per active day;
- result = monthly result.

| Vehicle | Age (months) | km | d | idle | ws | gap | G (€) | rep (€) | dmg (€) | cost/d (€) | result (€) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| F-01 | 28 | 169,529 | 28.3 | 2.1 | 1 | 0.3 | 399.94 | 55 | 0 | 77.06 | +314 |
| F-02 | 29 | 197,905 | 20.8 | 9.6 | 2.4 | 6.4 | 407.69 | 134 | 0 | 97.83 | −76 |
| F-03 | 11 | 67,665 | 28.8 | 1.6 | 0.8 | 0 | 397.96 | 0 | 0 | 74.33 | +354 |
| F-04 | 5 | 31,602 | 27.3 | 3.1 | 0 | 2.3 | 387.88 | 0 | 0 | 76.77 | +56 |
| F-05 | 25 | 131,939 | 28.7 | 1.7 | 0.2 | 0.7 | 409.93 | 0 | 0 | 74.49 | +614 |
| F-06 | 22 | 116,525 | 28.6 | 1.8 | 0.1 | 0.9 | 389.98 | 0 | 0 | 74.64 | +166 |
| F-07 | 12 | 69,452 | 28 | 2.4 | 0.9 | 0.8 | 388.53 | 0 | 0 | 75.60 | +104 |
| F-08 | 15 | 80,480 | 27.8 | 2.6 | 0.8 | 1 | 414.13 | 575 | 575 | 96.61 | +71 |
| F-09 | 21 | 146,287 | 27.4 | 3 | 0.2 | 2.1 | 394.06 | 0 | 0 | 76.60 | +192 |
| F-10 | 29 | 199,728 | 27 | 3.4 | 1.2 | 1.4 | 391.15 | 139 | 0 | 82.44 | −30 |
| F-11 | 11 | 68,062 | 21.6 | 8.8 | 1 | 7 | 401.22 | 0 | 0 | 89.11 | +1 |
| F-12 | 21 | 132,190 | 28.7 | 1.7 | 0.4 | 0.5 | 407.11 | 0 | 0 | 74.49 | +552 |
| F-13 | 22 | 149,227 | 27.4 | 3 | 0.8 | 1.3 | 396.59 | 0 | 0 | 76.60 | +245 |
| F-14 | 15 | 81,204 | 27.6 | 2.8 | 0.8 | 1.2 | 413.32 | 364 | 364 | 89.45 | +250 |
| F-15 | 38 | 207,758 | 20.1 | 10.3 | 3.9 | 5.5 | 406.06 | 162 | 0 | 101.58 | −175 |
| F-16 | 20 | 110,581 | 28.5 | 1.9 | 0.8 | 0.3 | 403.56 | 0 | 0 | 74.80 | +460 |
| F-17 | 17 | 113,722 | 22.8 | 7.6 | 0.5 | 6.3 | 394.39 | 482 | 482 | 107.14 | −531 |
| F-18 | 30 | 205,307 | 20.9 | 9.5 | 3.7 | 5 | 398.62 | 155 | 0 | 98.51 | −238 |
| F-19 | 5 | 32,646 | 25.4 | 5 | 0.9 | 3.4 | 393.22 | 249 | 249 | 90.07 | −181 |
| F-20 | 45 | 282,757 | 22.8 | 7.6 | 4 | 2.9 | 401.15 | 372 | 0 | 102.32 | −301 |
| F-21 | 20 | 120,580 | 28.5 | 1.9 | 0.5 | 0.6 | 393.20 | 0 | 0 | 74.80 | +232 |
| F-22 | 17 | 104,401 | 28 | 2.4 | 0.7 | 0.9 | 389.64 | 0 | 0 | 75.60 | +128 |
| F-23 | 16 | 93,103 | 26 | 4.4 | 0.8 | 2.8 | 405.89 | 0 | 0 | 79.11 | +355 |
| F-24 | 8 | 46,452 | 29.2 | 1.2 | 0.1 | 0.3 | 398.34 | 0 | 0 | 73.73 | +385 |
| F-25 | 33 | 228,073 | 25.9 | 4.5 | 3.4 | 0.2 | 412.00 | 219 | 0 | 87.75 | +253 |
| F-26 | 38 | 261,359 | 22.2 | 8.2 | 2.4 | 5.1 | 409.88 | 312 | 0 | 101.57 | −127 |
| F-27 | 19 | 118,451 | 27.1 | 3.3 | 1.2 | 1.3 | 411.14 | 0 | 0 | 77.11 | +534 |
| F-28 | 5 | 26,777 | 28.4 | 2 | 0.2 | 1 | 408.22 | 0 | 0 | 74.96 | +557 |
| F-29 | 37 | 236,535 | 25.2 | 5.2 | 3.5 | 0.9 | 393.73 | 242 | 0 | 90.27 | −175 |
| F-30 | 40 | 259,357 | 26.6 | 3.8 | 2 | 0.9 | 392.96 | 306 | 0 | 89.50 | −180 |
| F-31 | 9 | 53,121 | 24.3 | 6.1 | 0 | 5.2 | 407.01 | 0 | 0 | 82.54 | +269 |
| F-32 | 40 | 243,509 | 23.1 | 7.3 | 3.1 | 3.4 | 386.23 | 543 | 281 | 108.78 | −722 |
| F-33 | 22 | 138,091 | 27.6 | 2.8 | 0.9 | 1.2 | 388.24 | 0 | 0 | 76.26 | +78 |
| F-34 | 25 | 151,146 | 28.4 | 2 | 0.6 | 0.6 | 393.05 | 3 | 0 | 75.06 | +220 |
| F-35 | 9 | 55,426 | 28.5 | 1.9 | 0.3 | 0.8 | 404.21 | 0 | 0 | 74.80 | +475 |
| F-36 | 9 | 47,110 | 29.3 | 1.1 | 0.2 | 0.1 | 412.11 | 0 | 0 | 73.58 | +703 |
| F-37 | 24 | 129,834 | 24.8 | 5.6 | 1 | 3.9 | 389.43 | 0 | 0 | 81.48 | −37 |
| F-38 | 27 | 145,856 | 27.4 | 3 | 1.2 | 1 | 409.48 | 0 | 0 | 76.60 | +519 |
| F-39 | 37 | 229,397 | 25.6 | 4.8 | 1.5 | 2.5 | 383.41 | 222 | 0 | 88.55 | −338 |
| F-40 | 31 | 200,280 | 26.9 | 3.5 | 2.7 | 0 | 395.34 | 141 | 0 | 82.71 | +51 |
| F-41 | 15 | 101,469 | 22.2 | 8.2 | 0.6 | 6.7 | 414.99 | 0 | 0 | 87.51 | +273 |
| F-42 | 25 | 170,356 | 27.6 | 2.8 | 1.1 | 0.9 | 409.96 | 57 | 0 | 78.33 | +486 |
| F-43 | 24 | 158,681 | 28.1 | 2.3 | 0.7 | 0.8 | 400.62 | 24 | 0 | 76.29 | +348 |
| F-44 | 44 | 292,239 | 26.7 | 3.7 | 1.9 | 1 | 411.90 | 398 | 0 | 92.73 | +125 |
| F-45 | 40 | 232,492 | 25.5 | 4.9 | 3.6 | 0.5 | 400.16 | 231 | 0 | 89.13 | −21 |
| F-46 | 29 | 198,026 | 23.1 | 7.3 | 3.1 | 3.4 | 415.32 | 134 | 0 | 91.07 | +208 |
| F-47 | 15 | 95,869 | 27.6 | 2.8 | 0.9 | 1.1 | 387.88 | 0 | 0 | 76.26 | +70 |
| F-48 | 41 | 255,534 | 22.7 | 7.7 | 2.4 | 4.5 | 412.91 | 295 | 0 | 99.24 | −24 |

## Appendix B — German terms used on screen

| German | English |
|---|---|
| Einsatztag / Standtag | active day (with a driver) / idle day |
| Standzeit | idle time |
| Auslastung | utilisation |
| Deckungsbeitrag | contribution margin |
| Ergebnis | result (operating result per vehicle) |
| Umsatz brutto | gross revenue (bookings) |
| Provision | platform commission |
| Fixkosten / variable Kosten | fixed / variable costs |
| Reparaturen & Schäden | repairs & damage |
| Haltedauer | holding period |
| Restwert | residual value |
| Remarketing | resale of de-fleeted vehicles |
| Einsteuerung | in-fleeting |
| Fleet Controlling | fleet finance / controlling function |
| Prüffall | flagged record (failed a check) |
| Gemeinsame Datenbasis | single shared data basis |
| Mein Beitrag | my contribution / my role |
| Roter Faden | common thread |
| Weiterbildung | training / further education |
| Break-even Einsatztage | break-even active days |

## Appendix C — version history

| Date | Change |
|---|---|
| 09 Nov 2026 | Deck v1.1 and German script DE-v1.2 (du-form) used as content basis. |
| 11 Nov 2026 | Data-flow view (then "View 02") first built (LANCH funnel style); Jorge edited it into v3 (palette, bottom drawer, icons, auto-pause at "Mein Beitrag", Nexio/Europcar switch). |
| 11 Nov 2026 | BI view (then "View 03") built (48-vehicle BI case); restyled to the data-flow palette. |
| 11 Nov 2026 | View 01 rebuilt as route + competence profile; DevOps training added; restyled to the data-flow palette. |
| 11 Nov 2026 | Shell with welcome page; detail panels open downwards; published under `/europcar-praesentation/`. |
| 11 Nov 2026 | This documentation and the `src/` folder added. |
| 11 Nov 2026 | **v2** after reviewer feedback: new views People Management and Mein Beitrag bei Europcar; guided mode (10 core steps) with Geführt/Frei switch; Konzeptmodell label in Europcar mode; non-deck figures moved to the expanded "Belege"; larger canvas labels; PDF backup. See §0. |
| 11 Nov 2026 | Documentation v1.3: sections 1–8 updated to the five-view structure, guided mode, new figure policy and build steps. |
