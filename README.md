# Personal Website on AWS

# Project

## Step 1: Design Your Website

Design your own personal website using HTML, CSS and JavaScript.

## Step 2: Set Up Amazon S3 Bucket

Process:
- Go to the AWS Management Console and open the Amazon S3 console.
- Click "Create bucket" and enter a unique name for your bucket, in my case is "aws-portfolio-website".
- In the "Properties" section, enable "Static website hosting" and provide the index.html file in the "Index document" section.
- In Objects, upload all your website files to the bucket.
- Set the bucket permissions to allow public access by unchecking  all "Block public access" and update the Bucket Policy provided in "S3 Bucket Policy.txt". Remember to update the resource section for "Bucket-Name" with your your name for the bucket, in my case is "Resource": "arn:aws:s3:::aws-portfolio-website/*"

[Personal website hosted on AWS](https://aws-portfolio-website.s3.us-east-2.amazonaws.com/index.html) 

## Step 3: Set up Code Pipeline CI/CD

Prerequisites:
- HTML, CSS and JavaScript files for website is uploaded on a github repository (Another way is to have the files stored on CodeCommit)

Process:
- Got to the AWS Management Console and open the Amazon CodePipeline
- Step 1
  - Click "Create pipeline" and enter a pipeline name
