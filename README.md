# Teafolio
Application for collecting, posting and contributing teas
 - User can signup and login with secure password
 - User can Contribute teas
 - User can make posts on any teas, then edit or delete those posts
 - User and add and remove teas from their collection
 - User can accumulate connections with other users based on their tea collection
 - Admin can see stats of users, teas, posts and contributed teas
 - Admin can approve or deny tea contributions
 - Admin can delete any post
 - Admin can grant or remove admin permissions for other users.

## Installing
From the command line
  ```
  git clone 'git@github.com:ashley3schultz/teafolio.git'
  ```
  ```
  bundle install
  ```
  ```
  rake db:migrate
  ```
  rake db:seed
  ```
  ```
  'thin start --ssl' to launch application
  ```

## Running the tests
For testing purpose, A seed file is provided with various teas, pending teas and users including one admin user.

## Using the application
Start by signing as a new user, once logged in you will be directed to the home page
Go to browse teas and add some teas to your collection
Once the tea is in your collection, rate each tea from 1 to 5
Make a comment on any tea
Add a tea to the database, once you've submitted a tea it will show up on your home page under the pending section, if it is approved by admin it will display in in the teas and you will be granted a contribution point
Friend connections will automatically be added to your profile once someone else has the same tea in their collection.
Checkout the admin console by logging in with the test admin users
 - username: admin
 - password: password
 As admin approve or deny pending teas
 As admin can grant and remove admin status to other users
 As admin delete posts if applicable
 As admin edit or delete teas from the database

## Built With
Rails framework utilizing various gems for added features including:
 - bcrypt
 - ommniauth
 - omniauth-facebook
 - dotenv-rails
 - thin
 - jquery-rails
 - active_model_serializers

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
