import * as cdk from '@aws-cdk/core';
import { MasterAccountAlarm, MasterAccountAlarmProps, EmailSubscription, EmailSubscriptionProps, LinkedAccountAlarm, LinkedAccountAlarmProps } from './index';

/** integration snapshot test to create a master account billing alarm with a new sns topic */
export class MasterAccountAlarmTest {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'TestStack', { env });

    const config: MasterAccountAlarmProps = {
      topicConfiguration: {
        topicDescription: 'Organizational billing alarm topic',
        emailAddress: ['admin@example.org'],
      },
      alarmConfiguration: {
        alarmName: 'Consolidated: (All Services)',
        alarmDescription: 'Consolidated billing alarm for all service charges',
        thresholdAmount: 140,
        awsService: 'AmazonDynamoDB',
      },
    };

    new MasterAccountAlarm(stack, 'MasterAccountAlarm', config);

    this.stack = [stack];
  }
}

/** integration snapshot test to create a master account billing alarm with multiple email addresses, associated with a aws service */
export class MasterAccountAlarmAssociatedWithMultipleEmailAddressToAwsServiceTest {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'TestStack', { env });

    const config: MasterAccountAlarmProps = {
      topicConfiguration: {
        topicDescription: 'Organizational billing alarm topic',
        emailAddress: ['admin@example.org', 'billing@example.org'],
      },
      alarmConfiguration: {
        alarmName: 'Consolidated: (Amazon DynamoDB)',
        alarmDescription: 'Consolidated billing alarm for Amazon DynamoDB charges',
        thresholdAmount: 140,
        awsService: 'AmazonDynamoDB',
      },
    };

    new MasterAccountAlarm(stack, 'MasterAccountAlarm', config);

    this.stack = [stack];
  }
}

/** integration snapshot test to subscribe multiple email addresses to existing topic */
export class SubscribeMultipleEmailAddressToExistingTopic {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'TestStack', { env });

    const config: EmailSubscriptionProps = {
      topicConfiguration: {
        parameterName: '/test/billing/topicArn', // aws systems manager
        parameterVersion: 1,
        emailAddress: [
          'john@example.org',
          'admin@example.org',
          'billing@example.org',
        ],
      },
    };

    new EmailSubscription(stack, 'EmailSubscription', config);

    this.stack = [stack];
  }
}

/** integration snapshot test to link multiple linked account billing alarms to an existing topic */
export class MultipleLinkedAccountsAssociatedToExistingTopicTest {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'TestStack', { env });

    const config: LinkedAccountAlarmProps = {
      topicConfiguration: {
        secretName: 'test/billing/topicArn', // aws secrets manager
      },
      accounts: [
        {
          account: '444455556666',
          alarmName: 'Consolidated (444455556666): AWS Services',
          alarmDescription: 'Consolidated billing alarm for all AWS service charge estimates',
          thresholdAmount: 50,
        },
        {
          account: '123456789000',
          alarmDescription: 'Billing Alarm for AWS DynamoDB charge estimates only (Account: 123456789000)',
          thresholdAmount: 120,
          awsService: 'AmazonDynamoDB',
        },
        {
          account: '123456789000',
          alarmName: 'Consolidated (123456789000): AWS Services',
          alarmDescription: 'Consolidated billing alarm: All AWS service charge estimates (Account: 123456789000)',
          thresholdAmount: 50,
        },
      ],
    };

    new LinkedAccountAlarm(stack, 'LinkedAccountAlarm', config);

    this.stack = [stack];
  }
}
