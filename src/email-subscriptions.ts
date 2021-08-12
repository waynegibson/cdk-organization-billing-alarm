import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription as Subscription } from '@aws-cdk/aws-sns-subscriptions';
import { Construct } from '@aws-cdk/core';
import { getTopicArnToken, removeArrayDuplicates } from './helpers';
import { ITopicArnDefination, TopicArnParams } from './shared';

export interface ITopicEmailSubscription extends ITopicArnDefination {
  /**
   * The email address's that will be used to subcribe to the existing SNS topic for billing alert notifications e.g. ['hello@example.org'] or [''hello@example.org', 'admin@example.org'].
   *
   * @default - Not configured
   */
  readonly emailAddress: string[];
}

export interface EmailSubscriptionProps {
  /** Topic configuration options to configure the email address's that will be used to subscribe to the existing topic. */
  readonly topicConfiguration: ITopicEmailSubscription;
}

export class EmailSubscription extends Construct {
  constructor(scope: Construct, id: string, props: EmailSubscriptionProps) {
    super(scope, id);

    const topicArnParams: TopicArnParams = props.topicConfiguration;
    const existingTopicArn: string = getTopicArnToken(this, topicArnParams);

    if (!existingTopicArn) {
      throw new Error('Invalid ssm parameter or secret name: Either must exist in the same account & region as the master/payer AWS account.');
    }

    this.subscribeEmailToTopic(existingTopicArn, props.topicConfiguration.emailAddress);
  }

  /**
   * Subscribe emails to existing sns topic by arn.
   *
   * @param existingTopicArn string
   * @param emails string[]
   * @return void
   */
  private subscribeEmailToTopic(existingTopicArn: string, emails: string[]): void {
    const topic = Topic.fromTopicArn(this, 'Topic', existingTopicArn);
    const filteredEmails = removeArrayDuplicates(emails);

    filteredEmails.forEach((email: string): void => {
      topic.addSubscription(new Subscription(email, { json: false }));
    });
  }
}