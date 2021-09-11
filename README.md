# Addicted!

## Tabla de endpoints

| ID  | METHOD | PATH                          | DESCRIPTION                                     |
| --- | ------ | ----------------------------- | ----------------------------------------------- |
| 1   | GET    | /register                     | Renders the user register form                  |
| 2   | POST   | /register                     | Saves the user in the DB                        |
| 3   | GET    | /login                        | Renders the login form                          |
| 4   | POST   | /login                        | Logs the user into the website                  |
| 5   | GET    | /logout                       | Destroys user session                           |
| 6   | GET    | /admin/users                  | Displays a list of all users                    |
| 7   | GET    | /admin/:username/edit         | Displays a form with preloaded user data        |
| 8   | POST   | /admin/:username/edit         | Edits user data                                 |
| 9   | GET    | /admin/:username/delete       | Deletes a user from database                    |
| 10  | GET    | /user/:username               | Displays user profile                           |
| 11  | GET    | /user/sendmsg/:targetusername | Renders the form to send message to other user  |
| 12  | POST   | /user/sendmsg/:targetusername | Sends the message to target user                |
| 13  | GET    | /user/search/:username        | Searches users by username                      |
| 14  | GET    | /user/:username/edit          | Renders edit form for users (Username & Avatar) |
| 15  | POST   | /user/:username/edit          | Saves user edit into the DB                     |
| 16  | GET    | /movie/search/:movieId        | API call to search movies                       |
| 17  | GET    | /movie/details/:movieId       | API call to display movie details               |
| 18  | GET    | /                             | API call to render top and upcoming movies      |
| 19  | GET    | /mod/filter                   | Shows a list of comments to filter              |
| 20  | GET    | /mod/filter/:commentId        | Shows the form to accept or reject a comment    |
| 21  | POST   | /mod/filter/:commentId        | Accepts or rejects the comment                  |

## Tabla de permisos

| Invitados            | Usuarios                  | Mods              | Admin |
| -------------------- | ------------------------- | ----------------- | ----- |
| /, /login, /register | Todo menos /mods y /admin | Todo menos /admin | Todo  |
