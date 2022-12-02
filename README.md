## Calendar Buddies

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
This browser based web application to help people with busy or chaotic schedules to organize a time to get together with friends or family. 

These are the members in our team: 
* Hi, my name is Lisa Zhu. I'm excited about this project because it is my first project.
* Heyo, Matthew here
* Hi, my name is Nelson. I'm excited to make a great web application!

## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* Firebase
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # login HTML file, this is the first step that users get into app
├── main.html                # main HTML file, this is the main page of our app
├── daily_schedule_edit.html # event edit HTML file
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /background.jpg          # background picture of our app
    /calendar_icon.png       # app icon picture displayed in the main page
    /favicon.ico             # website icon for our app
    /groupCalendar.jpeg      # welcome picture in the index.html
├── scripts                  # Folder for scripts
    /authentication.js       # authentication for the users
    /create_&_join_group.js  # complete create/join/leave a group functions
    /daily_schedule_edit.js  # complete create/edite/delete event functions
    /firebaseAPI_TeamBBY04.js# for firebase configuration
    /login_redirect.js       # complete signin and sign out functions
    /monthcalendar.js        # complete show calendar and load personal/group calendars functions
    /skeleton.js             # load navbar and footer template
    
├── styles                   # Folder for styles
    /button.css              # button styles
    /monthlycalendar.css     # main styles for the app
├── text                     # Folder for basic html
    /footer.html             # footer of the app
    /nav.html                # nav bar of the app

Firebase hosting files: 
├── firebaser.json
├── firebaser.indexes.json
├── firebaser.rules
```

Tips for file naming files and folders:
* use lowercase with no spaces
* use dashes (not underscore) for word separation

