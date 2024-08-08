## Summary

Star Wars database with user accounts profiles, and favorites, calling from Star Wars API and Star Wars Databank API.

Requirements-
  Main page with Nav bar to include search bar (with autocomplete?)
  Information page with different backgrounds as you scroll down through categories, with informational cards that pop up when results are selected.
  favorites linked to user, and on profile page
  User signup
  user profile pages
 Wish list / Future Improvements for portfolio-
  Stretch- Rasa AI assistant to search APIs for longer form answers to user questions
  Final stretch- AWS  

## Resources

- Wookiepedia "https://starwars.fandom.com/wiki/Main_Page"
- Star Wars API "https://swapi.dev/"
- Star Wars Databank "https://starwars-databank.vercel.app/"
- Official Star Wars Database "https://www.starwars.com/databank"
- Autocomplete "https://github.com/pacosw1/react-autocomplete/tree/master/src/components"
- Backgroud scrolling image for categories https://imagekit.io/blog/lazy-loading-images-complete-guide/

### `<Navbar>`

- Visible on every page
- Heading "Star Wars Database"
- Quote of the day
- Links to the Home Page (not when on home page) (`/`), Vault page (same) (`/vault`) and the Profile Page (same) (`/profile`)
- Log In/Sign Up button that leads to log in sign up page. Button is replaced by Logout button if user is logged in
- Input section with an associated button that allows for searching the Vault from any category by name (search two apis from one search bar)

### `<Footer />`

- contact admin link (sends email)
- link to GitHub?
- about Rasa AI
- other info?

### `<Rasa Assistant />`

- pop up chat box while on home page, all othe pages Rasa will be minimized, but big enough pop up button to be visible
- Stretch Armstrong- use animated protocol droid as Avatar with pop-up dialogue box
- train to search both APIs for longer form answers for users, and for images to use on their profiles

### `<HomePage />`

- The Home Page should be rendered (along with the Navbar) at `/`
- It should have the title 'Welcome to the Star Wars Database'
- Info breakdown for star wars overall (from wookipedia)
- Background?

### `<LogIn/SignUp />`

- username field checks to see if username is already taken. Cannot create account if it is.
- password field with rules for strong password, weak/strong bar under
- two buttons "create account", "log in"

### `<Account Info />`

- enter email
- select organization alignment
- write bio
- progress bar at bottom of page, with skip button and next button
- "complete" sends user to profile page

### `<ProfilePage />`

- bio
- displayed emblem for organization (org theme as auto background?)
- favorites in category boxes under bio

### `<Vault />`

- right/left arrow scrolling rows for each category
- background picture changes based on the category that's in view
 - add backlight glow to cards based on some associated alignment
- when you select a result from the vault it goes to an informational page
  - 'Films'
     - list of all the Star Wars films in the middle of the page, with a background that includes all the movie posters mashed.
  -'Characters'
     - star wars crowd background (city)
   -'Droids'
     - The background will be industrial, hopefully GIF with a small amount of movement.
   -'Creatures'
     - arena background? maybe zoo/cage?
   -'Locations'
     - star system?
   - Organizations'
     - find a cool background
   -'Species'
      - find a cool background
   -'Vehicles'
      - some sort of lot, factory, garage?
   -'Planets'
      - Space/solar system background

### `<Error404Page />`
- page that all non-matching urls redirect to

### `<MissingResourcePage />`
- page that renders only when the search bar is given a recource that it has no match for.


### Basic Layout

![TLDraw Layout](../StarWarsDatabase/Front_End/src/components/images/TLDraw.png)

## Functionality

Functionality to include:

- button for each resource will read 'Add to Favorites' if not yet added and 'Remove from Favorites' if already on the list

- A favorite cannot be added twice

- No more than 30 favorites at once

- On bad urls, redirect to a 404 page