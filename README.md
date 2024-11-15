# Script to Sound 🔊 

![Screenshot of the website in different screensizes](docs/view-different-devices.png)



## Table of contents
1. <a href="#ux-design">UX Design</a> 
2. <a href="#features">Features</a>
3. <a href="#usability">Usability</a>
4. <a href="#technologies-used">Technologies used</a>
5. <a href="#testing">Testing</a>
6. <a href="#bugs">Bugs</a>
7. <a href="#validator-testing">Validator testing</a>
8. <a href="#deployment">Deployment</a>
9. <a href="#credits">Credits</a>
10. <a href="#acknowledgements">Acknowledgements</a>

## UX Design


### Accessibility:


### Feedback Mechanism:

- "sent" messages
- Hover and click effects on buttons and links

### Consistency:

The website maintains a consistent design language throughout all screens, using a cohesive color scheme, typography, and layout. This consistency helps users focus on the content and functions without being distracted by changing interfaces.

#### Color scheme

![Four squares, one of a different colour](docs/colour-scheme.png)

The chosen color palette, featuring Deep Teal (#004C6D), Mustard Yellow (#FFB700), Soft Cyan (#B2EBF2), and Charcoal (#36454F), is specifically designed to prioritize accessibility and inclusivity. The combination provides high contrast and visual clarity, making it suitable for users with color vision deficiencies, including deuteranopia, protanopia, and tritanopia. Deep Teal and Charcoal serve as strong base colors, while Mustard Yellow and Soft Cyan add brightness and distinguishable accents. This palette ensures that interactive elements, text, and backgrounds remain easily recognizable, even for users with limited color perception, supporting a user-friendly and inclusive interface.

#### Favicon



![Icon ](assets/favicon/android-chrome-192x192.png)



### Wireframes

- The website layout is highly simple and centralized. Divs with curved edges were chosen to give a lighter mood to the website. Simple design also helps with clarity and navigation. All buttons are accessible with your thumb closer to the bottom of the page, which can be useful for users with large cellphones.

    #### Home page desktop

    ![Wireframe of the home screen on desktop device](docs/wireframe-desktop-01.png)

    #### Features page desktop

    ![Wireframe of the features/benefit screen on desktop device](docs/wireframe-desktop-02.png)

    #### Home and Features page mobile

    ![Wireframe of the home and features screen on mobile device](docs/wireframe-mobile-01.png)
    #### Team page mobile

    ![Wireframe of the team screen on mobile device](docs/wireframe-mobile-team-members-page.png)

    #### Team page desktop

    ![Wireframe of the team screen on desktop device](docs/wireframe-desktop-team-members-page.png)

## Features

### Home page

The landing page provides a clear introduction to the website and its purpose, ensuring users understand its value right away. It includes:

- Title: A concise and engaging title that captures the essence of the website.
- Landing Image: A visual element that enhances the theme and creates an inviting atmosphere.
- Welcome Message: A brief, welcoming note to guide users and set expectations.
- Three Informational Cards: These cards highlight:
    - The key feature of the website.
    - The benefits it offers to users.
    - The target audience for whom the website is designed.
  
From the moment users land on the page, they will clearly understand:
- What the website is about.
- Why it’s useful.
- How to get started using it.


#### Desktop

![Screenshot of homepage](docs/home-page.png)

#### Mobile

![Screenshot of homepage on a cellphone screen](docs/home-page-mobile.jpg)

### Team page

The team page introduces the talented individuals behind the project, showcasing each member's contributions and background. It includes:

- Picture/Avatar: A visual representation of each team member.
- Names: The name of each team member for easy identification.
- Main Contributions: A brief summary of the key contributions each team member made to the project.
- Nationality: Information about each team member’s nationality, adding a personal touch.
- Brief Description: A short bio or background highlighting relevant skills or experience.
- GitHub Icon: A clickable icon linking directly to each team member’s GitHub profile for easy access to their work and projects.

This page provides users with a deeper understanding of the people behind the website and their roles in its development.


#### Desktop

![Screenshot of the teams's page](docs/game-page.png)

#### Mobile

![Screenshot of the team's page on a cellphone screen](docs/game-page-mobile.jpg)


### Features page

The website offers a simple and intuitive one-page interface designed to provide an accessible and seamless text-to-speech experience. Users can select from three distinct voice options, clearly labeled to highlight differences such as gender or tone, ensuring flexibility and personalization. A single text input field allows users to type or paste their desired text, which is then converted into speech using a robust text-to-speech API. The page features a clean and minimalist design, focusing on functionality and ease of use without unnecessary distractions, making it approachable for users of all skill levels.

#### Desktop

![Screenshot of desktop page](docs/final-score-page.png)

#### Mobile

![Screenshot of mobile page](docs/final-score-page-mobile.jpg)

## Features left to implement

As part of the project's evolution, the following features are being considered to enhance functionality and accessibility:

1. Playback Controls

   - Add options to pause, stop, and replay the generated audio, providing users with greater flexibility in interacting with the speech output.

2. Adjustable Speech Settings

   - Introduce controls for adjusting speech speed and volume, allowing users to personalize their listening experience.

3. Accessibility Enhancements

    - Explore the addition of screen reader compatibility and keyboard navigation to improve accessibility for users with disabilities.

4. Multi-Language Support

    - Investigate expanding text-to-speech capabilities to include multiple languages, making the website more inclusive for a global audience.
  
These features reflect our aspirations to further refine and improve the website's usability in the future.

## Usability

---

## Technologies used

| Technology                               | Use                                                                                          |  
|------------------------------------------|---------------------------------------------------------------------------------------------|  
| HTML                                     | Structure the webpage.                                                                      |  
| CSS                                      | Style and add layout to the project.                                                       |  
| JavaScript                               | Make the website interactive.                                                              |  
| Django                                   | A Python-based web framework used to develop the backend, manage server-side logic, and handle routing. |  
| [Heroku](https://www.heroku.com/)        | Cloud platform used for deploying, managing, and hosting the live version of the website.   |  
| [GitHub](https://github.com/)            | Version control platform used to store the project’s repository, collaborate on code, and manage deployments. |  
| [Assembly API](https://www.assemblyai.com/) | Provides the text-to-speech functionality, converting user-input text into spoken audio seamlessly. |
| [Balsamiq](https://balsamiq.com/)        | Used to create wireframes and design the structure of the website.                          |  
| [Font Awesome](https://fontawesome.com/) | Used for the GitHub icon.                                                                   |  
| [Google Fonts](https://fonts.google.com/) | Research, pair, and add fonts to the project.                                               |  
| [Optimizilla](https://imagecompressor.com/) | Compress images.                                                                            |  
| [WEBP Converter](https://cloudconvert.com/webp-converter) | Convert jpg/png images to webp format.                                                     |  
| [Favicon.io](https://favicon.io/favicon-converter/) | Create favicon files.                                                                      |  
| [Am I Responsive](https://ui.dev/amiresponsive) | View and screenshot the page on different devices.                                          |  


## Testing




|Test                           |Action                     | Expected result                |Outcome|
|-------------------------------|---------------------------|--------------------------------|-------|


### User testing



# Bugs


# Validator testing

### HTML W3C Validator

![Screenshot of W3C HTML validator showing no errors](docs/html-validator.png)
- No errors or warnings shown.

### CSS W3C Validator

![Screenshot of W3C CSS validator showing no errors](docs/css-validator.png)
- No errors found.

### JSHint

- No warnings shown.

![Screenshot of JSHint result showing no warnings](docs/js-hint.png)

### Lighthouse

- Lighthouse in devtools indicated a high accessibility score.
- Performance scores varied minimally when analysing  the `mobile` or `desktop` versions.

#### Mobile

![Screenshot of Lighthouse score results for mobile](docs/lighthouse-mobile.png)

#### Desktop

![Screenshot of Lighthouse score results for desktop](docs/lighthouse-desktop.png)


# Deployment

The website's codebase and all associated files were hosted on GitHub, with the main repository serving as the central hub for collaboration. Each team member forked the repository to work on their assigned tasks independently. These forks were regularly synchronized to ensure the main repository remained up to date. The final live deployment was hosted on Heroku, which was continuously updated to reflect changes pushed to the GitHub repository.

    > ~~live link~
## Deployment on Heroku

### 1. Create a New App on Heroku
1. Navigate to [Heroku](https://www.heroku.com/) and log in to your account.
2. Click on the `New` button and select `Create New App`.
3. Provide a unique name for your application and choose your preferred region.
4. Click on the `Create app` button.

### 2. Configure App Settings
1. After creating the app, go to the `Settings` tab.
2. Under `Config Vars`, click the `Reveal Config Vars` button.
3. Add a new variable:
   - KEY: `PORT`
   - VALUE: `8000`
4. Click the `Add` button to save the configuration.

### 3. Set Up Buildpacks
1. In the `Settings` tab, scroll down to the `Buildpacks` section.
2. Click on `Add buildpack` and select _**ADD-USED-BUILDPACKS**_.
3. Add another buildpack and select _**ADD-USED-BUILDPACKS**_.
4. Ensure that the buildpacks are in this particular order: ... first, followed by ... .
5. Click the `Save changes` button.

### 4. Deploy Your Application
1. Navigate to the `Deploy` tab.
2. Under `Deployment method`, select _**GitHub**_.
3. Connect your GitHub account if it's not already connected.
4. Search for your repository and select it.
5. Click `Connect` to link the repository to Heroku.

### 5. Choose Deployment Method
- **Automatic Deploys**:
  - Enable automatic deploys to allow Heroku to rebuild and deploy your app every time you push changes to the selected branch.
  - Choose the branch you want to deploy and click `Enable Automatic Deploys`.
  
- **Manual Deploys**:
  - To deploy manually, scroll down to the `Manual Deploy` section.
  - Select the branch you want to deploy and click `Deploy Branch`.

### 6. Launch Your Application
- Once the deployment is complete, click on the `Open App` button at the top of the page to view your live application.

# Credits

# Acknowledgements
