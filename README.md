# Personal Website on AWS

# Project

## Step 1: Design Your Website

Design your own personal website using HTML, CSS and JavaScript.

## Step 2: Set Up Amazon S3 Bucket

- Go to the AWS Management Console and open the Amazon S3 console.
- Click "Create bucket" and enter a unique name for your bucket, in my case is "aws-portfolio-website".
- In the "Properties" section, enable "Static website hosting" and provide the index.html file in the "Index document" section.
- In Objects, upload all your website files to the bucket.
- Set the bucket permissions to allow public access by unchecking  all "Block public access" and update the Bucket Policy provided in "S3 Bucket Policy.txt". Remember to update the resource section for "Bucket-Name" with your your name for the bucket, in my case is "Resource": "arn:aws:s3:::aws-portfolio-website/*"

