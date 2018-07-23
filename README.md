Project Title
Application for collecting, posting and contributing teas.
  User can signup and login with secure password
  User can Contribute teas
  User can make posts on any teas, then edit or delete those posts
  User and add and remove teas from their collection
  User can accumulate connections with other users based on their tea collection
  Admin can see stats of users, teas, posts and contributed teas
  Admin can approve or deny tea contributions
  Admin can delete any post
  Admin can grant or remove admin permissions for other users.

Installing
From the command line
  Run git clone 'git@github.com:ashley3schultz/teafolio.git'
  Run 'bundle install'
  Run 'rake db:migrate'
  Run 'thin start --ssl' to launch application

Running the tests
For testing purpose, A seed file is provided with various users and one admin user

Built With
Rails framework

License
This project is licensed under the MIT License - see the LICENSE.md file for details
