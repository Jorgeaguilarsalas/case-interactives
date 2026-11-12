# Nexio Partner P&L Cockpit — documentation

**Status: illustrative model · reconstruction of 8 Nov 2026 · last documented 11 Nov 2026**

Live page: <https://jorgeaguilarsalas.github.io/case-interactives/europcar/>

This page is a **fleet-economics cockpit for a fictional fleet partner**: employed drivers, leased or owned cars and vans, working for Uber, Bolt, Hermes or Amazon. It has 120 vehicles (96 cars, 24 vans) and 168 employed drivers; the unit of analysis is **one vehicle for one day**. It was prepared as Nexio Fleet working material and reused for the Europcar interview, where it backs the annex slide *Fleet Economics: Von Kennzahlen zu Entscheidungsmodellen*. View 03 of the interactive presentation (`../europcar-praesentation/`) reuses its per-vehicle-day constants.

> **Provenance.** All figures are **illustrative**, with two exceptions that were researched at the time: the German minimum wage (€13.90/h in 2026, €14.60/h from 1 Jan 2027) and the list price of a Toyota Corolla. The original HTML from August 2026 was lost; this version reproduces its five-module structure and final numbers from the build conversation of 1–6 Aug 2026. It is more compact than the original, which had three views per module. The page text is Spanish in the source; `i18n.js` adds German and English translations without changing any calculation.

All formulas live in one block in the code, `CALC` (between the markers `/*CALC-START*/` and `/*CALC-END*/`). The numbers below are computed from that block with the default slider values.

---

## Module 1 · Vehicle-day (Fahrzeug-Tag)

### Inputs (sliders, defaults)

| Input | Default | Range |
|---|---|---|
| Gross bookings per car-day | €393.10 | 250–500 |
| Platform commission | 22.5 % | 10–35 % |
| Driver hours per day | 12.6 h | 6–20 |
| Minimum wage | €13.90/h | 12.50–16.00 |
| Loaded driver cost per day at €13.90 | €221.80 | 150–300 |
| Vehicle fixed cost per day | €42.00 | 25–60 |
| Vehicle variable cost per day | €30.00 | 15–45 |

### Formulas (`CALC.m1`)

```
commission = gross × comm
net        = gross − commission
driver     = drv × mw / 13.90            (driver cost scales with the minimum wage)
vehicle    = fix + var
contribution per car-day = net − driver − vehicle
driver cost per hour = driver / hours
gross per driver-hour = gross / hours
cost per driver-hour  = (driver + vehicle) / hours
break-even gross per driver-hour = cost per hour / (1 − comm)
headroom = gross per hour − break-even per hour
margin on net revenue = contribution / net
```

### Results at defaults

| Output | Value |
|---|---|
| Commission | €88.45 |
| Net revenue | €304.65 |
| Driver (12.6 h × €17.60) | €221.80 |
| Vehicle (42 + 30) | €72.00 |
| **Contribution per car-day** | **€10.85** |
| Margin on net revenue | 3.6 % |
| Gross per driver-hour | €31.20 |
| Break-even per driver-hour | €30.09 |
| Headroom | €1.11/h |
| Cost per driver-hour | €23.32 |
| At minimum wage €14.60 | driver €232.97, contribution −€0.32, break-even €31.23/h: the margin closes on a known date |

**Known discrepancy.** The breakdown gives €10.85. The final original cockpit showed **€10.91** after an adjustment the conversation does not explain. Module 5 uses €10.91.

### Vehicle cost stack (€72/day, fixed table)

| Fixed · €42.00 | | Variable · €30.00 | |
|---|---|---|---|
| Leasing / depreciation | €18.40 | Energy | €13.20 |
| Insurance | €18.10 | Maintenance | €9.90 |
| Concession, inspection (HU), depot, admin (incl. €2.65 parking) | €4.50 | Cleaning | €2.30 |
| Telematics | €1.00 | Damage net of recovery | €4.60 |

Basis: 12.6 driver-hours a day, 220 km a day, 335 operating days a year. Excess-mileage cost (€13.40/day) is **not** in the stack; it is the hidden cost shown in Module 4.

### Delivery van (fixed example, `CALC.van`)

Revenue €265.00 − driver €167.20 − fixed €34.60 − variable €35.65 = **€27.55 per operating day** (10.4 % margin).

### Reading shown on the page

- A car only earns money with a driver in it. A car without an assigned driver is not "low utilisation"; it is an asset with no revenue that still burns €72 a day.
- The fleet controls costs and driver hours. The rate is a commercial negotiation whose only operational lever is the platform mix: delivery has €265/day and a 10.4 % margin, ride-hailing €393/day and a much thinner margin. Losing one contract removes 17 % of net revenue.

---

## Module 2 · Asset life (Vida del activo)

**Sell when availability drops** (fixed table):

| km band | Availability | Maintenance €/km | Net contribution €/km |
|---|---|---|---|
| 180,000–240,000 | 89.6 % | €0.058 | €0.0995 |
| 240,000–300,000 | 80.6 % | €0.086 | €0.0494 |

- **First threshold (215,000 km) was wrong.** It was based on maintenance crossing residual value, but depreciation per km falls with mileage.
- **The real mechanism is collapsing availability:** out-of-service days rise from 0.4 to 5.4 a month. This is the weakest assumption in the model.
- **The decision metric is net position per year of ownership,** because the scarce resource is the slot in the fleet: €3,369 a year when selling at 240,000 km vs €3,131 at 268,000 km. The system alerts at 220,000 km.
- **KPIs shown:**
  - optimal sale at 240,000 km;
  - actual sale at 268,000 km;
  - lever of €238 per vehicle and year;
  - fleet lever (120 vehicles) €28,560 a year.

**Cohorts by mileage** (the clock is km, not calendar):

- **Lifetime:** average 244,000 km, about 3.3 years.
- **Annual mileage:** 73,700 km (220 km × 335 days).
- **Cohorts:** healthy, accelerated wear, total loss.
- **Total losses:** 11 % of the fleet, at about 95,000 km, losing 149,000 km of life, with a €3,300 gap to the insurance payout.
- **Lost contribution from total losses:** €260,000. It was earlier mislabelled "unrecovered capital" at €412,000.
- **Levers:**
  - sell at 240,000 km;
  - measure out-of-service days per km band;
  - sell before breakdowns start;
  - stagger renewals by quarter;
  - standardise on two models, not seven.

---

## Module 3 · Drivers (Conductores)

**Cost to serve and turnover:**

- **Loaded driver cost:** €17.60/h.
- **Productive share:** 82 % (hours on trip or route ÷ paid hours).
- **Turnover:** 68 % a year, i.e. 114 exits among 168 drivers.
- **Cost per exit:** €1,780 = €600 cash for recruiting + €1,180 productivity ramp.
- **Exits in the first 3 months:** 41 %.
- **KPIs shown:**
  - annual turnover cost €202,920 (114 × €1,780);
  - shift coverage 79 %;
  - productive share 82 %;
  - maximum recovery from employees 34 %.
- **Avoiding double counting:** the €1,180 ramp is already inside the bookings rate, so the budget (Module 5) counts only the €600 cash, i.e. €68,400.

**Damage and liability:**

- **Incident rate:** 4.2 incidents per 100,000 km.
- **Net damage:** €4.60 per vehicle-day.
- **Concentration:** the top decile of drivers causes 41 % of damage cost.
- **Photos at every shift change** make 27 % of damage attributable.
- **Legal cap on recovery from employees:** 34 % of culpable damage.
- **Insurance:** €6,600 per vehicle and year (experience-rated), about €480 more per +1.0 incident/100,000 km.
- **Message:** "Nexio is a behaviour problem". With recovery capped at 34 %, compliance cannot be bought.
- **Levers:**
  - photos at handover;
  - numbers per driver ("seventeen concrete conversations");
  - liability terms signed at hiring;
  - thresholds in the system.

---

## Module 4 · TCO and acquisition (TCO y adquisición)

### Excess mileage (`CALC.excess`)

| Input | Default |
|---|---|
| km per car per year | 73,700 |
| Contracted band | 40,000 km/year |
| Rate for the first 10,000 excess km | €0.11/km |
| Rate beyond | €0.16/km |

```
excess = max(0, km_year − band)                         → 33,700 km
cost_year = min(excess,10,000) × 0.11 + max(0, excess − 10,000) × 0.16
          = 1,100 + 23,700 × 0.16 = €4,892 per car and year
cost_day  = cost_year / 365 = €13.40
```

The fleet of 96 cars pays €469,632 a year. The refund for unused km is only about €0.035/km vs a €0.10–0.16 charge, hence the rule "never below the band; slightly above".

### Real cost by acquisition model (`CALC.m4`, € per vehicle-day)

| Model | € / vehicle-day |
|---|---|
| Net leasing, 40,000 km band + excess | 28.30 + 13.40 = **41.70** |
| Net leasing, 75,000 km | 29.49 |
| Finance lease (€568/month) | 28.56 |
| Purchase | **28.00** (cheapest) |

The short-band lease books €28.30/day but really costs €41.70, an underestimate of **47.3 %**. The spread between the most and least expensive model across 120 vehicles is **€600,060 a year**, decided once, at signature.

### Leasing vs financing in the P&L (fixed table)

| | Leasing | Financing |
|---|---|---|
| What hits the P&L | the instalment (expense = cash) | depreciation (AfA, operating) + interest (below operating result) |
| Example of €500/month | €500 charge | €571.85 charge vs €500 cash |
| Residual-value risk | lessor | operator |
| Mileage risk | operator (excess) | none |

**Depreciation vs value loss:**

- Straight-line AfA over 6 years on €31,500 is €437.50/month, while real economic depreciation is €605.77/month.
- The P&L therefore understates cost by €6,563 over 39 months, which appears all at once as a loss on sale.
- On the Corolla (€26,000) the AfA is about €361/month.

**Loan term vs vehicle life:**

- A €500/month loan with no down payment takes 77 months to repay vs 39 months of useful life.
- In month 39 €17,240 is still owed on a car worth €7,875.
- Rule: "the loan must end when the car ends" (balloon payment = residual value).

**Totals over 39 months per vehicle:**

| Model | Total |
|---|---|
| Cash purchase | €21,480 |
| Financing with balloon | €22,152 |
| Residual-value lease (Restwertleasing) | ~€23,000 (~€596/month) |
| Kilometre lease, 40,000 km | €37,739 |
| Toyota taxi lease (10,000 km/year, €269/month) | €33,316 |

**Restwertleasing:**

- It works when usage is predictable and the residual is small: "Heavy is not the problem. Unpredictable is."
- The trap is a residual set too high: about €13,000 vs €7,540 real, so €5,460 to pay. "The residual is the whole contract."
- Strategy: an own core fleet plus a flexible leased layer; negotiate the km band or loan term before the instalment.

**Cost per km:**

- Only 9.4 % of the cost stack depends on km.
- Going from 260 to 150 km a day raises cost per km by 65 % while total cost falls only 4.6 %. Cost per km is an efficiency metric, not a total-cost metric.
- Other figures: electric €0.083/km vs diesel €0.134/km (energy + maintenance); the legal return-to-depot obligation (Rückkehrpflicht) costs 0.63 h a day, i.e. €11.09 per vehicle-day.

---

## Module 5 · Budget (Presupuesto)

### Inputs

| Input | Default |
|---|---|
| Contribution per car-day | €10.91 |
| Cars | 96 |
| Contribution per van operating day | €27.55 |
| Vans | 24 |
| Mode | Leasing 40,000 km / Financing |

Cars run 365 days a year and vans 313 operating days.

### Formulas (`CALC.m5`)

```
cars  = 10.91 × 96 × 365  = €382,286
vans  = 27.55 × 24 × 313  = €206,956
fleet contribution        = €589,242
below the line (leasing mode):
  excess-km accrual   = 4,892 × 96 = −€469,632   (Module 4)
  operations staff                 = −€180,000
  partner / manager                = −€80,000
  recruiting (114 exits × €600)    = −€68,400
  office, IT, accounting, legal    = −€45,000
operating result (leasing)         = −€253,790
operating result (financing: no excess accrual, extra financing cost −€9,365) = +€206,477
```

Message: "budgets are built from invoices, so costs that are not invoiced are not budgeted". Excess km, turnover and idle days are the examples.

### Month-end variance (`CALC.variance`)

| Effect | Calculation | Amount |
|---|---|---|
| Rate | (€9.40 − €10.91) × 33,600 days | −€50,736 |
| Volume | (33,600 − 35,040 days) × €10.91 | −€15,710 |
| **Total** | | **−€66,446** |

Four-line report with one owner per line:

| Line | Change | Amount | Owner |
|---|---|---|---|
| Bookings | €31.20 → €30.10 per hour | −€33,264 | Dispatch |
| Damage | €4.60 → €5.15 per day | −€17,472 | Driver management |
| Coverage | 79 % → 75 % | −€15,710 | Driver acquisition |
| Wage | – | €0 | Legal |

Each line has an owner, so the variance becomes a conversation with a person rather than a finance number.

---

## What transfers to Europcar (used in the interview)

| Cockpit element | Use at Europcar | Fit |
|---|---|---|
| Cost stack per vehicle-day, split fixed/variable | Same two layers as holding and operating costs | Direct |
| Car without driver = asset without revenue | Idle vehicle (Standzeit) and transfers: measure idle vehicle-days | Direct |
| "Costs that are not invoiced are not budgeted" | Idle time, transfers, workshop days not on any invoice | Direct |
| Sale timing by availability drop; net position per year in the fleet | Holding period and sale timing by km band and age, with an alert before the threshold | Mechanism direct, 240,000 km threshold not |
| AfA vs economic depreciation | Explains remarketing losses | Direct |
| Excess-km trap | km limits in buy-back and leasing | Direct |
| Own core + flexible leased layer | Long-life core plus a flexible buy-back/short-term layer for peak season | Hypothesis to ask about |
| Restwertleasing test (who predicts the residual best) | At-risk where Europcar predicts the residual well, buy-back where it is volatile (e.g. EVs) | Adapted |
| Cost per km | In rental, cost per unit-month and per rental day are the right denominators | Adapted |
| Budget bridge with rate/volume variance and an owner per line | Annual planning and forecasts with Fleet Controlling | Direct |
| Cohorts by km and total-loss tail | Cohorts by model, age and km for holding period and damage risk | Direct |
| Damage concentration, recovery rate, photos at handover | Concentration by station, channel or segment; recovery from customers and insurance | Adapted |
| Platform mix and counterparty risk | Channel mix and buy-back concentration with few manufacturers | Adapted |
| Standardise on two models, not seven | Less variety within each category, without breaking the category offer | Adapted |
| Driver cost, turnover, minimum wage, platform commission, 34 % recovery cap | No equivalent: in rental the customer drives | Not applicable |
| Model figures (€10.91, −€253,790, 240,000 km) | Illustrative and from another business; do not quote | Not applicable |
