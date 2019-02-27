# Teafolio
**A social engineering application for tea drinkers**

Teafolio is a social app where members can build a tea portfolio, comment on teas, contribute teas to the site and make connections based on simular tea interests. 

[View Website](https://teafolio.herokuapp.com/)

![screenshot](https://raw.githubusercontent.com/ashley3schultz/teafolio/master/app/assets/images/proj2.PNG)

## Application features
### Membership features
* Member can signup and login with secure password
* Member can contribute teas
* Member can make posts on any teas, then edit or delete those posts
* Member and add and remove teas from their collection
* Member can accumulate connections with other users based on their tea collection

### Admin features
* Admin can see stats for users, teas, posts and teas submissions
* Admin can approve or deny tea submissions
* Admin can delete any post
* Admin can grant or remove admin permissions for other members.

## Using the API
Superiori-Tea-API is hosted on heroku and can be viewed at https://superiori-tea-api.herokuapp.com/

## Munnual Installation 

### Getting Started 
Make sure Ruby, Rails andJavascript is installed on your device.

### Installing
From the command line:
  ```
  git clone 'git@github.com:ashley3schultz/teafolio.git'
  ```
  ```
  bundle install
  ```
  ```
  rake db:migrate
  ```
  ```
  rake db:seed
  ```
  ```
  thin start --ssl
  ```
	
### Built With
* Ruby 
* Rails
* bcrypt
* ommniauth
* omniauth-facebook
* dotenv-rails
* thin
* jquery-rails
* active_model_serializers

## License
This project is licensed under the MIT License - see the LICENSE.md file for details

## Referances
* [Live Webite](https://teafolio.herokuapp.com/)
