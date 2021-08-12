import { removeAccountDuplicates } from './../src/helpers';

test('ensures that duplicate accounts are removed before creating billing alarms for the specific account.', () => {
  const input = [
    {
      account: '4444555566669',
      alarmName: 'Consolidated: (All AWS Services)',
      alarmDescription: 'Consolidated billing alarm',
      thresholdAmount: 50,
    },
    {
      account: '4444555566669',
      alarmName: 'Consolidated: (AWS Services)',
      alarmDescription: 'Some consolidated alarm',
      thresholdAmount: 50,
    },
    {
      account: '4444555566669',
      alarmDescription: 'Billing Alarm for AWS DynamoDB charge estimates only (Account: 123456789000)',
      thresholdAmount: 50,
      awsService: 'AmazonDynamoDB',
    },
  ];

  const ouput = [
    {
      account: '4444555566669',
      alarmName: 'Consolidated: (All AWS Services)',
      alarmDescription: 'Consolidated billing alarm',
      thresholdAmount: 50,
    },
    {
      account: '4444555566669',
      alarmDescription: 'Billing Alarm for AWS DynamoDB charge estimates only (Account: 123456789000)',
      thresholdAmount: 50,
      awsService: 'AmazonDynamoDB',
    },
  ];

  expect(removeAccountDuplicates(input)).toEqual(ouput);
});