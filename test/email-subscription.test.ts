import { countResources, expect as expectCDK, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { EmailSubscription, EmailSubscriptionProps } from '../src';

test('ensure resources exist to create a single email subscription associated with an existing sns topic', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: EmailSubscriptionProps = {
    topicConfiguration: {
      parameterName: '/test/billing/topicArn', // aws systems manager
      parameterVersion: 1,
      emailAddress: ['john@example.org'],
    },
  };

  new EmailSubscription(stack, 'EmailSubscription', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 0));

  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Subscription', {
      Endpoint: 'john@example.org',
      Protocol: 'email',
      TopicArn: '{{resolve:ssm:/test/billing/topicArn:1}}',
    }),
  );
});


test('ensure resources exist to create multiple email subscriptions associated with an existing sns topic', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

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

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 0));

  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 3));
  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Subscription', {
      Endpoint: 'admin@example.org',
      Protocol: 'email',
      TopicArn: '{{resolve:ssm:/test/billing/topicArn:1}}',
    }),
  );
  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Subscription', {
      Endpoint: 'john@example.org',
      Protocol: 'email',
      TopicArn: '{{resolve:ssm:/test/billing/topicArn:1}}',
    }),
  );
  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Subscription', {
      Endpoint: 'billing@example.org',
      Protocol: 'email',
      TopicArn: '{{resolve:ssm:/test/billing/topicArn:1}}',
    }),
  );
});

test('ensure resources exist without the duplicate email addresses', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: EmailSubscriptionProps = {
    topicConfiguration: {
      parameterName: '/test/billing/topicArn', // aws systems manager
      parameterVersion: 1,
      emailAddress: [
        'john@example.org',
        'john@example.org',
        'billing@example.org',
      ],
    },
  };

  new EmailSubscription(stack, 'EmailSubscription', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 0));

  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 2));
  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Subscription', {
      Endpoint: 'john@example.org',
      Protocol: 'email',
      TopicArn: '{{resolve:ssm:/test/billing/topicArn:1}}',
    }),
  );

  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Subscription', {
      Endpoint: 'billing@example.org',
      Protocol: 'email',
      TopicArn: '{{resolve:ssm:/test/billing/topicArn:1}}',
    }),
  );
});

test('ensure resources existing when creating an email subscription to an existing topic using a ssm parameter', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: EmailSubscriptionProps = {
    topicConfiguration: {
      parameterName: '/ssm/billing/topicArn', // aws systems manager
      emailAddress: ['john@example.org'],
    },
  };

  new EmailSubscription(stack, 'EmailSubscription', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 0));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 1));
});

test('ensure an error is thrown when a ssm parameter used to retrieve the existing topic arn is not found or not provided', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: EmailSubscriptionProps = {
    topicConfiguration: {
      parameterName: '', // aws systems manager
      parameterVersion: 1,
      emailAddress: ['john@example.org'],
    },
  };

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 0));
  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 0));

  expect(() => {
    new EmailSubscription(stack, 'EmailSubscription', config);
  }).toThrowError('Invalid ssm parameter or secret name: Either must exist in the same account & region as the master/payer AWS account.');
});

test('ensure resources existing when creating an email subscription to an existing topic using a secret name', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: EmailSubscriptionProps = {
    topicConfiguration: {
      secretName: 'secret/billing/topicArn', // aws secrets manager
      emailAddress: ['john@example.org'],
    },
  };

  new EmailSubscription(stack, 'EmailSubscription', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 0));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 1));
});

test('ensure an error is thrown when a secret name used to retrieve the existing topic arn is not found or not provided', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: EmailSubscriptionProps = {
    topicConfiguration: {
      secretName: '', // aws systems manager
      emailAddress: ['john@example.org'],
    },
  };

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 0));
  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 0));

  expect(() => {
    new EmailSubscription(stack, 'EmailSubscription', config);
  }).toThrowError('Invalid ssm parameter or secret name: Either must exist in the same account & region as the master/payer AWS account.');
});

