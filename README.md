# Color Oracle

A (satirical) web application that attempts to characterize a person using adjectives based on the colors found in their Instagram profile picture.

![Untitled-2](https://user-images.githubusercontent.com/10892740/156983011-b88f6cbd-30b5-423f-937c-4c200d6ce607.png)

## Background

The aim of our project was to create a tool utilizing a data driven approach to create social perceptions based on Instagram profiles as a way of exposing key biases in the use and misuse of data sets. We do this by associating prominent colors found in one's Instagram profile picture to three supposedly hyper-personalized traits. Color associations are used to create broader assumptions about a person under the pretense of computational data analysis. This project was inspired by the numerous AI generators that seem to suggest that data based processes are always trusted. We therefore hope to reveal the fallacies in believing that data is always factual, reliable, and impartial.

In producing this project, the goal was to encourage the users of the tool to consider the wider implications of hidden algorithmic decision making. This is a particularly pressing question considering the rapid integration of AI and algorithmic processes in many social aspects including healthcare, law enforcement and job hiring.

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

#### Usage

* Open http://localhost:5000
* Enter your Instagram username
* Get three adjectives based on the color palette of your profile picture

## Collaborators
* Elson Liang
* Omar Abdellatif
* Omar Ismail
