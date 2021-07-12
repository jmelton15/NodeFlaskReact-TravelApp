<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <a href="server-and-hosting">About The Servers and Hosting </a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#data-storage-and-safety">Data Storage And Safety</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

### Capstone Project 2 - DTRI (Down To the Route of It) Refactored!
### This Is The React.js Frontend Part of Capstone 2

Fun Details about the servers and hosting can be found at the link above labeled "About Servers and Hosting"

This project is an expansion upon my first capstone project using what I learned about React and Node as well as self-taught learning from documentation online. The first capstone was done soley using Pythong-Flask combo. This capstone project is now done using Python/Flask, Node/Express, and React as well as a server (in node) using Socket.io that I used for a live messaging feature. The ReadMe files for the backends of the project are provide in my Github repository (they are labeled accordingly).
This README, as you probably know, corresponds to the frontend React part of the project. However, I will discuss how the entire application works below.

The concept behind my application is to create a social community for anyone that likes to travel, but doesn't really want to spend a ton of time searching the web for the best places along a route on their trip. My app allows users to connect (follow each other) as well as live message each other to check in. On a user's profile is an activty feed that will display the recent activity of their connections in which the user can like and unlike. This allows trips that other people have created to be viewed as a source of curiosity as to what trips to take next! Users can upload their own picture file as their profile image as well. When a user is ready to "plan" a trip or create a trip, they can head over the the Create A Trip page. From there the user can type in start and stop locations as well as waypoints or Points Of Interest (i.e. Parks, Museums, Arcades, Burgers, Rest Stops, Gas Stations, etc.) and the region (country) they are traveling in. My app will proceed to find top rated places in each Point of Interest at calculated stops along the route. Once created, the user can save the trip. All of the users saved trips will appear in their own flip-able Travel Journal where the user can see all the found locations organized by Point Of Interest with links to each place on the web and a customized photo that corresponds to one of the places on their trip. On each page is an icon that allows the user to bring their trip back up on the map with markers to view.

Despite being up and running, this application will continue to be worked on. Any feedback, tips, ideas, or even bugs that you may find while trying it out,
please let me know!

QUICK NOTE TO USERS - > there is a good chance that I will have to take my app offline for a period of time as I work to try and find ways to afford the costs of running it fulltime.

### Future Plans
 Future plans involve:
1.) Ways to monetize the site for fulltime running
2.) A customizeable itinerary add-on to the travel journal where users can add their own notes about a trip and photos
3.) Smarter search algorithms that allow for creating trips based soley on common trips from internal users
4.) A mobile app to go along with the web app, which will make the live messaging feature much more user friendly
5.) update notifications about the site status and updating users if they have a new message from someone

## Reasons Behind API Choice
I opted to use Google Maps as my mapping API because of their nearby_places integration and depth. I have limited the number of trips users can make 
in order to prevent making too many requests to Google since it is not a free API to use.


<!-- BUILT WITH -->
### Built With - Credits To The Following:

* [React.js](https://reactjs.org/)
* [HTML & CSS](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [AXIOS](https://github.com/axios/axios)
* [Bootstrap 5](https://getbootstrap.com/)
* [Reactstrap](https://reactstrap.github.io/)
* [GOOGLE MAPS API](https://cloud.google.com/maps-platform/?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_274433407138-ADGP_Hybrid%20%7C%20AW%20SEM%20%7C%20BKWS%20~%20Google%20Maps%20API-KWID_43700033921822021-aud-599437145008%3Akwd-335425467-userloc_9017525&utm_term=KW_google%20maps%20api-ST_google%20maps%20api&gclid=Cj0KCQiA7NKBBhDBARIsAHbXCB5idACJ_A39gBkebSY75I0EkCuOraqAZKzGsgi3X4nirsE8FTh0j5caAmSUEALw_wcB)
* [St Page Flip](https://nodlik.github.io/StPageFlip/)


<!-- GETTING STARTED -->
## Getting Started
 For how to use the app, got to the "About The Site" link on the navigation bar of the web app

<!-- DATA STORAGE AND SAFETY -->
## Data Storage And Safety

Passwords from users are encrypted with a well-trusted encryption algorithm, not one that I made on my own.

<!-- SERVER AND HOSTING -->
## Server and Hosting Situation

As a side project, I decided to learn Nginx as well as linux (up until this point I have only worked on Windows OS).
With this new learning, I launched my frontend through Nginx on a linux Virtual Machine.

<!-- CONTACT -->
## Contact

Your Name - [John Melton]
Email - [johnmelton.projects@gmail.com]









