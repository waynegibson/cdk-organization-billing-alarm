# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### EmailSubscription <a name="@spacecomx/cdk-organization-billing-alarm.EmailSubscription"></a>

#### Initializer <a name="@spacecomx/cdk-organization-billing-alarm.EmailSubscription.Initializer"></a>

```typescript
import { EmailSubscription } from '@spacecomx/cdk-organization-billing-alarm'

new EmailSubscription(scope: Construct, id: string, props: EmailSubscriptionProps)
```

##### `scope`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.EmailSubscription.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.EmailSubscription.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.EmailSubscription.parameter.props"></a>

- *Type:* [`@spacecomx/cdk-organization-billing-alarm.EmailSubscriptionProps`](#@spacecomx/cdk-organization-billing-alarm.EmailSubscriptionProps)

---





### LinkedAccountAlarm <a name="@spacecomx/cdk-organization-billing-alarm.LinkedAccountAlarm"></a>

A construct to create multiple linked account billing alarms associated with an existing SNS topic Arn within a master/payer AWS account e.g (AWS Organization).

#### Initializer <a name="@spacecomx/cdk-organization-billing-alarm.LinkedAccountAlarm.Initializer"></a>

```typescript
import { LinkedAccountAlarm } from '@spacecomx/cdk-organization-billing-alarm'

new LinkedAccountAlarm(scope: Construct, id: string, props: LinkedAccountAlarmProps)
```

##### `scope`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.LinkedAccountAlarm.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.LinkedAccountAlarm.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.LinkedAccountAlarm.parameter.props"></a>

- *Type:* [`@spacecomx/cdk-organization-billing-alarm.LinkedAccountAlarmProps`](#@spacecomx/cdk-organization-billing-alarm.LinkedAccountAlarmProps)

---





### MasterAccountAlarm <a name="@spacecomx/cdk-organization-billing-alarm.MasterAccountAlarm"></a>

A construct to create a master account billing alarm in master/payer AWS account e.g (AWS Organization).

#### Initializer <a name="@spacecomx/cdk-organization-billing-alarm.MasterAccountAlarm.Initializer"></a>

```typescript
import { MasterAccountAlarm } from '@spacecomx/cdk-organization-billing-alarm'

new MasterAccountAlarm(scope: Construct, id: string, props: MasterAccountAlarmProps)
```

##### `scope`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.MasterAccountAlarm.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.MasterAccountAlarm.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.MasterAccountAlarm.parameter.props"></a>

- *Type:* [`@spacecomx/cdk-organization-billing-alarm.MasterAccountAlarmProps`](#@spacecomx/cdk-organization-billing-alarm.MasterAccountAlarmProps)

---





## Structs <a name="Structs"></a>

### EmailSubscriptionProps <a name="@spacecomx/cdk-organization-billing-alarm.EmailSubscriptionProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { EmailSubscriptionProps } from '@spacecomx/cdk-organization-billing-alarm'

const emailSubscriptionProps: EmailSubscriptionProps = { ... }
```

##### `topicConfiguration`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.EmailSubscriptionProps.property.topicConfiguration"></a>

- *Type:* [`@spacecomx/cdk-organization-billing-alarm.ITopicEmailSubscription`](#@spacecomx/cdk-organization-billing-alarm.ITopicEmailSubscription)

Topic configuration options to configure the email address's that will be used to subscribe to the existing topic.

---

### LinkedAccountAlarmProps <a name="@spacecomx/cdk-organization-billing-alarm.LinkedAccountAlarmProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { LinkedAccountAlarmProps } from '@spacecomx/cdk-organization-billing-alarm'

const linkedAccountAlarmProps: LinkedAccountAlarmProps = { ... }
```

##### `accounts`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.LinkedAccountAlarmProps.property.accounts"></a>

- *Type:* [`@spacecomx/cdk-organization-billing-alarm.IAccountDefination`](#@spacecomx/cdk-organization-billing-alarm.IAccountDefination)[]

Account configuration options to configure the billing alarm e.g. (name, description etc.).

---

##### `topicConfiguration`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.LinkedAccountAlarmProps.property.topicConfiguration"></a>

- *Type:* [`@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination`](#@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination)

Topic configuration options to configure the SNS topic and email address's that will be used to subscribe to the topic.

---

### MasterAccountAlarmProps <a name="@spacecomx/cdk-organization-billing-alarm.MasterAccountAlarmProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { MasterAccountAlarmProps } from '@spacecomx/cdk-organization-billing-alarm'

const masterAccountAlarmProps: MasterAccountAlarmProps = { ... }
```

##### `alarmConfiguration`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.MasterAccountAlarmProps.property.alarmConfiguration"></a>

- *Type:* [`@spacecomx/cdk-organization-billing-alarm.IAlarmDefination`](#@spacecomx/cdk-organization-billing-alarm.IAlarmDefination)

Alarm configuration options to configure the billing alarm e.g. (name, description etc.).

---

##### `topicConfiguration`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.MasterAccountAlarmProps.property.topicConfiguration"></a>

- *Type:* [`@spacecomx/cdk-organization-billing-alarm.ITopicDefination`](#@spacecomx/cdk-organization-billing-alarm.ITopicDefination)

Topic configuration options to configure the SNS topic and email address's that will be used to subscribe to the topic.

---


## Protocols <a name="Protocols"></a>

### IAccountDefination <a name="@spacecomx/cdk-organization-billing-alarm.IAccountDefination"></a>

- *Extends:* [`@spacecomx/cdk-organization-billing-alarm.IAlarmDefination`](#@spacecomx/cdk-organization-billing-alarm.IAlarmDefination)

- *Implemented By:* [`@spacecomx/cdk-organization-billing-alarm.IAccountDefination`](#@spacecomx/cdk-organization-billing-alarm.IAccountDefination)


#### Properties <a name="Properties"></a>

##### `alarmDescription`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.IAccountDefination.property.alarmDescription"></a>

- *Type:* `string`

Description for the alarm.

A developer-defined string that can be used to identify this alarm.

---

##### `thresholdAmount`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.IAccountDefination.property.thresholdAmount"></a>

- *Type:* `number`

Enter the threshold amount in USD that must be exceeded to trigger the alarm e.g. (limit: 150).

---

##### `alarmName`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.IAccountDefination.property.alarmName"></a>

- *Type:* `string`
- *Default:* Generated name

Name of the alarm.

If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the alarm name (recommended).

---

##### `awsService`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.IAccountDefination.property.awsService"></a>

- *Type:* `string`
- *Default:* Not configured.

The AWS Service to associate the alarm with e.g (AmazonDynamoDB).

---

##### `account`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.IAccountDefination.property.account"></a>

- *Type:* `string`

Account id which this metric comes from.

---

### IAlarmDefination <a name="@spacecomx/cdk-organization-billing-alarm.IAlarmDefination"></a>

- *Implemented By:* [`@spacecomx/cdk-organization-billing-alarm.IAccountDefination`](#@spacecomx/cdk-organization-billing-alarm.IAccountDefination), [`@spacecomx/cdk-organization-billing-alarm.IAlarmDefination`](#@spacecomx/cdk-organization-billing-alarm.IAlarmDefination)


#### Properties <a name="Properties"></a>

##### `alarmDescription`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.IAlarmDefination.property.alarmDescription"></a>

- *Type:* `string`

Description for the alarm.

A developer-defined string that can be used to identify this alarm.

---

##### `thresholdAmount`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.IAlarmDefination.property.thresholdAmount"></a>

- *Type:* `number`

Enter the threshold amount in USD that must be exceeded to trigger the alarm e.g. (limit: 150).

---

##### `alarmName`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.IAlarmDefination.property.alarmName"></a>

- *Type:* `string`
- *Default:* Generated name

Name of the alarm.

If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the alarm name (recommended).

---

##### `awsService`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.IAlarmDefination.property.awsService"></a>

- *Type:* `string`
- *Default:* Not configured.

The AWS Service to associate the alarm with e.g (AmazonDynamoDB).

---

### ITopicArnDefination <a name="@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination"></a>

- *Implemented By:* [`@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination`](#@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination), [`@spacecomx/cdk-organization-billing-alarm.ITopicDefination`](#@spacecomx/cdk-organization-billing-alarm.ITopicDefination), [`@spacecomx/cdk-organization-billing-alarm.ITopicEmailSubscription`](#@spacecomx/cdk-organization-billing-alarm.ITopicEmailSubscription)


#### Properties <a name="Properties"></a>

##### `parameterName`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination.property.parameterName"></a>

- *Type:* `string`
- *Default:* Not configured.

The name of the SSM parameter e.g '/prod/billing/topicArn'.

Returns a token that will resolve (during deployment) to the string value of an SSM string parameter.

---

##### `parameterVersion`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination.property.parameterVersion"></a>

- *Type:* `number`
- *Default:* Not configured.

The SSM parameter version (recommended in order to ensure that the value won't change during deployment).

---

##### `secretName`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination.property.secretName"></a>

- *Type:* `string`
- *Default:* Not configured.

Imports a secret by secret name e.g 'prod/billing/topicArn'.

A secret with this name must exist in the same account & region as the master/payer AWS account.

---

### ITopicArnParameter <a name="@spacecomx/cdk-organization-billing-alarm.ITopicArnParameter"></a>

- *Implemented By:* [`@spacecomx/cdk-organization-billing-alarm.ITopicArnParameter`](#@spacecomx/cdk-organization-billing-alarm.ITopicArnParameter)


#### Properties <a name="Properties"></a>

##### `parameterName`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicArnParameter.property.parameterName"></a>

- *Type:* `string`
- *Default:* Not configured.

The name of the SSM parameter e.g '/prod/billing/topicArn'.

Returns a token that will resolve (during deployment) to the string value of an SSM string parameter.

---

##### `parameterVersion`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicArnParameter.property.parameterVersion"></a>

- *Type:* `number`
- *Default:* Not configured.

The SSM parameter version (recommended in order to ensure that the value won't change during deployment).

---

### ITopicArnSecret <a name="@spacecomx/cdk-organization-billing-alarm.ITopicArnSecret"></a>

- *Implemented By:* [`@spacecomx/cdk-organization-billing-alarm.ITopicArnSecret`](#@spacecomx/cdk-organization-billing-alarm.ITopicArnSecret)


#### Properties <a name="Properties"></a>

##### `secretName`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicArnSecret.property.secretName"></a>

- *Type:* `string`
- *Default:* Not configured.

Imports a secret by secret name e.g 'prod/billing/topicArn'.

A secret with this name must exist in the same account & region as the master/payer AWS account.

---

### ITopicDefination <a name="@spacecomx/cdk-organization-billing-alarm.ITopicDefination"></a>

- *Extends:* [`@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination`](#@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination)

- *Implemented By:* [`@spacecomx/cdk-organization-billing-alarm.ITopicDefination`](#@spacecomx/cdk-organization-billing-alarm.ITopicDefination)


#### Properties <a name="Properties"></a>

##### `parameterName`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicDefination.property.parameterName"></a>

- *Type:* `string`
- *Default:* Not configured.

The name of the SSM parameter e.g '/prod/billing/topicArn'.

Returns a token that will resolve (during deployment) to the string value of an SSM string parameter.

---

##### `parameterVersion`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicDefination.property.parameterVersion"></a>

- *Type:* `number`
- *Default:* Not configured.

The SSM parameter version (recommended in order to ensure that the value won't change during deployment).

---

##### `secretName`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicDefination.property.secretName"></a>

- *Type:* `string`
- *Default:* Not configured.

Imports a secret by secret name e.g 'prod/billing/topicArn'.

A secret with this name must exist in the same account & region as the master/payer AWS account.

---

##### `emailAddress`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicDefination.property.emailAddress"></a>

- *Type:* `string`[]
- *Default:* Not configured

The email address that will be used to subcribe to the SNS topic for billing alert notifications e.g. ['hello@example.org'] or [''hello@example.org', 'admin@example.org'].

---

##### `topicDescription`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicDefination.property.topicDescription"></a>

- *Type:* `string`

Description for the topic.

A developer-defined string that can be used to identify this topic.

---

### ITopicEmailSubscription <a name="@spacecomx/cdk-organization-billing-alarm.ITopicEmailSubscription"></a>

- *Extends:* [`@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination`](#@spacecomx/cdk-organization-billing-alarm.ITopicArnDefination)

- *Implemented By:* [`@spacecomx/cdk-organization-billing-alarm.ITopicEmailSubscription`](#@spacecomx/cdk-organization-billing-alarm.ITopicEmailSubscription)


#### Properties <a name="Properties"></a>

##### `parameterName`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicEmailSubscription.property.parameterName"></a>

- *Type:* `string`
- *Default:* Not configured.

The name of the SSM parameter e.g '/prod/billing/topicArn'.

Returns a token that will resolve (during deployment) to the string value of an SSM string parameter.

---

##### `parameterVersion`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicEmailSubscription.property.parameterVersion"></a>

- *Type:* `number`
- *Default:* Not configured.

The SSM parameter version (recommended in order to ensure that the value won't change during deployment).

---

##### `secretName`<sup>Optional</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicEmailSubscription.property.secretName"></a>

- *Type:* `string`
- *Default:* Not configured.

Imports a secret by secret name e.g 'prod/billing/topicArn'.

A secret with this name must exist in the same account & region as the master/payer AWS account.

---

##### `emailAddress`<sup>Required</sup> <a name="@spacecomx/cdk-organization-billing-alarm.ITopicEmailSubscription.property.emailAddress"></a>

- *Type:* `string`[]
- *Default:* Not configured

The email address's that will be used to subcribe to the existing SNS topic for billing alert notifications e.g. ['hello@example.org'] or [''hello@example.org', 'admin@example.org'].

---

