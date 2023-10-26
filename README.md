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

Link to my personal website: [Personal website](https://aws-portfolio-website.s3.us-east-2.amazonaws.com/index.html) 

## Step 3: Set up Code Pipeline CI/CD
Problem:
Everytime when we make any changes to our sourcecode, we need to manually upload the updated files onto the S3 bucket for our updated website

Goal:
- The goal for this CI/CD project is to allow changes made in the github reflect on our personal website hosting through AWS almost instantly

Prerequisites:
- HTML, CSS and JavaScript files for website is uploaded on a github repository (Another way is to have the files stored on CodeCommit)

Process:
- Got to the AWS Management Console and open the Amazon CodePipeline
- Click "Create pipeline" 
- Step 1: Choose pipeline settings
  - Enter a pipeline name
- Step 2: Add source stage
  - For Source provider,select "GitHub (Version 2)
  - For Connection, click on "Connect to GitHub" to connect AWS to GitHub
    -  For Create GitHub App connection, give it a connection name
    -  click "Connect to GitHub"
    -  For GitHub connection settings, click on "Install a new app". This will prompt you to confirm access to Github
  - After connecting to GitHub, the repository that was granted access to AWS will show up in the Repository name. Select the personal website repository
  - For Pipeline trigger, select "Push in a branch"
  - For Branch name, select master
- Step 3: Add build stage
  - For Build provide, select "AWS CodeBuild"
  - For Project name, click "Creating project"
    - Give a project name, in my case is "personal-portfolio-codebuild"
    - For environment, the operating system I am using is "Amazon Linux", the Runtime used is "Standard" and the Image used is "aws/codebuild/amazonlinux2-x86_64-standard:4.0"
    - For Buiildspec specifications, select "Use a buildspec file"
- Step 4: Add deploy stage
  - For Deploy provide, select "Amazon S3"
  - For Input artifacts, select "BuildArtifact"
  - For Bucket, select the bucket create in **Step 2: Set Up Amazon S3 Bucket**
- Step 5: Review
  - Click "Create pipeline"

Notes:
- For first time user, you will encounter an error in the Build section, because there does not exist a YAML file for the buildspec.  

YAML file
```text
version: 0.2

phases:
  install:
    commands:
      - echo Nothing to install
  build:
    commands:
      - echo Build started on `date`
  post_build:
    commands:
      - echo Build completed on `date`
artifacts:
  files:
    - '**/*'
  base-directory: 'src'
```

- For more details on buildspec.yml file, you can learn more in the [Create the buildspec file](https://docs.aws.amazon.com/codebuild/latest/userguide/getting-started-create-build-spec-console.html)


