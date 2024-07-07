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


export const handler = async (event) => {
    console.log('Received event:', event.clickType );
    
    const topicArn = "arn:aws:sns:us-east-1:424073965370:web-contact-form-sub";

    console.log(`Publishing to topic ${topicArn}`);
    // publish message
    const params = {
        Message: `Name: ${event.name}\n Email: ${event.email}\n Phone: ${event.phone} \n Subject: ${event.subject} \n Message: ${event.message}`,
        Subject: `A new message is received from Acmeware website`,
        TopicArn: topicArn,
    };
    return await sns.publish(params);
};
