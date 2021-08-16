import { PolicyStatement, Effect } from '@aws-cdk/aws-iam';
import { Construct } from '@aws-cdk/core';
import { AwsCustomResource, AwsCustomResourcePolicy, AwsSdkCall } from '@aws-cdk/custom-resources';

// https://medium.com/swlh/aws-cdk-pipelines-real-world-tips-and-tricks-part-1-544601c3e90b
export interface SSMParameterReaderProps {
  readonly parameterName: string;
  readonly region?: string;
}

export class SSMParameterReader extends AwsCustomResource {
  constructor(scope: Construct, name: string, props: SSMParameterReaderProps) {
    const { parameterName, region } = props;

    const ssmAwsSdkCall: AwsSdkCall = {
      service: 'SSM',
      action: 'getParameter',
      parameters: {
        Name: parameterName,
      },
      region,
      physicalResourceId: { id: Date.now().toString() }, // Update physical id to always fetch the latest version
    };

    super(scope, name, {
      onUpdate: ssmAwsSdkCall,
      policy: AwsCustomResourcePolicy.fromStatements([
        new PolicyStatement({
          resources: ['*'],
          actions: ['ssm:GetParameter'],
          effect: Effect.ALLOW,
        }),
      ]),
    });
  }

  public getParameterValue(): string {
    return this.getResponseField('Parameter.Value');
  }
}