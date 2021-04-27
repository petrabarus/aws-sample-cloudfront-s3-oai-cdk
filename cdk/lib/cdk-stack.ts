import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const bucket = new s3.Bucket(this, 'Bucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
    });
    
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [
        s3deploy.Source.asset('../dist')
      ],
      destinationBucket: bucket,
    });
    
    const oai = new cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentity');

    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
      originConfigs: [{
        behaviors: [{
          isDefaultBehavior: true
        }],
        s3OriginSource: {
          s3BucketSource: bucket,
          originAccessIdentity: oai,
        },
      }]
    });
    
    new cdk.CfnOutput(this, 'BucketName', { value: bucket.bucketName });
    new cdk.CfnOutput(this, 'DistributionURL', { value: distribution.distributionDomainName });
  }
}
