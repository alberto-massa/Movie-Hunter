# Addicted!

## Tabla de endpoints

| ID  | METHOD | PATH                          | DESCRIPTION                                    |
| --- | ------ | ----------------------------- | ---------------------------------------------- |
| 1   | GET    | /register                     | Renders the user register form                 |
| --- | ---    | ---                           | ---                                            |
| 2   | POST   | /register                     | Saves the user in the DB                       |
| --- | ---    | ---                           | ---                                            |
| 3   | GET    | /login                        | Renders the login form                         |
| --- | ---    | ---                           | ---                                            |
| 4   | POST   | /login                        | Logs the user into the website                 |
| --- | ---    | ---                           | ---                                            |
| 5   | GET    | /logout                       | Destroys user session                          |
| --- | ---    | ---                           | ---                                            |
| 6   | GET    | /admin/users                  | Displays a list of all users                   |
| --- | ---    | ---                           | ---                                            |
| 7   | GET    | /admin/:username/edit         | Displays a form with preloaded user data       |
| --- | ---    | ---                           | ---                                            |
| 8   | POST   | /admin/:username/edit         | Edits user data                                |
| --- | ---    | ---                           | ---                                            |
| 9   | GET    | /admin/:username/delete       | Deletes a user from database                   |
| --- | ---    | ---                           | ---                                            |
| 10  | GET    | /user/:username               | Displays user profile                          |
| --- | ---    | ---                           | ---                                            |
| 11  | GET    | /user/sendmsg/:targetusername | Renders the form to send message to other user |
| --- | ---    | ---                           | ---                                            |
| 12  | POST   | /user/sendmsg/:targetusername | Sends the message to target user               |
| --- | ---    | ---                           | ---                                            |
| 13  | GET    | /user/search/:username        | Searches user by username                      |
| --- | ---    | ---                           | ---                                            |
| --- | ---    | ---                           | ---                                            |
