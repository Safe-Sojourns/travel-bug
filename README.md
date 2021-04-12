# travel-bug

<p align="center">
  <a href="https://github.com/Safe-Sojourns/travel-bug">
    <img src="./travel_bug/app/screens/assets/ladybug.png" alt="Logo" width="90" height="90">
  </a>
</p>

# Contributors

[Sheeba Nair](https://github.com/sheebanair "Sheeba Nair")

[Gabe Chacon](https://github.com/gabinochacon8 "Gabe Chacon")

[Aaron Fink](https://github.com/Aaron-Fink "Aaron Fink")

[Chris Holley](https://github.com/ChrisHolley "Chris Holley")

[Sam Sparks](https://github.com/sgsparks "Sam Sparks")

[Luci Pak](https://github.com/lucipak "Luci Pak")

[Louisa Janßen](https://github.com/louisajanssen "Louisa Janßen")

[Eric Hernandez](https://github.com/EricMHernandez "Eric Hernandez")

[Adam Whitman](https://github.com/emagdaeh "Adam Whitman")

# Introduction
Travel Bug is a mobile app designed for a client who's business is dedicated to creating study abroad opporunities for students around the globe.  The app's purpose is to organize important details of a study abroad program.  The primary features include providing itinerary events, a calendar to reference events, a GPS enabled map with pregenerated pins for locations tied to the study abroad program, an important contacts page, and a two-way messaging system.

There is separation between admin and student access levels in the app with authentication handled through Firebase.  Admins are able to create urgent messages for students and other admins to see as well as create new events in the itinerary.  Students are able to utilize the messaging system, but cannot flag urgent messages.  All users are able to add custom notes to the important contacts page.

# Tech stack
<ul>
<li>React Native</li>
<li>React Navigation</li>
<li>Jest</li>
<li>Firebase Authentication</li>
<li>Express</li>
<li>Axios</li>
<li>NodeJS</li>
<li>Google Maps API</li>
<li>XCode Simulator</li>
<li>Formik</li>
<li>Yup</li>
<li>Socket.IO</li>
<li>MongoDB</li>
<li>PostgreSQL</li>
</ul>

# Technical Challenges and Research
Some unexpected challenges included:

<ul>
<li>Being able to use buttons to move from screen to screen while also having a tab navigator proved challenging within the restrictions of React Navigation</li>
<li>Handling state and context with authentication without triggering infinite re-renders</li>
<li>Challenges with search capabilities with Google search auto-complete</li>
<li>Finding ways to solve technical challenges without continuously downloading additional dependencies</li>
<li>Understanding the flow of communication through web sockets and coordinating with database persistence</li>
</ul>

# User Stories
<ul>
<li>As a user, I expect that I can login if I have an account created</li>
<li>As a user, I should be able to create a new account to login with if I do not have one already</li>
<li>As a user, I expect to remain logged in when I leave the app if I don't click the logout button</li>
<li>As an admin user, I should be able to add new events to the itinerary and send out urgent messages to other users</li>
<li>As a user, I should be able to see the day's events and also be able to select other days in a calendar to see the events on those dates</li>
<li>As a user, I should be able to see the locations of events pinned to a map and also be able to get directions to these events</li>
<li>As a user, I need to see important locations of the area I am in, such as hospitals, police stations, embassies, etc.</li>
<li>As a user, I should be able to navigate to the event location on the map screen from within each event card</li>
<li>As a user, I should be able to search the map for anything in my current geographical location, and be able to get GPS directions to that location</li>
<li>As a user, I should be able to center on my location if I scan around the map and lose my position</li>
<li>As a user, I need to be able to see all important contact information such as the local emergency telephone number and the admin responsible for the current trip I am on</li>
<li>As a user, I want to be able to click on the phone numbers listed in the important information page to make the call in case I am in a panic</li>
<li>As a user, I should be able to add my own notes to the important information page that persists even if I shut my phone off</li>
<li>As a user, I should be able to send and receive messages from other admins and students in my current trip group</li>
<li>As a user, I should be notified if there is an urgent message, and also be able to clear the indicator of an urgent message once viewed</li>
<li>As a user, I should see an urgent message indicator for all urgent messages sent while my phone was off</li>
</ul>

# Minimum Viable Product (MVP)
The MVP per client expectations of the app is to be able to see itinerary events for each day, see the events pinned to a map, see important contact information, and to be able to read and send messages all with data persistence.

# Stretch Goals and Additional Features
<ul>
<li>Be able to navigate to the map screen from an itinerary event - MET</li>
<li>Have a GPS enabled map - MET</li>
<li>Be able to get directions from current location to target location - MET</li>
<li>Have search functionality on the map - MET</li>
<li>Have custom icons for the map to represent both Travel Bug specific locations and important local locations - MET</li>
<li>Have an editable text box on the important contacts screen to store my own important information - MET</li>
<li>Be able to make a phone call from the important contacts screen by clicking on the listed number - MET</li>
<li>Have an admin be able to flag a message as urgent for all users - MET</li>
<li>Have an indicator when there is an urgent message present that hasn't been seen yet - MET</li>
<li>Be able to send and receive pictures on the messages screen - MET</li>
<li>Have a bulletin board screen for users to post about their experiences including pictures - NOT MET</li>
<li>Have a pop-up modal to display relevant information about my current location as I move around the city the user is in - NOT MET</li>
<li>Have a third login tier for parents of students to see their itinerary events and experiences - NOT MET</li>
</ul>

# How does the app work?
Splash Screen:
<br />

<img src="./travel_bug/app/screens/assets/App Loading Screen.gif" width="150">

Login and Register:
<br />
<img src="./travel_bug/app/screens/assets/Login and Register.gif" width="150">

Itinerary and Calendar:
<br />
<img src="./travel_bug/app/screens/assets/Itinerary Screen.gif" width="150">

Map Directions:
<br />
<img src="./travel_bug/app/screens/assets/Map Directions.gif" width="150">

Map Search:
<br />
<img src="./travel_bug/app/screens/assets/Map Search.gif" width="150">

Important Contacts:
<br />
<img src="./travel_bug/app/screens/assets/Important Contacts.gif" width="150">

Messages:
<br />
<img src="./travel_bug/app/screens/assets/Messages.gif" width="150">


# Workflow and Key Lessons
Workflow was managed through GitHub and utilizing Agile workflow through Trello ticketing system.  The team also had daily standup meetings to ensure everyone was on the same page on what was getting worked on and what still needed to be done.
