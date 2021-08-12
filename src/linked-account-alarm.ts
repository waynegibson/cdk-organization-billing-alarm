import { Construct } from '@aws-cdk/core';
import { BillingAlarm, BillingAlarmProps } from '@spacecomx/cdk-billing-alarm';
import { getTopicArnToken, removeAccountDuplicates, makeHash } from './helpers';
import { IAlarmDefination, AlarmParams, ITopicArnDefination, TopicArnParams } from './shared';

declare type AccountParams = {
  account: string;
} & AlarmParams;

export interface IAccountDefination extends IAlarmDefination {
  /**
   * Account id which this metric comes from.
   */
  readonly account: string;
}

export interface LinkedAccountAlarmProps {
  /** Topic configuration options to configure the SNS topic and email address's that will be used to subscribe to the topic. */
  readonly topicConfiguration: ITopicArnDefination;
  /** Account configuration options to configure the billing alarm e.g. (name, description etc.). */
  readonly accounts: IAccountDefination[];
}

/**
 * A construct to create multiple linked account billing alarms associated with an existing SNS topic Arn within a master/payer AWS account e.g (AWS Organization).
 *
 * @example
 *
 * new LinkedAccountAlarm(stack, 'LinkedAccountAlarm', {
 *  topicConfiguration {
 *    secretName: 'test/billing/topicArn',
 *  },
 *  accounts: [
 *    { account: '444455556666', alarmName: 'Consolidated: (All AWS Services)', alarmDescription: 'Consolidated billing for all AWS service charge estimates (Account: 444455556666)', thresholdAmount: 50 },
 *    { account: '123456789000', alarmDescription: 'Billing Alarm for AWS DynamoDB charge estimates (Account: 123456789000)', thresholdAmount: 120, awsService: 'AmazonDynamoDB' },
 *  ],
 * }
 */
export class LinkedAccountAlarm extends Construct {
  constructor(scope: Construct, id: string, props: LinkedAccountAlarmProps) {
    super(scope, id);

    const topicArnParams: TopicArnParams = props.topicConfiguration;
    const existingTopicArn: string = getTopicArnToken(this, topicArnParams);

    if (!existingTopicArn) {
      throw new Error('Invalid ssm parameter or secret name: Either must exist in the same account & region as the master/payer AWS account.');
    }

    const accounts = removeAccountDuplicates(props.accounts);

    accounts.forEach((account: any, index: number): void => {
      this.createBillingAlarm(existingTopicArn, account, index);
    });
  }

  /**
   * Create new billing alarm.
   *
   * @param topicArn string
   * @param param AlarmParams
   * @return void
   */
  private createBillingAlarm(
    topicArn: string,
    { account, alarmName, alarmDescription, thresholdAmount, awsService }: AccountParams, index: number): void {

    const identifier = (`${account}${index}`).toString();

    const hash = makeHash(identifier);

    const metricDimension = (typeof awsService !== 'undefined' && awsService) ?
      {
        metricDimensions: {
          account: account,
          service: awsService,
        },
      } : {
        metricDimensions: {
          account: account,
        },
      };

    const config: BillingAlarmProps = {
      topicConfiguration: {
        existingTopicArn: topicArn,
        emailAddress: [],
      },
      alarmConfiguration: {
        alarmName: alarmName,
        alarmDescription: alarmDescription,
        thresholdAmount: thresholdAmount,
      },
      ...metricDimension,
    };

    new BillingAlarm(this, `${hash}`, config);
  }
}
