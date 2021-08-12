import { Construct } from '@aws-cdk/core';
import { BillingAlarm, BillingAlarmProps } from '@spacecomx/cdk-billing-alarm';
import { getTopicArnToken } from './helpers';
import { IAlarmDefination, AlarmParams, ITopicArnDefination, TopicArnParams } from './shared';

export declare type TopicParams = {
  topicDescription?: string;
  emailAddress: string[];
};

export interface ITopicDefination extends ITopicArnDefination {
  /**
   * Description for the topic. A developer-defined string that can be used to identify this topic.
   */
  readonly topicDescription?: string;
  /**
   * The email address that will be used to subcribe to the SNS topic for billing alert notifications e.g. ['hello@example.org'] or [''hello@example.org', 'admin@example.org'].
   *
   * @default - Not configured
   */
  readonly emailAddress: string[];
}

export interface MasterAccountAlarmProps {
  /** Topic configuration options to configure the SNS topic and email address's that will be used to subscribe to the topic. */
  readonly topicConfiguration: ITopicDefination;
  /** Alarm configuration options to configure the billing alarm e.g. (name, description etc.). */
  readonly alarmConfiguration: IAlarmDefination;
}

/**
 * A construct to create a master account billing alarm in master/payer AWS account e.g (AWS Organization).
 *
 * @example
 *
 * new MasterAccountAlarm(stack, 'MasterAccountAlarm', {
 *  alarmConfiguration: {
 *    topicDescription: 'Organizational billing alarm topic',
 *    emailAddress: ['hello@example.org'],
 *    alarmDescription: 'Consolidated billing alarm for all AWS Service charges',
 *    thresholdAmount: 140,
 *  },
 */
export class MasterAccountAlarm extends Construct {
  constructor(scope: Construct, id: string, props: MasterAccountAlarmProps) {
    super(scope, id);

    const topicArnParams: TopicArnParams = props.topicConfiguration;
    const topicParams: TopicParams = props.topicConfiguration;
    const alarmParams: AlarmParams = props.alarmConfiguration;

    // if no existing topic arn is provided, a new topic will be created.
    const existingTopicArn: string = getTopicArnToken(this, topicArnParams);

    this.createBillingAlarm(existingTopicArn, topicParams, alarmParams);
  }

  /**
   * Create a new billing alarm.
   *
   * @param topicArn string | undefined
   * @param param1 TopicParams
   * @param param2 AlarmParams
   * @return void
   */
  private createBillingAlarm(
    topicArn: string | undefined,
    { topicDescription, emailAddress }: TopicParams,
    { alarmName, alarmDescription, thresholdAmount, awsService }: AlarmParams): void {

    const metricDimension = (typeof awsService !== 'undefined' && awsService) ?
      {
        metricDimensions: {
          service: awsService,
        },
      } : {};

    const config: BillingAlarmProps = {
      topicConfiguration: {
        existingTopicArn: topicArn,
        displayName: topicDescription,
        emailAddress: emailAddress,
      },
      alarmConfiguration: {
        alarmName: alarmName,
        alarmDescription: alarmDescription,
        thresholdAmount: thresholdAmount,
      },
      ...metricDimension,
    };

    new BillingAlarm(this, 'AccountBillingAlarm', config);
  }
}
