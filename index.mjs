/**
 * This is a sample Lambda function that sends an Email on click of a
 * button. It creates a SNS topic, subscribes an endpoint (EMAIL)
 * to the topic and publishes to the topic.
 *
 * Follow these steps to complete the configuration of your function:
 *
 * 1. Update the email environment variable with your email address.
 * 2. Enter a name for your execution role in the "Role name" field.
 *    Your function's execution role needs specific permissions for SNS operations
 *    to send an email. We have pre-selected the "AWS IoT Button permissions"
 *    policy template that will automatically add these permissions.
 */
import { SNS } from '@aws-sdk/client-sns';


const sns = new SNS();


// const findExistingSubscription = async (topicArn) => {
//     let data;
//     let nextToken;
//     do {
//         try {
//             data = await SNS.listSubscriptionsByTopic({
//                 TopicArn: topicArn,
//                 NextToken: nextToken,
//             });
//             const subscription = data.Subscriptions.filter((sub) => sub.Protocol === 'email' && sub.Endpoint === EMAIL)[0];
//             if (subscription) {
//                 return subscription; // a subscription was found
//             }
//             nextToken = data.NextToken;
//         } catch (err) {
//             console.log('Error listing subscriptions.', err);
//             throw err;
//         }
//     } while (nextToken);
//     return null; // indicate that no subscription was found
// };

/**
 * Subscribe the specified EMAIL to a topic.
 */
// const createSubscription = async (topicArn) => {
//     // check to see if a subscription already exists
//     const res = await findExistingSubscription(topicArn);
//     if (!res) {
//         // no subscription, create one
//         const params = {
//             Protocol: 'email',
//             TopicArn: topicArn,
//             Endpoint: EMAIL,
//         };
//         try {
//             await SNS.subscribe(params);
//             // subscription complete
//             console.log(`Subscribed ${EMAIL} to ${topicArn}.`);
//         } catch (subscribeErr) {
//             console.log('Error setting up email subscription.', subscribeErr);
//             throw subscribeErr;
//         }
//     }
// };

/**
 * Create a topic.
 */
// const createTopic = async (topicName) => {
//     try {
//         const data = await SNS.createTopic({ Name: topicName });
//         const topicArn = data.TopicArn;
//         console.log(`Created topic: ${topicArn}`);
//         console.log('Creating subscriptions.');
//         await createSubscription(topicArn);
//         // everything is good
//         console.log('Topic setup complete.');
//         return topicArn;
//     } catch (err) {
//         console.log('Creating topic failed.', err);
//         throw err;
//     }
// };

/**
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */
export const handler = async (event) => {
    console.log('Received event:', event.clickType );
    
    const topicArn = "arn:aws:sns:us-east-1:424073965370:web-contact-form-sub";

    console.log(`Publishing to topic ${topicArn}`);
    // publish message
    const params = {
        Message: `Name: ${event.name}\n Email: ${event.email} \n Subject: ${event.subject} \n Message: ${event.message}`,
        Subject: `A new message is received from Acmeware website`,
        TopicArn: topicArn,
    };
    return await sns.publish(params);
};
