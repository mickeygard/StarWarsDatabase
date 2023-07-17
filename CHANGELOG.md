I am creating a solution and then will work backwards from there to create tests

removing any reliance on React Bootstrap and will provide stubs for components and desired functions, and stubs for css classes

The goal is to create tests that fail (but don't break) before implementation

Some things to check for in grading:

1) navbar exists with all correct sections
2) 30 pokemon are listed from a call made to the pokeapi
3) searchbar brings up a pokemon with the associated name or number
4) clicking a pokemon from home list goes to that pokemons page
5) team page keeps track of all pokemon
6) pokemon card has specfic format and allows for catching/releasing
7) cannot catch the same pokemon twice
8) cannot have more than 6 pokemon simultaneously on team

## Test 0 - Example
Test the part of the navbar we give for free (there exists a Header component with top level nav and h1 with text POKEDEX)

Test 1:
navbar exists with all correct sections
