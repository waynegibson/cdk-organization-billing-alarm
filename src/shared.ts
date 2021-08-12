export declare type AlarmParams = {
  alarmName?: string;
  alarmDescription: string;
  thresholdAmount: number;
  awsService?: string;
};

export interface IAlarmDefination {
  /**
   * Name of the alarm.
   *
   * If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the alarm name (recommended).
   *
   * @default Generated name
   */
  readonly alarmName?: string;
  /**
   * Description for the alarm. A developer-defined string that can be used to identify this alarm.
   */
  readonly alarmDescription: string;
  /**
   * Enter the threshold amount in USD that must be exceeded to trigger the alarm e.g. (limit: 150).
   */
  readonly thresholdAmount: number;
  /**
   * The AWS Service to associate the alarm with e.g (AmazonDynamoDB)
   *
   * @default - Not configured.
   */
  readonly awsService?: string;
}

export declare type TopicArnParams = {
  parameterName?: string;
  parameterVersion?: number;
  secretName?: string;
};

export interface ITopicArnDefination {
  /**
   * The name of the SSM parameter e.g '/prod/billing/topicArn'
   *
   * Returns a token that will resolve (during deployment) to the string value of an SSM string parameter.
   *
   * @default - Not configured.
   */
  readonly parameterName?: string;
  /**
   * The SSM parameter version (recommended in order to ensure that the value won't change during deployment).
   *
   * @default - Not configured.
   */
  readonly parameterVersion?: number;
  /**
   * Imports a secret by secret name e.g 'prod/billing/topicArn'
   *
   * A secret with this name must exist in the same account & region as the master/payer AWS account.
   *
   * @default - Not configured.
   */
  readonly secretName?: string;
};

export interface ITopicArnParameter {
  /**
   * The name of the SSM parameter e.g '/prod/billing/topicArn'
   *
   * Returns a token that will resolve (during deployment) to the string value of an SSM string parameter.
   *
   * @default - Not configured.
   */
  readonly parameterName: string;
  /**
   * The SSM parameter version (recommended in order to ensure that the value won't change during deployment).
   *
   * @default - Not configured.
   */
  readonly parameterVersion?: number;
};

export interface ITopicArnSecret {
  /**
   * Imports a secret by secret name e.g 'prod/billing/topicArn'
   *
   * A secret with this name must exist in the same account & region as the master/payer AWS account.
   *
   * @default - Not configured.
   */
  readonly secretName: string;
};