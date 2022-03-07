# Color Oracle

A (satirical) web application that attempts to characterize a person using adjectives based on the colors found in their Instagram profile picture.

## Methodology
Website ColourLover's API was first used to obtain over 30,000 data entries in the form of a color represented by an RGB value and its corresponding user given title.

Indiscernible characters within the titles were removed and phrases were separated into individual words and categorized by type (noun, verb, and adjective), resulting in a data set over 10,000 entries long.

Upon inputting the name of a Instagram user on the webpage, a call is made to the server to request the profile picture associated with that user.

A color palette is generated from the profile image. Each containing colors is broken down into R, G, and B values which are then put through an algorithm which filters and cross references words with similar R, G and B values in the data set. 

## Setup

#### Dependencies

* ```npm install``` 

#### Execution

* ``` npm start ```
* Open http://localhost:5000

#### Usage

* Enter your Instagram username
* Get three adjectives based on the color palette of your profile picture

## Collaborators
* Elson Liang
* Omar Abdellatif
* Omar Ismail
