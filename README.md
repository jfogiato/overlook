# [The Grand Budapest Hotel EMS](https://jfogiato.github.io/)

  

## Abstract:

[//]: <>

For the final solo project of Mod 2, I built an enterprise management software for the Grand Budapest Hotel. A user can log in and see a dashboard where they can select a date, view available rooms (with price, ameneties, etc), book a room, see their future and past bookings, delete future bookings, and see how much they've spent at the hotel. A manager can also log in and see a similar dashboard, but with the ability to search for a specific user,and book & delete rooms for that user.


## Installation Instructions:

[//]: <>

1. Fork and clone [this repo](https://github.com/jfogiato/overlook) and  [this repo (backend API)](https://github.com/turingschool-examples/overlook-api).

1. Copy the SSH key from the green "Code" button within each repo.

1. In your terminal, use the command `git clone git@github.com:[the link to each repo]`.

1. Run `npm install` in both local repositories -- Do NOT run `npm audit fix --force` when prompted.

1. Open the repo in your text editor to make any changes or inspect code.

1. Run `npm start` in your terminal for both repos.

1. Copy and paste the generated `localServer` address that your terminal provides for the front end repo into your browser address bar.

1. Use a username of "customerXX" where XX is a number between 1 & 50, or use "manager" to see the manager view. Password is "overlook2021" for both. Note - if a single digit, do not include a 0. eg ✅"1" vs ❌"01".
  

## Preview of App:

[//]: <>
![GBPH1-min](https://user-images.githubusercontent.com/57634618/223189791-4d69aa4b-3eb2-4ddc-96ab-ac799d844628.gif)

![GBPH2-min](https://user-images.githubusercontent.com/57634618/223189847-9a8f6679-a8ad-46f0-b1a5-1d6a53aeeb8a.gif)

![GBPH3-M-min](https://user-images.githubusercontent.com/57634618/223189857-3aedd269-d549-4fb8-94ee-eecc5a7b21ff.gif)
 

## Context:

[//]: <>

This project was the final solo project of Mod 2 at Turing. The scope of the project was intentional in testing our ability to write Javascript, HTML, and CSS to build a fully functional application on our own. Additionally, we incorporated a backend server and API's to GET, POST, and DELETE data. This project took about 25 hours to complete, and I completed all MVP functionality, as well as a handful of additional features to improve the UX.


## Contributors:

[//]: <>

[Joseph 'Joe' Fogiato](https://github.com/jfogiato)

  
## Learning Goals:

[//]: <>

The goals of this project were (1) use OOP to drive the design of the application and the code, (2) work with an API to send and receive data, (3) solidify the code review process, and (3) create a robust test suite that thoroughly tests all functionality of a client-side application.

  
## Wins + Challenges:

[//]: <>

Overall, I am confident with my work on this project, and how the application turned out. I was able to wireframe a design, implement passing functionality, and implement about 70% of the styling within three days of being assigned project. I was then able to use the remaining time to add features that enhanced the user experience and made using the application more appealing and seamless. 

I am very happy with the layout, readability, and versatility of my Javascript in this project. For both classes and DOM-related functions/methods, I prioritized SRP and DRY code, as well as utilizing parameters to enable code to be reused across different parts of the code base. 

For login error handling, I utilized boolean variables that were assigned based off the user inputs, and then checked those variables in my conditional. This allowed my error handling for that portion to be much clearer and cleaner to someone who has to familiarize themselves with the codebase. 

The last major win that I am proud of on this project was my `apirRequest` function. This function utilized a handful of parameters to able to GET, POST, and DELETE all from within the same function. 


The major challenges I had on this project arose from switching between customer and manager views. Keeping track of which pieces of the dashboard should be visible, which data was being populated where, and ensuring functions were firing with the right arguments took a lot of trial and error and path testing.
