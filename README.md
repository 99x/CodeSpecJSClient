# CodeSpecJSClient
Welcome to CodeSpecJSClient. Client side web application built on ReactJS for CodeSpecJS Engine which allows users to write UI Automation Tests without writing a single line of code. 
CodeSpecJSClient helps you build test suites and test cases with ease.
 * [Learn More about CodeSpecJS](https://github.com/99xt/CodeSpecJS/)

## Key Features
* Zero code UI Test Automation. I.e. You will not write a single line of code to define your tests. You will be using a set of well defined Gherkin grammar to define your tests. 
* Provids predefined grammar to support for all the necessary UI Automation Actions;
    * [URL Navigation](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#url-navigation)
    * [Clicking on UI Elements](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#click-on-ui-elements)
    * [Verifying content of UI Elements](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#verify-ui-element-content)
    * [Waiting for UI elements to appear](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#wait-for-an-ui-element-to-appear-or-to-show-a-given-content)
    * [Waiting for UI elements to show a specific content](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#wait-for-an-ui-element-to-appear-or-to-show-a-given-content)
    * [Wait a given number of seconds for application to complete its tasks](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#wait-for-an-ui-element-to-appear-or-to-show-a-given-content)
    * [Working with html select drop down lists](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#select-drop-down-lists)
    * [Working with Popup windows](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#working-with-popup-windows-and-iframes)
    * [Working with iframes](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#working-with-popup-windows-and-iframes)
    * [Working with Alert Message Dialogs ](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#working-with-alertsconfirmation-and-prompt-dialogs)
    * [Working with Prompt Dialogs](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#working-with-alertsconfirmation-and-prompt-dialogs)
    * [Drag and Drop UI elements](https://github.com/99xt/CodeSpecJS/wiki/CodeSpecJS-Supported-Grammar#drag-and-drop-items)

* Real quick startup time. I.e.Building a grammar is only a matter of seconds using intellisense.
* Create and manage multiple test suites and test cases with ease.
* Create and manage multiple object repositories with ease.
* Simple Analatics Dashboard to view the success and failure scope of every test suite, which could be understood by all parties (I.e. stakeholders, developers, testers etc)

## Getting Started
### Step 1: Setting up the development environment

1. You need to install [ NodeJs with NPM ](https://nodejs.org/en/). You'll also need to install and configure [ Git ](https://git-scm.com/). 
2. Latest version of Chrome
### Step 2: Clone the project
```
git clone https://github.com/99xt/CodeSpecJSClient
```
### Step 3: Install node packages
Step inside the project root folder and issue the following command to install node dependencies.
```
npm install
```
### Step 4: Running the application
Inside the project root folder, issue the following command
```
npm start
```

### Step 5: Start creating tests
1. Start creating your object repository first in the 'Object Repository' page
2. Create your test suites and test cases in the 'Create Test' page