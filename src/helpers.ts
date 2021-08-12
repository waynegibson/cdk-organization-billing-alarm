import * as crypto from 'crypto';
import { ISecret, Secret } from '@aws-cdk/aws-secretsmanager';
import { StringParameter } from '@aws-cdk/aws-ssm';
import { Construct } from '@aws-cdk/core';
import { TopicArnParams } from './shared';

/**
 * Make a hash.
 *
 * @returns string
 */
export const makeHash = (arg: string): string => {
  return crypto.createHash('md5')
    .update(arg)
    .digest('hex')
    .substr(0, 6);
};

/**
 * Get topic arn from AWS SecretsManager name.
 *
 * Returns a token that will resolve (during deployment).
 *
 * @param app Construct
 * @param name The secret name.
 * @returns string
 */
export const getTopicArnFromFromSecretsManagerName = (app: Construct, name: string): string => {
  const { secretValue }: ISecret = Secret.fromSecretNameV2(app, 'SecretFromName', name);

  return secretValue.toString();
};

/**
 * Get topic arn from AWS Systems Manager parameter.
 *
 * Returns a token that will resolve (during deployment).
 *
 * @param app Construct
 * @param name The name of the parameter.
 * @param version The parameter version.
 * @returns string
 */
export const getTopicArnFromSystemsManagerParameter = (app: Construct, name: string, version?: number): string => {
  const value = StringParameter.valueForStringParameter(app, name, version);

  return value;
};

/**
 * Get sns topic arn token.
 *
 * Returns a token that will resolve (during deployment).
 *
 * @param app Construct
 * @param param TopicArnParams
 * @returns string
 */
export const getTopicArnToken = (app: Construct, { parameterName, parameterVersion, secretName }: TopicArnParams): string => {
  const topicArn: string =
  (parameterName)
    ? getTopicArnFromSystemsManagerParameter(app, parameterName, parameterVersion)
    : (secretName)
      ? getTopicArnFromFromSecretsManagerName(app, secretName)
      : '';

  return topicArn;
};

/**
 * Remove array duplicates.
 *
 * @param arr
 * @returns array
 */
export const removeArrayDuplicates = (arr: string[]): string[] => {
  const filtered = [...new Set(arr)];

  return filtered;
};

export declare type ObjectArray = {
  [index in string | number ]: any;
};

/**
 * Remove account duplicates.
 *
 * @param data ObjectArray
 * @returns ObjectArray
 */
export const removeAccountDuplicates = (data: ObjectArray): ObjectArray => {
  return data.reduce((accumulator: any[], current: ObjectArray) => {

    return (checkForDuplicateAccount(accumulator, current)) ? accumulator : [...accumulator, current];
  }, []);
};

/**
 * Check for duplicate account.
 *
 * @param accumulator ObjectArray[]
 * @param currentVal ObjectArray
 * @returns boolean
 */
const checkForDuplicateAccount = (accumulator: any[], currentVal: ObjectArray): boolean => {
  return accumulator.some((item) => {
    return (
      (item.account === currentVal.account) &&
      (item.thresholdAmount === currentVal.thresholdAmount) &&
      (item.awsService === currentVal.awsService)
    );
  });
};