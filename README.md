# Using this project

Please read this document fully before starting.

Clone the project, change into the directory, and install dependencies:

**Node version**

```
16.0.0 or 18.0.0
```

**Yarn version**

```
1.22.19
```

Install dependencies:

yarn
```

Create a `.env` file if you plan on using environment variables: Copy the .env.example file to .env file:

```bash
cp .env.example .env

Run the project:

```bash
yarn dev
```

---

# The Technical Test

This test is designed to give us a window into how you think, how you approach design and code, and how you express creativity within given constraints.

We’re less interested in whether you “get everything right,” and more in how you **use your judgment, respect design as a craft, and collaborate with the codebase in front of you**.

We’ve kept the instructions intentionally light to give you freedom. Please feel free to make decisions, explore, and explain your reasoning.

---

## Time Expectation

We don’t expect you to spend more than about **1.5 - 2 hours** but this is totally up to you.

Please create a repo and commit your work regularly. Even unfinished work helps us see your thought process and collaboration style. We’ll review and discuss together afterward.

---

## Task 1: Create a Scrabble Score API (Node.js)

**Objective:**
Add a RESTful API endpoint in the existing backend that computes a Scrabble score for a given word.

**Quick Scrabble Primer:**
Scrabble is a word game where each letter has a point value. The score of a word is simply the sum of its letters (no board bonuses for this test).

**Letter values:**

* 1 point → A, E, I, O, U, L, N, R, S, T
* 2 points → D, G
* 3 points → B, C, M, P
* 4 points → F, H, V, W, Y
* 5 points → K
* 8 points → J, X
* 10 points → Q, Z

**Example:**
“cabbage” → 14 points

**Details:**

* Method: `POST`
* Endpoint: `/api/scrabble-score`
* Input:

  ```json
  { "word": "example" }
  ```
* Output:

  ```json
  { "score": 14 }
  ```

**Notes:**

* Handle case insensitivity.
* Return a clear error for invalid input (numbers, symbols, empty strings).
* Integrate into the backend’s existing structure and routing.
* Follow existing error-handling patterns.

**Stretch goal (if time permits):**

* Add unit tests (e.g. Jest) to cover normal cases and edge cases.

---

## Task 2: Connect the React Frontend

**Objective:**
Extend the frontend to let users input a word and see its Scrabble score.

**Notes:**

* Add a form with an input field and submit button.
* When submitted, call your API and display results in a table that keeps history of submissions.
* Show user-friendly error states.

---

## Creativity & Design

This is where we want to see **you**.

We deliberately only provide *one* piece of design inspiration. Everything else is **up for grabs** — we want to see:

* How you interpret the style,
* How closely you choose to match,
* How you respect the craft of design (empathetic, thoughtful, considered),
* How you use creativity to make the frontend engaging.

We believe that respecting design deeply informs better collaboration and product decisions. Don’t just “make it work” — show us how you think about **design as an experience**.

<img width="476" height="93" alt="Screenshot 2025-10-01 at 15 58 43" src="https://github.com/user-attachments/assets/f0e47694-2f68-4a72-9191-174622f71c4a" />

https://github.com/user-attachments/assets/fd93c1a7-abb4-420c-a91c-abaec8cd7c7a

---

## Deliverables

* Push your work to a repo you’ve created.
* Keep commits regular and descriptive.
* Update the README with instructions for running/testing your feature.

---

## Final Thoughts

This test isn’t about perfection. It’s about:

* How you explore a problem,
* How you respect and extend a design,
* How you use creativity and judgment,
* How you communicate your process.

We look forward to seeing what you do.

---



