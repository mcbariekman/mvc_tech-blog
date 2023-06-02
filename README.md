# CMS-Style Blog Site

This is a CMS-style blog site that allows users to create an account, log in, and interact with blog posts by creating comments, adding, updating, and deleting posts.

## Features

- User-friendly interface with easy navigation.
- Account creation and authentication system.
- Homepage with existing blog posts (if any), navigation links, and login option.
- Separate dashboard for logged-in users to manage their posts.
- Ability to create, edit, and delete blog posts.
- Detailed view of each blog post, including the post title, content, creator's username, and creation date.
- Commenting system for users to leave comments on blog posts.
- Idle session timeout feature for enhanced security.

## Usage

1. Visit the site for the first time.
2. On the homepage, existing blog posts (if any) will be displayed along with navigation links to the homepage and the dashboard. You will also find an option to log in.
3. Click on the homepage option in the navigation to go back to the homepage.
4. When clicking on any other links in the navigation, you will be prompted to sign up or sign in.
5. Choose to sign up and provide a unique username and password.
6. Click on the sign-up button to save your user credentials and log into the site.
7. On subsequent visits, choose to sign in and enter your username and password when prompted.
8. After signing in, you will see navigation links for the homepage, the dashboard, and an option to log out.
9. Clicking on the homepage option will take you to the homepage, where you can view existing blog posts with their titles and creation dates.
10. Click on an existing blog post to view its full details, including the post title, content, creator's username, and creation date. You can also leave a comment on the post.
11. While signed in, enter a comment and click on the submit button to save the comment. The post will be updated to display the comment, your username, and the comment's creation date.
12. Click on the dashboard option in the navigation to access your dashboard. Here, you will find any blog posts you have already created, along with the option to add a new blog post.
13. To create a new blog post, click on the button to add a new post in the dashboard. You will be prompted to enter a title and contents for your post.
14. Click on the button to create the new blog post. The title and contents of your post will be saved, and you will be redirected to an updated dashboard showing your new post.
15. In the dashboard, you can click on one of your existing posts to delete or update it. After performing the desired action, you will be taken back to the updated dashboard.
16. To log out, click on the logout option in the navigation.
17. If you remain idle on the site for a set time, you will still be able to view comments, but you will be prompted to log in again before you can add, update, or delete comments.

## Installation

1. Clone the repository.
2. Install the required dependencies by running `pip install -r requirements.txt`.
3. Set the `SECRET_KEY` environment variable to a secure secret key.
4. Run the application using `python app.py`.
5. Access the site via the provided URL.

## Technologies Used

- Python
- Flask
- HTML
- CSS
- JavaScript

## Screenshots

![Homepage](/path/to/homepage.png)
![Dashboard](/path/to/dashboard.png)
![Blog Post](/path/to/blogpost.png)

## Live Demo

A live demo of the CMS-style blog site can be found at [example.com](https://
