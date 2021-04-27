# AWS Samples - CDK Sample of Restricting S3 Access from CloudFront with Origin Access Identity

This CDK code demonstrates how to restrict S3 Access from CloudFront with Origin Access Identity.
In the past we need to set the S3 bucket to public read access to host a static website.
However, with the Origin Access Identity, we can restrict access to the S3 Bucket only fron CloudFront.

## Requirements

- AWS Account
- AWS CDK CLI

## Running

To install the requirements, in the `cdk` directory run

```
npm install
```

To deploy, in the `cdk` directory, run

```
cdk deploy
```

## References

- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
- https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-access-to-amazon-s3/
