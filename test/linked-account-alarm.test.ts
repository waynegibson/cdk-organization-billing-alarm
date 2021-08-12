import { countResources, expect as expectCDK, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { LinkedAccountAlarm, LinkedAccountAlarmProps } from '../src';

test('ensure resources exist to create a linked account, with its own alarm using an existing sns topic', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: LinkedAccountAlarmProps = {
    topicConfiguration: {
      parameterName: '/test/billing/topicArn', // aws systems manager
      parameterVersion: 1,
    },
    accounts: [
      {
        account: '444455556666',
        alarmName: 'Consolidated: (All AWS Services)',
        alarmDescription: 'Consolidated billing alarm for all AWS service charge estimates (Account: 444455556666)',
        thresholdAmount: 50,
      },
    ],
  };

  new LinkedAccountAlarm(stack, 'LinkedAccountAlarm', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 0));

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::CloudWatch::Alarm', {
      AlarmDescription: 'Consolidated billing alarm for all AWS service charge estimates (Account: 444455556666)',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 21600,
      Statistic: 'Maximum',
      Threshold: 50,
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD',
        },
        {
          Name: 'LinkedAccount',
          Value: '444455556666',
        },
      ],
    }),
  );
});

test('ensure an error is thrown when a ssm parameter used to retrieve the existing topic arn is not found or not provided', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: LinkedAccountAlarmProps = {
    topicConfiguration: {
      parameterName: '', // aws systems manager
      parameterVersion: 1,
    },
    accounts: [
      {
        account: '444455556666',
        alarmName: 'Consolidated: (All AWS Services)',
        alarmDescription: 'Consolidated billing alarm for all AWS service charge estimates (Account: 444455556666)',
        thresholdAmount: 50,
      },
    ],
  };

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 0));
  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 0));

  expect(() => {
    new LinkedAccountAlarm(stack, 'LinkedAccountAlarm', config);
  }).toThrowError('Invalid ssm parameter or secret name: Either must exist in the same account & region as the master/payer AWS account.');
});

test('ensure resources exist to create multiple linked accounts, each with its own alarm using an existing sns topic', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: LinkedAccountAlarmProps = {
    topicConfiguration: {
      secretName: 'secret/billing/topicArn', // aws secrets manager
    },
    accounts: [
      {
        account: '444455556666',
        alarmName: 'Consolidated: (All AWS Services)',
        alarmDescription: 'Consolidated billing alarm for all AWS service charge estimates (Account: 444455556666)',
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
        alarmDescription: 'Consolidated billing alarm: All AWS service charge estimates (Account: 123456789000)',
        thresholdAmount: 120,
      },
    ],
  };

  new LinkedAccountAlarm(stack, 'LinkedAccountAlarm', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 0));

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 3));
  expectCDK(stack).to(
    haveResourceLike('AWS::CloudWatch::Alarm', {
      AlarmDescription: 'Consolidated billing alarm for all AWS service charge estimates (Account: 444455556666)',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 21600,
      Statistic: 'Maximum',
      Threshold: 50,
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD',
        },
        {
          Name: 'LinkedAccount',
          Value: '444455556666',
        },
      ],
    }),
  );
  expectCDK(stack).to(
    haveResourceLike('AWS::CloudWatch::Alarm', {
      AlarmDescription: 'Billing Alarm for AWS DynamoDB charge estimates only (Account: 123456789000)',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 21600,
      Statistic: 'Maximum',
      Threshold: 120,
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD',
        },
        {
          Name: 'LinkedAccount',
          Value: '123456789000',
        },
        {
          Name: 'ServiceName',
          Value: 'AmazonDynamoDB',
        },
      ],
    }),
  );
  expectCDK(stack).to(
    haveResourceLike('AWS::CloudWatch::Alarm', {
      AlarmDescription: 'Consolidated billing alarm: All AWS service charge estimates (Account: 123456789000)',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 21600,
      Statistic: 'Maximum',
      Threshold: 120,
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD',
        },
        {
          Name: 'LinkedAccount',
          Value: '123456789000',
        },
      ],
    }),
  );
});

test('ensure an error is thrown when a secret name used to retrieve the existing topic arn is not found or not provided', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: LinkedAccountAlarmProps = {
    topicConfiguration: {
      secretName: '', // aws secrets manager
    },
    accounts: [
      {
        account: '123456789000',
        alarmDescription: 'Billing Alarm for AWS DynamoDB charge estimates only (Account: 123456789000)',
        thresholdAmount: 120,
        awsService: 'AmazonDynamoDB',
      },
    ],
  };

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 0));
  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 0));

  expect(() => {
    new LinkedAccountAlarm(stack, 'LinkedAccountAlarm', config);
  }).toThrowError('Invalid ssm parameter or secret name: Either must exist in the same account & region as the master/payer AWS account.');
});