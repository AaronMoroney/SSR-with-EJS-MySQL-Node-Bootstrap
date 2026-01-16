** TODO **

[ ] -  Add additional seats to make cart more complex

<hr>

**Project Requirements**

Login System
- Create a login screen.
- Validate credentials using JavaScript and/or Node.

Accepted login:
- Email: user@123.com
- Password: pass

On successful login, display an order summary.
- Show an error message for invalid login details.

Form & Validation
- Create a form (e.g. checkout or newsletter signup).
- Validate using JavaScript or HTML:
- Required text fields cannot be empty.
- Email address must be in a valid format.
- Display clear validation error messages.

✅ Image Slideshow / Carousel
- ✅ Use Bootstrap 5 Carousel.
- ❌ Display a different image each time the page loads using JavaScript (random image selection).

Purchase Functionality
- Allow users to select and “purchase” items.
- Store selected items in a cart (client-side logic is sufficient).

Display a purchase summary.
- JavaScript Data Structures

Use at least one array or object (e.g. product list, cart items).
- Custom Node Module
- Create at least one custom Node module (e.g. database helper, validation utility).
- Import and use it in the main server file.

GET & POST Requests
- ✅ Handle GET requests (pages, products, login page).
- Handle POST requests (login submission, form submission, purchase).

Static & Dynamic Content
- ✅ Serve static files (CSS, images, JavaScript).
- Render dynamic content using server-side data (e.g. products, user info).
- Node Templates

✅ Use a templating engine (e.g. EJS).

- ✅ Render dynamic pages such as:
- ✅ Product listings
- Order summary

Error messages
- Error Handling & Feedback

Display user-friendly error messages for:
- Invalid login
- Invalid form input

Server/database errors

- ✅ MySQL Database Integration
- ✅ Connect Node.js to a MySQL database.

Database details:
- Database name: YOUR_ATU_ID (e.g. G00345678)
- Username: root
- Password: root

Store relevant data (e.g. products, orders).

✅ Bootstrap 5

- ✅ Use Bootstrap 5 via CDN for layout and styling.
- ✅ Apply responsive design principles.

<hr>

**Markup**

- Styled using bootstrap CDN
- Globals.css overides defaults where applicable
- A CSS file relative to the page being styled is created in places to add additional, non-bootstrap styles such as `.grid__section`.
- Content is written using EJS to inject dynamic values (where applicable)

<hr>

**NOTE(s)**

- While it is possible to mix dynamic and static markup: (for example, is it neccessary to have hero as `.ejs` ? I could just as easily write this in the plain html) I thought it best to keep the project as close to production code as possible.

- Instead of hard-coding information repetitive sections, I created an array of information, and looped over the section with `forEach`. This increases maintainability.

<hr>

**Further inclusions**

- Included nodemon server https://nodemon.io/
- Included bootstrap icons 
- Included an EJS prettier plugin

<hr>

**Project development**

- Project developed in an 'agile' fashion. 
- Tasks assigned by myself as 'PM' using github
- Branched, developed, committed, reviewed and merged
- Progress can be seen here: https://github.com/AaronMoroney/SSR-with-EJS-MySQL-Node-Bootstrap/issues
- Commits can be seen here: https://github.com/AaronMoroney/SSR-with-EJS-MySQL-Node-Bootstrap



