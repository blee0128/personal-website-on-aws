# Personal Website on AWS

## Step 1: Design Your Website

Design your own personal website using HTML, CSS and JavaScript.

## Step 2: Set Up Amazon S3 Bucket

Process:
- Go to the AWS Management Console and open the Amazon S3 console.
- Click "Create bucket" and enter a unique name for your bucket, in my case is "benjaminlee28.com".
- In the "Properties" section, enable "Static website hosting" and provide the index.html file in the "Index document" section.
- In Objects, upload all your website files to the bucket.
- Set the bucket permissions to allow public access by unchecking  all "Block public access" and update the Bucket Policy provided in "S3 Bucket Policy.txt". Remember to update the resource section for "Bucket-Name" with your your name for the bucket

```text
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::benjaminlee28.com/*"
            ]
        }
    ]
} 
```


## Step 3: Routing static website to domain name using Route 53
Problem:
- Currently, the website name is "https://benjaminlee28.com.s3.us-east-2.amazonaws.com/index.html", but I want my personal website to be www.benjaminlee28.com

Goal:
- Route www.benjaminlee28.com and benjaminlee28.com to the s3 bucket created in step 2

Prerequisites:
- a domain name

Process:
Part 1: Redirect "www.benjaminlee28.com" to "benjaminlee28.com
- Create a new bucket with the name "www.benjaminlee28.com" and it will have the same process as Step 2, but a slightly modified change in the static website hosting section
- For static website hosting:
  - Instead of selecting "Host a static website" in the Hosting type section, you will need to select "Redirect requests for an object"
  - The Host name will be the bucket name created in Step 2, in my case is "benjaminlee28.com"
  - For Protocol, select http for now

Part 2: Redirect benjaminlee28.com and www.benjaminlee28.com to s3 bucket using Route 53
- Go to the AWS Management Console and open the Route 53 console
- If the domain is registered in AWS, there should be a hosted zone for it. If the domain is somewhere else, click on Hosted zone and create a hosted zone through selecting "Create hosted zone". The name for the hosted zone should be the same as the name for your s3 bucket. Look at the note section for more information on linking the domain name to s3 bucket
- In the hosted zone, there should be two record name of type NS and type SOA. Create two record for www.benjaminlee28.com and benjaminlee28.com
  - Click the "Create record"
  - Select "Simple routing"
  - Select "Define simple record"
  - For Record name, you will have it empty for benjaminlee28.com and you will place "www" for www.benjaminlee28.com
  - For Record type, Select "A - Routes traffic to an IPv4 address and some AWS resources"
  - For Value/Route traffic:
    - For endpoint, select "Alias to S3 website endpoint"
    - For Region, select the region used to create the S3 bucket in Step 2
    - For S3 bucket, choose the S3 bucket that was created 
    - Select "Create Record"

Note:
- For linking your domain name to amazon s3 bucket, you can learn more in the [Website Hosting: linking your domain name to amazon s3 bucket](https://ishwar-rimal.medium.com/website-hosting-linking-your-domain-name-to-amazon-s3-bucket-249120c75eaa)
- 
## Step 4: Deploy Static Website to AWS S3 with HTTPS using CloudFront
Problem:
- Many internet service provider block not secure website, therefore some user will not be able to access my personal website

Goal:
-  Deploy a website, ensuring it's secure using AWS CloudFront

Process:
Part 1: Create certificate with AWS Certificate Manager
- Go to the AWS Management Console and open the Amazon CodePipeline console
- Click "Request certificate" and select "Request a public certificate" for the Certificate type
- Enter the domain names, which is www.benjaminlee28.com and benjaminlee28.com
- Select "DNS validation - recommended" for the Validation method
- Click "Request"
- For DNS validation, using the certificate, click "Create records in Route 53" to validate DNS. There should be 2 additional records of Type A in the Hosted zone in Route 53

Part 2: Create Distribution with CloudFront
- Go to the AWS Management Console and open the CloudFront console
- Click "Create Distribution"
- For Origin domain, DO NOT USE the S3 buckets provided in the dropdown because that is the wrong autocomplete website endpoint. Instead, go to S3 bucket with bucket name www.benjaminlee28.com Static website hosting section itself and retrieve the website endpoint of the bucket
- For Viewer protocol policy in the Default cache behavior section, select "Redirect HTTP to HTTPS"
- For Alternate domain name (CNAME) in the Settings section, click Add item and include www.benjaminlee28.com
- For Custom SSL certificate in the Settings section, choose the certificate created in Part 1
- Create another distribution with the same process for the benjaminlee28.com s3 bucket
- We will need to go back to the "www.benjaminlee28.com" S3 bucket, and edit the static website hosting, where "https" will be selected in the Protocol section

Part 3: Change DNS setting in Route 53 to point to the distribution created with Cloudfront
- Go to the AWS Management Console and open the Route 53 console
- In both the record benjaminlee28.com and www.benjaminlee28.com of type A created from the AWS Certificate Manger, edit the record with the following steps:
  - For "Route traffic to", select "Alias to CloudFront distribution"
  - The provided distribution should appear in the dropdown
  - Click "Save"

## Step 5: Set up CI/CD on Amazon CodePipeline 
Problem:
- Every time when we make any changes to our source code, we need to manually upload the updated files onto the S3 bucket for our updated website. Also, we will need to create Invalidation in the CloudFront Distributions to cache the new updates in S3

Goal:
- The goal for this CI/CD project is to allow changes made in the Github reflect on our personal website hosting through AWS almost instantly

Prerequisites:
- HTML, CSS and JavaScript files for website is uploaded on a Github repository (Another way is to have the files stored on CodeCommit)

Process:
Part 1: Build a pipeline
- Go to the AWS Management Console and open the Amazon CodePipeline console
- Click "Create pipeline" 
- Step 1: Choose pipeline settings
  - Enter a pipeline name
- Step 2: Add source stage
  - For Source provider, select "GitHub (Version 2)
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
    - For Buildspec specifications, select "Use a buildspec file"
- Step 4: Add deploy stage
  - For Deploy provide, select "Amazon S3"
  - For Input artifacts, select "BuildArtifact"
  - For Bucket, select the bucket create in **Step 2: Set Up Amazon S3 Bucket**
- Step 5: Review
  - Click "Create pipeline"

Part 2: Creating a CloudFront Invalidation in CodePipeline using Lambda Actions
- For more details on creating a CloudFront Invalidation in CodePipeline using Lambda Actions, you can look through the step-by-step guide for [Create Invalidation]
(https://medium.com/fullstackai/aws-creating-a-cloudfront-invalidation-in-codepipeline-using-lambda-actions-49c1fd3a3c31)

Notes:
- For first time user, you will encounter an error in the Build section, because there isn't a YAML file for the buildspec yet.  

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


