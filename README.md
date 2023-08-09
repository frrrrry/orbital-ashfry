<p align="center">
  README
</p>  

# Link to Milestone 3 README
[Milestone 3 README](https://docs.google.com/document/d/104morCrSQ18mAYLaTfUYzIMV09HacxdoMMfMSA6Za0c/edit?usp=sharing)

# Team Name 

Ashfry

# Proposed Level of Acheivement:

Apollo

# Motivation 

Do you want to stop telling your friends or yourself that you are broke and can’t afford to buy anything? Do you want to start working towards your goal of buying that new gaming PC that you have been eyeing on since forever but you have no money to afford? 

Many find it a hassle to manually track whether they are spending over their allowance or spending limit as in our fast-paced society, it is hard to find the time to search for every single printed or online receipt that we have accumulated and calculate the total amount by hand. Also, you may want to work towards your savings goals but it is annoying to keep calculating your expenditures by hand. 

Therefore, we hope to create a centralized platform that solves such troubles and worries of people facing such issues so that people can efficiently and easily keep track of their expenses and work towards their savings goals.

# Aim

We hope to make an **Android** app for people to keep track of their expenditures for them to maintain a healthy habit of saving money.

# User Stories

*[Must-have]*
1. As a broke college student I would like to record my daily expenses and ensure that I am spending within my budget.

*[Nice-to-have]*
1. As a thrifty person, I can see my total spending in a day to keep track of my expenditure and ensure that it does not exceed a certain amount.
2. As someone who wants to know how much I saved up by the end of the month without manually calculating all my transactions and income/allowance, I would like an app to help me calculate the amount I would save up by the end of the month.

*[Could-have]*
1. As a swiftie, I would like to save up money to go to her concert and hence I would like to record how much money I have saved to eventually achieve my goal of buying their concert ticket before the ticket sales date.
2. To buy a birthday gift for my best friend, I would like to have a money saving app to motivate and remind me to save up a certain amount of money by my friend's birthday, to be able to afford to buy their birthday gift.

# Scope of Project

Track-me is an **Android app** that enables users to key in their daily transactions and create purchase goals easily. 

## Features

### LOGIN/SIGN UP PAGE

#### Goals: 

* For users to create their account and essentially be able to use the app.

#### Specifications: 

* Allows users to create an account and login to their accounts to subsequently use the app
* Allow users to reset password (a password reset email will be sent to the given email)
* Database integration to store user’s email address and password for user authentication

#### Implementation: 

Our app will first check if the user is logged in. If a user is logged in, we will redirect the user to the home page. 

If the user is not logged in, we will show the front page for the user to click on ‘Sign in’ or ‘Sign up’. 
When a user clicks on ‘Sign in’, they will need to input their email and password. If an account exists, they will be directed to the home page. However, if the account does not exist, a message (Account does not exist. Do create account) will be shown to prompt the user to create an account.

When registering with email and password, our app will call Firebase authentication createUserWithEmailAndPassword. Upon successful account registration, we will also create a user document in the Firebase database which will be used for our user profile feature. Once the user successfully logs in, they will be routed to the home page and the account will be reflected in the Firebase authentication.

The FirebaseAuthExceptions are handled within a try-catch block and an error message will be displayed when the user keys in an invalid input.


### USER PROFILE 

#### Goals: 

* For users to edit and design their own profile 

#### Specifications:

* Allows users to edit their username 
* Allows users to add profile pictures 
* Allows users to write a bio where they can write a short description of themselves as well as their saving goals 
* Database integration to store user’s profile data (i.e. profile picture, username and bio)

#### Implementation: 

When a user clicks on ‘Edit Profile’ found in the profile page, they will be redirected to the edit profile page. They will then be able to update their profile picture, username and bio. It is optional for the user to fill in their username and bio, and it is also optional to upload a profile picture. Once they click on save, their information will be updated in the Firebase Database, whereby the username and bio will be saved into our ‘users’ collection in firestore and their profile pictures will be uploaded into firebase cloud storage named after their user uids. 

Users will be directed back to the profile page and they will get to see their updated profile picture, username and bio. If the user does not want to save the information, they can click on cancel and will be directed back to the profile page. 

For users who edit their profile second time onwards, they will be able to see their previous profile details. This makes it easy for the user to refer to their previous profile details.This means that users do not have to press cancel to navigate back to the user profile page to refer to their previously uploaded profile picture or their previous username and bio. Hence, we want to make it easier for users to edit their profile by displaying their previous profile details. 

#### Implementation Challenges: 

A problem we faced when implementing our user profile and edit profile page is that we had troubles when uploading and retrieving image data to firebase storage. We first faced the issue of not being able to see our image file uploaded to firebase storage. But after some more experimenting and getting more knowledge about firebase cloud storage online, we managed to upload the image file into firebase storage and consequently retrieve the image uri of the uploaded image to be shown in our user profile page as seen in the diagrams below. 

However, the problem did not end here. Afterwards, we realized that users who had uploaded their profile picture earlier are not able to see it removed in their user profile page even after editing their profile to not have a profile picture (i.e. they went to edit profile page again without uploading an image and saving after). We manage to maneuver around the problem by uploading a dummy avatar image to firebase storage if the image uri is empty (i.e. users did not upload an image). This allows the dummy avatar to be shown in the user profile page which indicates that the user did not upload a profile picture. 


### SAVING BOOK

#### Goals:

* For users to keep track of all of their daily transactions and for them to get a good estimate of their allowance goal
* Reminds users to stay in their allowance goal

#### Specifications:

* Allows users to keep track of their transactions everyday by adding their transactions in 
** Naming option available for users to indicate what type of transaction they did
* Calculates the sum of money spent daily
* Displays total weekly and monthly expenditure (this feature can be turned off) 
* Warns users when their total transactions for a specific time period exceeds the allowance they put in for that time period under their user profile
* Database integration to store user’s daily transactions data

#### Implementation: 

In the saving book page, users will get to see the income, expense, balance and the list of transactions they have recorded. 
To add new transactions, users will tap on the plus icon found at the bottom right of the screen. Users will be navigated to the add transaction page where they will need to select the type (income or expense), date, category (education, shopping, others, etc), amount and note. We used a try-catch block and displayed an error message to the user if there is a missing type, category or amount. Once a user has confirmed that the information is correct, they can tap on the ‘save’ button and the information will be saved into Firestore under the collection called ‘transactions’, and they will then be routed back to the saving book page. If the user does not want to save the information, they can tap on the ‘cancel’ button and will be routed back to the saving book page.
To edit an existing transaction, users will tap on the transaction they would like to edit. They will be routed to the edit transaction page. The user would be shown the previous transaction information. This makes it easy for the user to refer to their previous transaction and know what they want to change without navigating back and forth between the saving book page and the edit transaction page. Similar to the add transaction page, users can select the type (income or expense), date, category (education, shopping, others, etc), amount and note in the edit transaction page. Once the user has confirmed that the information is correct, they can tap on the ‘save’ button and the information will be updated into firebase and will be routed back to the saving book page. If the user does not want to save the information, they can tap on the ‘cancel’ button and will be routed back to the saving book page.

#### Implementation Challenges:

A challenge faced when implementing the dropdown list was that the list overlaps with the other components in the screen. To solve this issue, we used dropDownDirection="TOP" which makes the dropdown box upwards instead of downwards. 
Another challenge faced is figuring out how we can navigate users from a screen to another screen while at the same time passing a parameter. Initially, we tried using navigation.navigate. However, we did not have any stack screen so this was not a valid option. We manage to pass the parameter by making use of AsyncStorage. AsyncStorage allows us to store the data and retrieve it in any other screens. 


### SUB-WALLET

#### Goals: 

* For users to work towards something they want to achieve (e.g. buying a new phone, saving more money, etc.)

#### Specifications: 

* Allows users to create “sub-wallets” where they can key in the amount they want to save up eventually by a specific date 
* Users can key in the amount they saved in through small additions 
* Naming option available for users to give a name to their sub-wallet 
* Notepad option available for users to describe the purpose for their sub-wallets (e.g. general savings, new iPhone 15 pro, birthday gift for my best friend, etc.) 
* Time option available which is measured in days 
* Calculates the percentage of user’s progress to achieving their savings goal 
* Reminder option available which can be turned off or on where app gives daily reminders of your goal to reaching the amount specified in your sub-wallets
* Database integration to store user’s sub-wallet data

#### Implementation: 

In the subwallet page, users will get to see the wallets they created. If the user did not create any wallets yet, they will see a blank page only with the plus button on the bottom right. Each wallet component they see will consist of the wallet’s title, current amount saved, total amount they wish to save and a progress bar with the percentage of their progress which is calculated by using the formula: (currAmount / totalAmount) x 100. 

To create a wallet, the user will have to click on the plus button on the bottom right which will direct them to the add wallet page. In this page, the user will have to fill in the title, start date, end date, total amount, and current amount of the wallet they wish to have. Filling up the note input is optional. They will receive error messages if the title, start date, end date, total amount and current amount are empty or less than or equal to zero. Once done, they will have to click on the save button to upload their wallet details into our firestore collection called “subwallets”. However, if they do not wish to save their new wallet, they can click on the return button on the top left to be directed back to the subwallet page. The subwallet page will then retrieve the wallet data from our firestore collection and display the wallets in a list format of different wallet components. 

If users want to edit the details of their wallets like changing the title or extending the deadline of their wallets, they can swipe their wallets to the left (left-swipe) and click on the blue edit button to be directed to the edit wallet page where they can edit their wallet details. The updated wallet details are then consequently updated in our “subwallets” collection in firestore. 

If users want to delete their wallets, they can similarly perform a left-swipe on the corresponding wallet they wish to delete. They can then press on the red delete button to delete their wallet and close their wallets. 

If users want to add money into their wallets they can choose to either edit their wallet or they can use a more efficient and faster method. This faster method requires them to just click on the wallet component they wish to add money into. They will subsequently be directed to the add money page. In the add money page. They can quickly top-up their wallets by clicking on the common top-up amounts provided, namely 5, 10, 15, 20, 50 and 100 dollars. But if they wish to top-up their wallet with a custom amount, they can input their custom amount. Once they click onto the save button, their wallet’s current amount will be updated and they have successfully top-up their wallets. But if they do not wish to top-up their wallets once in the add money page, they can click on the return button on the top left to be directed back to the subwallet page. 

#### Implementation Challenges: 

One challenge faced was the uploading and retrieval of wallet details from our “subwallets” collection in firestore. This is because the data array required has to be an array of objects and due to the unfamiliarity of passing props between multiple components, it made it very confusing for the wallet data to be shown in each of the wallets. But after using some test data to figure out how props are passed between components in react, we managed to figure out how to display the data in our subwallet page successfully. 


### ADDITIONAL FEATURE: SUBWALLET ANALYTICS (NOT IMPLEMENTED)

#### Goals: 

For users to get a more detailed progress report of their subwallets' saving journeys.

#### Specifications: 

* Allows users to see their daily average amount saved in their wallets
* Allows users to see the remaining amount they have to save in their wallets
* Allows users to see the amount of money they have saved each day in a particular week
* Allows users to see the stats every week

#### Implementation: 
Users would be directed to the analytics page of each of their wallets created by clicking on their respective wallets from the subwallet items in the homepage. 

In the analytics page, they would see their wallet title, a bar graph of their wallet’s daily saving progress and the total, current and remaining amount in their wallet. The bar chart would show the amounts of money saved each day and their daily average saved in a particular week.


# Tech Stack

## Front-End
* Figma
* React Native

## Back-End
* Firebase

# Proof-of-Concept

Refer to video demonstration:

[Link to Milestone 3 video](https://youtu.be/P93E0ENs5AU)

[Link to Milestone 3 poster](https://drive.google.com/file/d/1C32iyN6UnL7-SazcdgfVUwaXlDc62dXk/view?usp=sharing)


# Project Log

Refer to attached spreadsheet:

[Link to Ashfry Project Log](https://docs.google.com/spreadsheets/d/1trdUuaUdj4Q0U_DUkenU0PnDvQ4wsMBUp0TCZhxd8Gw/edit?usp=sharing)

