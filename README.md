# [Fig, Vacuum, Chew Toy (Rock, Paper, Scissors)](https://jfogiato.github.io/rock-paper-scissors/)

## Abstract:
[//]: <>
I built a "Rock, Paper, Scissors" web app that allows users to select a token, a game mode, and a different fighter for each round. After their fighter is chosen, the computer randomly generates a choice and the winner is displayed. Users can also dynamically switch between game modes. Additionally, the app has `localStorage` enabled so even if a user exits the page they can save their scores.  

## Installation Instructions:
[//]: <> 
1. Fork and clone [this repo](https://github.com/jfogiato/rock-paper-scissors)
1. Copy the SSH key from the green "Code" button within the repo.
1. In your terminal, use the command `git clone git@github.com:[the link to your repo]`.
1. Open the repo in your text editor to make any changes or inspect code.
1. Use `open index.html` to open the app in your browser.

## Preview of App:
[//]: <> 
![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/57634618/212710572-a5c59331-9fc1-43c0-9971-065d747ede50.gif)

## Context:
[//]: <> 
This project was the final solo project of Mod 1 at Turing. The scope of the project was intentional in testing our ability to write Javascript, HTML, and CSS to build a fully functional application on our own. This project took about 10 hours to complete, and I completed all MVP functionality, as well as a handful of additional features to improve the UX.

## Contributors:
[//]: <> 
[Joseph 'Joe' Fogiato](https://github.com/jfogiato)

## Learning Goals:
[//]: <> 
The goal of this project was to write clean, DRY, SRP-driven Javascript, HTML, and CSS to build an application encompassing all that we learned throughout Mod 1.

## Wins + Challenges:
[//]: <>
I am very proud of the Javascript in this project. I abided by Single Responsibility Principle and wrote DRY code that is very readable, straight forward, and driven off of my Data Model. Additionally, I was able to contain all of my game-related functions within my `Game` and `Player` classes while keeping my `main.js` file strictly DOM manipulation. 

Outside of the Javascript, I also think that my HTML is minimal, semantic, and very legible. I kept `<div>`'s to a minimum and added comments where code was being inserted via JS. I prioritized developer empathy to make sure all of my naming conventions made sense and elements/classes/id's only existed if they were necessary.

The biggest challenge I had was in CSS. This language still feels the most unfamiliar to me, and while most of my code is decent, there were portions where I know I could improve and simplify. That being said, I am making concrete progress from project to project and am able to implement and troubleshoot CSS-related bugs more quickly each time. 

One bug that I encountered could be summarized as: after a user clicks their choice, the `Player` choice and the `Computer` choice are displayed. When the choices were displayed, the user was still able to click on either icon which would trigger the event listener for the section and prematurely initiate another round. To fix this bug, I added an `.unclickable` class to my CSS with the property of `point-events: none;`, and added that class to the HTML I was inserting when the two icons were displayed. This class was then removed when the `generateFighters()` function was called. These ~3 lines of code fixed the bug elegantly and easily and but a nice bow on the project. 