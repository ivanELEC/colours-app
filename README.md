# colours-app
Website for hosting the mix series concept birthed from Akash for hosting a mixes from DJs based on a particular colour. The website is a react application that primarily uses the Material UI component framework/library

# Chroma Mixes Website Documentation

This project is a React.js site was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The detailed bootstrap documentation is at the end of the readme.

Contents: 
1. How to retrieve the site code and run it locally
2. How to add new mixes
3. How to upload new version of the site to the server
4. In depth look at site code (ongoing)
5. Create React App Documentation

## 1. How to retrieve the site code and run it locally
Pre-requisites:s
1. Install the Git bah to your laptop (preferable over just downloading the code as you can run Git pull etc to get the most up to date code instead of re-downloading) - [Instructions](https://git-scm.com/downloads)
2. Install Node onto your laptop - [Instructions](https://nodejs.org/en/download/)
3. You must have a Github account and your Github account must have been given access to the repository, request this from Ivan via the Website channel of the Discord 

Step by Step instructions: 
1. Open the Node.js commpand prompt (this should have git commands installed into it from git)
2. In the console run: git clone "https://github.com/ivanELEC/colours-app.git"
3. Navigate to the colours-app folder of the repository (this will be referred to as the site directory folder)
4. In the console run: npm start 

Once the steps above are followed, a local server should run the site in your default browser

## 2. How to add new mixes

Mixes are loaded into the site via the mixData.json file which is located in colours-app/src/data/mixData.json. To update the site with a new mix, all the relevant assets need to be uploaded (mix to Soundcloud, image uploaded) and the mixData.json file needs to be updated. The site then needs to be re-built and re-uploaded into Bluehost. 

### Getting all the information for the mixData.json file

Below is an example of an element in the mixData.json file - the file is an array of these elements stored in a JSON file:

{
    "id":"SPECIALGUEST-Cherry",
    "embedId":"800381320",
    "artist":"SPECIAL GUEST",
    "date":"16/04/2020",
    "datecode":"20200416",
    "colourName":"Cherry",
    "colourHex":"#78000d",
    "link":"https://soundcloud.com/chromamixes/special-guest-cherry",
    "description":"Bisous 💋",
    "imageUrl":"https://firebasestorage.googleapis.com/v0/b/colours-project.appspot.com/o/images%2FmixImages%2Fcherry.JPG?alt=media&token=2efeb4b8-bcee-4092-9300-02c0eae1df8e",
    "links":[
        {"name":"Instagram","url":"https://www.instagram.com/invite_special/"},
        {"name":"Soundcloud","url":"https://soundcloud.com/invite_special"}
    ]
}

To update the file, add another element (note that each element is separated by commas) to the JSON. 

id: ID is the unique identifier for each element, the standard for the site is artist-colourName, this needs to be followed strictly to prevent getting identifiers that are identical as this will break the code in the site.

embedId: this is the unique ID for the mix that Soundcloud allocates it for embedding, this is the code that the site uses to generate the embedded Soundcloud player for each mix. To get this file, go to the mix, click on the Share icon and then navigate to the embed section of the popup. Here you will see a section called Code which has some html code, copy that code out into a text editor. In this code there is an attribute called "src" which is a link - the embedId can be found by taking the number code after "tracks/" and before the first "&" sign in the URL

**Note: remember to add images to this part of the documentation

e.g the bolded part below:

src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/**852529567**&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true

artistName: name of the artist as agreed upon by the artist in their communications to us

date: the date that the mix is due to be published and shared with people in DD/MM/YYYY format, this is what is displayed on the site (this will be deprecated when we update the page to just use the datecode)

datecode: this is a string that denotes the date that the mix is due to be published and shared with people. This is in the YYYYMMDD format. We use this as well as "date" because this is the format the code needs to sort the mixes into descending date. 

colourName: the name of the colour of the mix as agreed on by the artist in their communications to us

colourHex: the hex code of the colour of the mix as agreed on by the artist in their communications to us, including the # in the beginning

link: the Soundcloud mix to the link (this is currently not being used but I thought it would be important to save in case we needed it for future development)

description: the description text of the mix that is featured in the Mix page underneath the mix - this is agreen on by the artist in their communications to us 

imageUrl: the URL for an image file for an image that represents the mix as agreen upon by the artist in their communications to us. This image **must** be uploaded into a public server so do not use google drive links or anything like that. To keep things consistent upload the image to the public_html/images/mixImages folder of our Bluehost server. The image is then hosted at "www.chromamixes.com/images/mixImages"

links: This is an array of links that the artist has agreed to share in the mix in communications to us. In each array, there are 2 properties: name (the display name for the link), url (The Link URL). See the example of the mixData.json element above for reference.

### Testing 
Once a new mix is added to the mixData.json file and the file is saved, run the code locally to see if it is being included. 

It is also imperative to be testing the uploaded version in the site before making a public post.
 
## 3. Uploading a new version of the site to the server
Once a site has been locally tested - you can upload the new version of the site onto the Bluehost server using the following steps: 

1. Build new version of site - 
To build the site into a form that can be hosted online go to the site directory folder in the node console and run: npm run build. Once this has complete, a folder called build should be generated (or regenerated) in the folder. These are the files that will go into the server. 

2. Upload site into Bluehost - 
Navigate to the [Bluehost site](https://my.bluehost.com/web-hosting/cplogin) and login with the Chroma credentials. Access the Advanced panel by clicking on the user icon in the top left and clicking Security, then clicking the "Advanced" nav button on the left of the screen. 

Once in this panel, navigate to the File Manager. Here you can edit, delete and upload files.

Click on the public_html folder on the left (this is what hosts the site contents). Before you upload any files you will need to:

i). Download the current version of the public_html folder to your device to replace the site with if anything goes wrong
ii). Delete the precache-manifest files to prevent old cached data being stored on other people's browsers, these are at the top level of the public_html folder and all begin with "precache-manifest".
 

Now you will have to use the Upload button at the top nav bar to upload the files - note that this File Manager does not allow you to upload folders in bulk - therefore you need to upload the top level of the folder, then navigate to the sub folders to upload the files within those (note: at some point I'll look into how to setup an FTP client or do some scripting to make this a bit easier).

3. Test - 
Now go to the Chroma Mixes site and check that the site has correctly updated. If not, upload the backup of public_html you downloaded earlier and call Ivan Yohuno @ 07961263444 (note: if we make the repository public remember to take this number out)

## 4. In Depth Look Into Site
Note: In Progress

## 5. Admin and Development Upkeep

### Branches 
Branches are codified by <type of branch><incremental branch no>-<short description>
The codes are as follows: 
SC - Security/Vulnerability fix
BG - Usability Bug Fix
FT - Added feature
AD - Updates related to admin and DevOps such as adding extra CI/CD tooling or updating/creating documentation

Some examples of this would be: 
SC01-DependencyCheck-20211020
SC02-DependencyCheck-20211201
FT01-Gliding-Page-Transitions
    
SC01 and SC02 increment because we have multiple branches of the same type - they also have dates specifically because dependency checking is a regular occurance

### Dependency Vulnerabilities 
I am currently using Dependabot to check and verify vulnerabilities, however I do not review vulnerabilities from dev dependencies, the process for auditing is to use a tool such as [NPM Graph](https://npmgraph.js.org/) to identify what packages the vulnerabilities are linked to, verify whether the packages are even needed in the project, if yes - verify whether there's a change needed or just code updating. In each case, use judgement to determine whether the effort needed to fix is worth the risk reduction

## 6. Create React App Documentation

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

#### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

#### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

#### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

#### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

#### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
