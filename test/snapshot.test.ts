import '@aws-cdk/assert/jest';
import { SynthUtils } from '@aws-cdk/assert';
import {
  MasterAccountAlarmTest,
  MasterAccountAlarmAssociatedWithMultipleEmailAddressToAwsServiceTest,
  SubscribeMultipleEmailAddressToExistingTopic,
  MultipleLinkedAccountsAssociatedToExistingTopicTest,
} from '../src/integ.default';

test('integration snapshot test to create a master account billing alarm with a new sns topic', ()=> {
  const integration = new MasterAccountAlarmTest();

  integration.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});

test('integration snapshot test to create a master account billing alarm with multiple email addresses, associated with a aws service', ()=> {
  const integration = new MasterAccountAlarmAssociatedWithMultipleEmailAddressToAwsServiceTest();

  integration.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});

test('integration snapshot test to subscribe multiple email addresses to existing topic', ()=> {
  const integration = new SubscribeMultipleEmailAddressToExistingTopic();

  integration.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});

test('integration snapshot test to link multiple linked account billing alarms to an existing topic', ()=> {
  const integration = new MultipleLinkedAccountsAssociatedToExistingTopicTest();

  integration.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});