# Assessment 4 : React.js

## Summary

In this project, we will create a PokeDex app using:

- `react`
- `react-router-dom`
- `axios`

The scaffolding for the app has been bootsrapped already for you using `vite`.

The backend api you will be making requests to is [PokeAPI](https://pokeapi.co/)

The autograded tests for the app were written using `cypress`

## Important Grading Information

- You need to get a 70% or better to pass which means `10/14 tests` passing
- Every retake after the deadline incurs a 1 point penalty, so let an instructor know explicitly when you want to be regraded

## Code of Conduct

- This test is fully open notes and open Google, but is not to be completed with the help of other students/individuals

## Setup / Scaffolding

Once cloned, install dependencies with

```sh
npm install
```

All of the necessary dependencies have already been included in `package.json`.

This project is a pre-created `vite` project and should work like one.

We have provided some basic scaffolding already, so `main.jsx` is already linked to the router object exported from `router.jsx`. In `router.jsx` we have set up the basic config for a react-router `BrowserRouter` that renders `<App />` on `/` and has a single child for this route matching the index case that renders `HomePage />`. Both of these components (as well as `<Navbar />`) have been minimally completed.

Also css classes have been pre-provided for you in `index.css`, which is already included in your project. Feel free to modify this file but note that the tests still expect certain class names to appear, so be mindful of that if you plan to make changes.

## Testing Flow

All of the automated tests for this assessment are located within the `cypress/e2e` folder and represent the 14 individual test we want you to pass.

In order to run these tests, you must first have the app simultaneously being served on a seperate terminal window.

```sh
npm run dev
```

Then, running `npm run cy:open` will run Cypress's visual test runner so you can run the tests against your app.

> NOTE: `cypress.config.js` sets up some Cypress configs, including the asumption that `vite` is serving up your app at `http://localhost:5173`. This is the default for `vite`, but if for whatever reason you have `vite` serving to a different port, you can modify the section in `cypress.config.js` named `baseUrl`.

the first test, `0-example-test.cy.jsx` should pass successfully without having to add anything new to the `src` folder.

## Components

We want you to make a working pokedex that includes the following components:

### `<Navbar>`

- Navbar should be visible on every page except a 404 page

- Navbar will have a heading 'POKEDEX'

- Navbar links to the Home Page (`/`) and the Team Page (`/team`)

- Navbar should have an input section with an associated button that allows for searching for specific pokemon by name or id

### `<HomePage />`

- The Home Page should be rendered (along with the Navbar) at `/`

- It should have the title 'Home'

- It should list 30 pokemon in an ordered list as links with the name of the pokemon as the visible text and upon clicking should link to the pokemon's specific page (`/pokemon/<pokemon_name>`)

To accomplish this you will need to utilize the PokeAPI

### `<PokemonPage />`

The pokemon page should render at the url `/pokemon/<pokemon_name>` and show a Pokemon Card for the single pokemon in question.

### `<PokemonCard />`

You will likely want a seperate component for this as both the Pokemon Page and the Team Page will need to render such components.

A Pokemon Card consists of a rectangular container with the pokemon's name, their image, the first four moves they learn, and a button to Catch/Release that pokemon

### `<TeamPage />`

The Team Page should render at the url `/team` and show a Pokemon Card for each pokemon currently caught

### `<Error404Page />`

You will want a specific page that all non-matching urls redirect to

### `<MissingPokemonPage />`

You will want a specific page that renders only when the pokemon searchbar is given a pokemon name/id that PokeAPI has no match for.

## Functionality

Functionality we expect your app to have include:

- A Pokemon Card's background color will match it's type (as specified in `index.css`)

- A Pokemon Card will read 'Catch' if not yet caught and 'Release' if already on the team

- A pokemon can not be caught twice

- No more than six pokemon can be caught simultaneously

- On bad urls, redirect to a 404 page (no Navbar)

- On bad pokemon search input, redirect to a unique MissingPokemonPage (includes Navbar)

## Tests

The tests are designed to confirm the structure and functionality of your app.

There are 14 tests total, which can be directly read in the `cypress/e2e` folder. **_Do not modify the tests or it will count as cheating_**. Each test represents a specific ask for what your app can do, and you can read the tests to understand what they are testing for. We will summarize the tests here as well.

### Test 0 - Example Test

This should pass without any new code additions. Test 0 will:

- navigate to `/`
- ensure there exists a `<nav>` element on the page
- ensure that `<nav>` element contains an immediate child `<h1>` with the contents `POKEDEX`

### Test 1 - Navbar Structure

Test 1 ensures your Navbar is valid, meaning it will:

- navigate to `/`
- ensure there exists a `<nav>` element on the page
- ensure that `<nav>` element contains an immediate child `<h1>` with the contents `POKEDEX`
- ensure there is a first link `Home` linking to `/`
- ensure there is a second link `My Team #0` linking to `/team`
- ensure there is an input with placeholder value 'search'
- ensure there is a button with text "Button"

We are drawing out the desired output explicitly here but we expect you to read the tests for the minute details of the rest.

## Test 2 - Navbar Links

Test 2 will:

- navigate to `/`
- click the team link and expect to render a page at `/team`
- then click the home link, and expect to return to `/`

## Test 3 - Home Page Structure

Test 3 will ensure the Home Page rendered at `/` has the correct header text and lists exactly 30 pokemon as links

## Test 4 - Home Page Links

Test 4 will ensure that the first link in the ordered list of pokemon works as expected and redirects to the unique pokemon's page

## Test 5 - Pokemon Page Structure

Test 5 ensures the Pokemon Page renders a Pokemon Card (expects the class `.pokemon-card`) with expected structure

## Test 6 - Pokemon Card Background

Test 6 will ensure a Pokemon Card's background matches the pokemon's type. The type to color connection has been pre-defined for you in `index.css` as classes with names of the form `bg-color-<type>`

## Test 7 - Empty Team Page

Test 8 tests that you can visit the Team Page without having caught any pokemon renders a unique message

## Test 8 - Can Catch Pokemon

Test 8 tests that you can add multiple pokemon using the Catch button and view them on the Team Page

## Test 9 - Can't Catch Dupes

Test 9 ensures you cannot catch the same Pokemon twice, instead that Pokemon is released the second attempt to 'catch' it

## Test 10 - Can't Catch More Than Six

Test 10 ensure no more than 10 pokemon can be caught

## Test 11 - Can Add Then Release

Test 11 will catch the first six pokemon onto the team, then release each one, ensuring an empty team page at the end

## Test 12 - Pokemon Search

Test 12 ensures you can search for a pokemon by name or id using the expected input/button in the Navbar. This tests not only a pokemon in the original list of 30 but also a pokemon by id that is not in that list.

## Test 13 - Error Page

Test 13 will visit a non-existent page and expect an Error404Page to render. This page should not include the Navbar.

## Test 14 - Bad Pokemon Input

Test 14 will search for a non-existent Pokemon and expect a unique page to be rendered in response, with awareness of the bad search input. This page should still include the Navbar.
