# Changes

1) Github Actions workflow is using github classroom autograder to run the tests

2) `pokeDex` vite project is already created for them, so we can ensure correct file structure for running the tests

3) by default we include a `package.json` with all necessary dependencies for `react`, `react-router`, `axios` and `vite` and `vitetest` so students just need to run `npm install`. We had too many issues last time with messed up dependencies and different file structures/names for components that made the tests not even able to run, and I think we should give them scaffolding such that with minimal setup they can run the tests and pass just a basic example test.

4) We currently ask them to explicitly use react-bootstrap components. If we want to require this we need to teach it, which we don't yet. My opinion is we should not have the tests rely on this.

5) to make it work with github classroom's autograder action we should split tests up into individual files, which means we can avoid 1-2 points each test. Based on my last time grading this manually we should check:

1) Header contains:
    - h1: contains 'POKEDEX'
    - Link: contains 'home'
    - Link: contains 'My Team #0'
    - input: has search bar and button
    > not testing functionality

2) Home Page
    - displays an ordered list of 30 links containing the first 30 pokemon names

3) Pokemon Page
    - contains pokemons image
    - background color matches type
    - list first 4 moves in a 2x2 grid
    - contains Catch button 
    > not testing functionality

4) Team Page
    - contains cards for all currently caught Pokemon
    - bonus: adds them as 3x3 grid using flexbox

3) Links work
    - clicking 'home' brings you to the Home Page
    - clicking 'My Team #' brings you to the Team Page
    - clicking an individual pokemon link from the Home Page brings you to the associated Pokemons individual Page


5) Catch/Release basic
    - clicking Catch adds that pokemon to an internal list of Pokemon (we will need to be explicit in the tests/README what to call this prop and the functions associated)

6) Catch/Release advanced
    - clicking Catch adds that pokemon to the TeamPage
    - this simultaneously updates the count in the Header for 'My Team #'

7) Catch/Release no dupes
    - clicking Catch changes contents of Button to Release
    - upon clicking release that pokemon is not added a second time but removed from the team
    - this way, no dupes are possible

8) Search bar in Header works and can take a name or a number, returning a PokePage for that pokemon

9) if search input is invalid returns a unique error page

10) we can expand on these to split tests up individually


