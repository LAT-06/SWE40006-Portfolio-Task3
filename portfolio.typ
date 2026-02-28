#set page(
  paper: "a4",
  margin: (top: 1cm, bottom: 2cm, left: 2.5cm, right: 2.5cm),
  footer: context [
    #align(center)[
      #counter(page).display()
    ]
  ]
)

#set text(font: "Arial")

#align(center + horizon)[
  
  #text(size: 20pt, weight: "bold")[Swinburne University of Technology]
  
  #text(size: 18pt, weight: "bold")[
    SWE40006 - Software Development and Evolution
  ]
]

#v(2cm)
#align(center)[
  #line(length: 12cm, stroke: 2pt)
]

#v(1cm)

#align(center)[
  #image("assets/resized-swb_logo.png", width: 40%)
]

#v(2cm)
#align(center)[
  #text(size: 18pt, weight: "bold")[
    Deployment Portfolio Task 3 (10 points)
  ]
]


#v(3cm)
#align(center)[
  #table(
    columns: (4.5cm, auto),
    align: left,
    stroke: none,
    [*Lecturer Name:*], [Dr. Sam Nang],
    [], [],
    [*Student Name:*], [Lam An Thinh],
    [], [],
    [*Student ID:*], [105508512],
  )
]

#v(4cm)
#align(center)[
  #text(size: 10pt, style: "italic")[
    Swinburne University of Technology
  ]
]

#pagebreak()

#v(1cm)

= Task 3.1 Pass
*Create Azure account* 
- I have created an Azure account using my Swinburne student email by access into portal.azure.com and sign up for a free account. But I realized that I cannot use my Swinburne email to create the account, so I had to sign up for the Azure account.
#figure(
  image("assets/1.png", width: 55%),
  caption: "Azure Account Creation Confirmation"
)
*Install visual Studio/VS Code* 
- Vscode has been installed on my local machine.
#figure(
  image("assets/2.png", width: 55%),
  caption: "Vscode Installation Confirmation"
)
*Deploy any existing app to cloud via Azure*
- To deploy an existing app to cloud via Azure, I have already install .NET, PHP for task 3.3 and vscode extension for Azure App Service.
//2 pics in 1 line
#figure(
  grid(
    columns: 2,
    column-gutter: 1em,
    image("assets/3.png", width: 100%),
    image("assets/4.png", width: 100%)
  ),
  caption: " .NET, PHP, VS Code Azure extension Installation Confirmation"
)

- Then I go to terminal and create webapp
```sh
dotnet new mvc -o MyMVCapp
cd MyMVCapp
```
- Then I test locally by using these command
```sh
dotnet dev-certs https --trust
dotnet run
```
#figure(
  image("assets/5.png", width: 55%),
  caption: "Locally testing webapp"
)

- Then I run this command:
```sh
dotnet publish -c Release -o ./bin/Publish
```

- And you will see in `bin` folder will appear `Publish` folder

#figure(
  image("assets/6.png"),
  caption: "Publish folder"
)

- Then create go to azure portal and create webapp
#figure(
  image("assets/7.png", width: 55%),
  caption: "Azure Webapp Creation"
)

- Config the webapp and deploy the app to azure
#figure(
  image("assets/8.png", width: 100%),
  caption: "Azure Webapp Deployment"
)

- Then right right click the bin\Publish folder and select Deploy to Web App...
#figure(
  image("assets/9.png", width: 45%),
  caption: "Deploy to Web App"
)

- Select the webapp you just created and click Deploy
#figure(
  // 2 pics in 1 line
  grid(
    columns: 2,
    column-gutter: 1em,
    image("assets/10.png", width: 100%),
    image("assets/11.png", width: 100%)
  ),
  caption: "Select Webapp and Deploy"
)

- After deployment, you can see the webapp is running on azure
#figure(
  image("assets/13.png", width: 105%),
  caption: "Webapp Running on Azure"
)

#pagebreak()
#v(1cm)

= Task 3.2 Credit

- The procedure to complete the Credit task was similar to the Pass task. However, I created a new C\# Web App with higher complexity to deploy to the cloud via Azure.

- I create a work schedule for workers. It just static data for testing purpose. I have created a new webapp by using the same command as before

```sh
dotnet new mvc -o Task3C
cd Task3C
```
- Then I test locally by using these command
```sh
dotnet dev-certs https --trust
dotnet run
```
#figure(
  image("assets/14.png", width: 55%),
  caption: "Locally testing webapp"
)

- Then I run this command:
```sh
dotnet publish -c Release -o ./bin/Publish
```

- I use the already created webapp in azure portal and deploy the app to azure by right click the bin\Publish folder and select Deploy to Web App...

#figure(
  image("assets/15.png", width: 105%),
  caption: "Deploy to Web App"
)
- After deployment, you can see the webapp is running on azure
#figure(
  image("assets/16.png", width: 80%),
  caption: "Webapp Running on Azure"
)

- When I deactivate the webapp, it will show this error message

#figure(
  image("assets/17.png", width: 80%),
  caption: "Webapp Deactivated"
)

#pagebreak()
#v(1cm)

= Task 3.3 HD

- For the HD task, I have created a PHP webapp and deploy it to Azure. The webapp is a squid gameplay. Players can move by using w, a, s, d keys. The webapp is created by using Visual Studio Code and Azure App Service extension.

- First of all I test the webapp locally by using this command
```sh
php -S localhost:8000
```
#figure(
  image("assets/18.png", width: 85%),
  caption: "Locally testing webapp"
)

- Configure the webapp and deploy the app to azure portal
#figure(
  image("assets/19.png", width: 85%),
  caption: "Azure Webapp Deployment"
)
- Then right right click the folder and select Deploy to Web App...
#figure(
  image("assets/21.png", width: 65%),
  caption: "Deploy to Web App"
)

- Process of deploying the webapp to azure portal
#figure(
  image("assets/22.png", width: 100%),
  caption: "Select Webapp and Deploy"
)
- After deployment, you can see the webapp is running on azure
#figure(
  image("assets/20.png", width: 85%),
  caption: "Webapp Running on Azure"
)

= Conclusion
- In conclusion, I have successfully completed all the tasks in this deployment portfolio. I have created an Azure account, installed Visual Studio Code, and deployed two web applications to Azure. The first web application was a simple MVC application, while the second one was a more complex PHP web application. Both applications were successfully deployed and running on Azure. This experience has given me a better understanding of cloud deployment and the tools available for it. I am confident that the skills I have gained from this portfolio will be valuable in my future software development projects, especially those that require cloud deployment.