import * as cdk from '@aws-cdk/core';
import { LinkedAccountAlarm, LinkedAccountAlarmProps } from './index';

const app = new cdk.App();

const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

const stack = new cdk.Stack(app, 'TestStack', { env });

const config: LinkedAccountAlarmProps = {
  topicConfiguration: {
    parameterName: '/test/billing/topicArn',
    parameterVersion: 1,
  },
  accounts: [
    {
      account: '759153464520',
      alarmName: 'Consolidated (759153464520): All AWS Services',
      alarmDescription: 'Consolidated billing alarm for all AWS service charge estimates (Account: 759153464520)',
      thresholdAmount: 150,
    },
    {
      account: '759153464520',
      alarmDescription: 'Billing Alarm for AWS DynamoDB charge estimates only (Account: 759153464520)',
      thresholdAmount: 50,
      awsService: 'AmazonS3',
    },
    {
      account: '759153464520',
      alarmName: 'Consolidated (759153464520): All AWS Services',
      alarmDescription: 'Consolidated billing alarm: All AWS service charge estimates (Account: 759153464520)',
      thresholdAmount: 50,
    },
  ],
};

new LinkedAccountAlarm(stack, 'AccountAlarmTest', config);