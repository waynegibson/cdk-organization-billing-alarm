import { countResources, expect as expectCDK, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { MasterAccountAlarm, MasterAccountAlarmProps } from '../src';

test('ensure resources exist to create a single master alarm associated with a aws service attached a new sns topic', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

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

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 1));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 1));

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::CloudWatch::Alarm', {
      AlarmDescription: 'Consolidated billing alarm for all service charges',
      AlarmName: 'Consolidated: (All Services)',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD',
        },
        {
          Name: 'ServiceName',
          Value: 'AmazonDynamoDB',
        },
      ],
      EvaluationPeriods: 1,
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 21600,
      Statistic: 'Maximum',
      Threshold: 140,
    }),
  );
});

test('ensure resources exist to create a single master alarm associated without a aws service attached a new sns topic', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: MasterAccountAlarmProps = {
    topicConfiguration: {
      topicDescription: 'Organizational billing alarm topic',
      emailAddress: ['admin@example.org'],
    },
    alarmConfiguration: {
      alarmDescription: 'Consolidated billing alarm for all service charges',
      thresholdAmount: 140,
    },
  };

  new MasterAccountAlarm(stack, 'MasterAccountAlarm', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 1));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 1));

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::CloudWatch::Alarm', {
      AlarmDescription: 'Consolidated billing alarm for all service charges',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD',
        },
      ],
      EvaluationPeriods: 1,
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 21600,
      Statistic: 'Maximum',
      Threshold: 140,
    }),
  );
});