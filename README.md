AWS Lambda handler function in Nodejs.
It is exposed as REST API and has a dedicated url
It receives the following JSON payload, 
{ 
"name":"value1",
"email"::"value2",
"subject":"value3",
"message":"value4"
}
from company's website contact us form 
It is then publishes to the topic named as "web-contact-form-sub" in AWS SNS
