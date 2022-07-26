# Client API (version 1) <br/> Feedbacks Microservices Client SDK for Node.js

Node.js client API for Feedbacks microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [AttachmentV1 class](#class1)
* [PartyReferenceV1 class](#class2)
* [FeedbackV1 class](#class3)
* [IFeedbacksClientV1 interface](#interface)
    - [getFeedbacks()](#operation1)
    - [getFeedbackById()](#operation2)
    - [sendFeedback()](#operation3)
    - [replyFeedback()](#operation4)
    - [deleteFeedbackById()](#operation5)
* [FeedbacksHttpClientV1 class](#client_http)
* [FeedbacksSenecaClientV1 class](#client_seneca)
* [FeedbacksLambdaClientV1 class](#client_lambda)
* [FeedbacksDirectClientV1 class](#client_direct)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-feedbacks-node": "git+ssh://git@github.com:pip-services/pip-clients-feedbacks-node.git",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-feedbacks-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
var client = sdk.FeedbacksHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Send feedback to support
    client.sendFeedback(
        null,
        { 
            category: 'support',
            title: 'Please help',
            content: 'When I am trying to run application in Win 10 it crashes'
        },
        {
            id: '123',
            name: 'Test User',
            email: 'somebody@somewhere.com'
        },
        function (err, feedback) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Sent feedback is');
            console.log(feedback);
            
            // Reply feedback
            client.replyFeedback(
                null,
                feedback.id,
                'Please, be patient. We are working to fix that issue.',
                {
                    id: '321',
                    name: 'Support Team',
                    email: 'support@somewhere.com'
                },
                function(err, feedback) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Replied feedback is');
                    console.log(feedback);
                    
                    // Close connection
                    client.close(null); 
                }
            );
        }
    );
});
```

## Data types

### <a name="class1"></a> AttachmentV1 class

Contains reference to a document attachment

**Properties:**
- id: string - unique feedback id
- name: string - document (file) name

### <a name="class2"></a> PartyReferenceV1 class

Contains reference to sending or replying party

**Properties:**
- id: string - unique feedback id
- name: string - party name
- email: string - (optional) party email address (optional)

### <a name="class3"></a> FeedbackV1 class

Represents user's feedback. 

**Properties:**
- id: string - unique feedback id
- category: string - feedback category, i.e. 'issue', 'feature', 'copyright', 'general', etc.
- app: string - (optional) application name
- sender: PartyReferenceV1 - (optional) party who sent the feedback
- sent_time: Date - date and time when feedback was sent
- title: string - (optional) feedback title
- content: string - feedback textual content
- pic_ids: string[] - (optional) array of picture block ids in storage attached to this feedback
- docs: AttachmentV1[] - (optional) array of attached documents
- company_name: string - name of the company who reported copyright violation
- company_addr: string - mail address of the company who reported copyright violation
- copyright_holder: string - holder/owner of the violated copyright
- original_location: string - original location of copyrighted material
- copyrighted_work: string - exact description of the copyrighted material
- unauth_loc: string - unauthorized location of the violated copyright
- replier: PartyReferenceV1 - party who replied the feedback
- reply_time: Date - date and time when feedback was reply
- reply: text - reply textual content
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## <a name="interface"></a> IFeedbacksClientV1 interface

If you are using Typescript, you can use IFeedbacksClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IFeedbacksClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IFeedbacksClientV1 {
    getFeedbacks(correlationId, filter, paging, callback);
    getFeedbackById(correlationId, feedbackId, callback);
    sendFeedback(correlationId, feedback, user, callback);
    replyFeedback(correlationId, feedbackId, reply, user, callback);
    deleteFeedbackById(correlationId, feedbackId, callback);
}
```

### <a name="operation1"></a> getFeedbacks(correlationId, filter, paging, callback)

Retrieves a list of feedbacks by specified criteria

**Params properties:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - category: string - (optional) feedback category
  - app: string - (optional) application name
  - sender_id: string - (optional) unique user id of the sender
  - sender_email: string - (optional) email address of the sender
  - replier_id: string - (optional) unique user id of the replier
  - sent\_from\_time: Date - (optional) start of feedback created interval
  - send\_to\_time: Date - (optional) end of feedback created interval
  - replied: boolean - **true** to filter replied feedbacks, **false** to filter feedbacks waiting for reply
  - search: string - string for full text search in title, content and sender name
- paging: object - paging parameters
  - paging: bool - (optional) true to enable paging and return total count
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result
- callback: (err, page) => void - callback function
  - err: Error - occured error or null for success
  - page: DataPage<FeedbackV1> - retrieved page of Feedback objects

### <a name="operation2"></a> getFeedbackById(correlationId, feedbackId, callback)

Retrieves feedback by its unique id. 

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- feedbackId: string - unique feedback id
- callback: (err, feedback) => void - callback function
  - err: Error - occured error or null for success
  - feedback: FeedbackV1 - retrieved Feedback object

### <a name="operation3"></a> sendFeedback(correlationId, feedback, user, callback)

Sends a feedback from a user.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- feedback: FeedbackV1 - a feedback to be sent
- user: PartyReferenceV1 - feedback sender
  - id: string - (optional) sender unique user id
  - name: string - full sender name
  - email: string - sender email address
- callback: (err, feedback) => void - callback function
  - err: Error - occured error or null for success
  - feedback: FeedbackV1 - created Feedback object
 
### <a name="operation4"></a> replyFeedback(correlationId, feedbackId, reply, user, callback)

Reply feedback specified by its unique id.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- feedbackId: string - unique feedback id
- reply: string - replied textual content
- user: PartyReferenceV1 - feedback replier
  - id: string - (optional) replier unique user id
  - name: string - full replier name
  - email: string - replier email address
- callback: (err, feedback) => void - callback function
  - err: Error - occured error or null for success
  - feedback: FeedbackV1 - replied Feedback object

### <a name="operation5"></a> deleteFeedbackById(correlationId, feedbackId, callback)

Deletes system feedback specified by its unique id.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- feedbackId: string - unique feedback id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_http"></a> FeedbacksHttpClientV1 class

FeedbacksHttpClientV1 is a client that implements HTTP protocol

```javascript
class FeedbacksHttpClientV1 extends CommandableHttpClient implements IFeedbacksClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getFeedbacks(correlationId, filter, paging, callback);
    getFeedbackById(correlationId, feedbackId, callback);
    sendFeedback(fcorrelationId, eedback, user, callback);
    replyFeedback(correlationId, feedbackId, reply, user, callback);
    deleteFeedbackById(correlationId, feedbackId, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> FeedbacksSenecaClientV1 class

FeedbacksSenecaClientV1 is a client that implements Seneca protocol

```javascript
class FeedbacksSenecaClientV1 extends CommandableSenecaClient implements IFeedbacksClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getFeedbacks(correlationId, filter, paging, callback);
    getFeedbackById(correlationId, feedbackId, callback);
    sendFeedback(fcorrelationId, eedback, user, callback);
    replyFeedback(correlationId, feedbackId, reply, user, callback);
    deleteFeedbackById(correlationId, feedbackId, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_seneca"></a> FeedbacksLambdaClientV1 class

FeedbacksLambdaClientV1 is a client that connects to AWS lambda function

```javascript
class FeedbacksLambdaClientV1 extends CommandableLambdaClient implements IFeedbacksClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getFeedbacks(correlationId, filter, paging, callback);
    getFeedbackById(correlationId, feedbackId, callback);
    sendFeedback(fcorrelationId, eedback, user, callback);
    replyFeedback(correlationId, feedbackId, reply, user, callback);
    deleteFeedbackById(correlationId, feedbackId, callback);
}
```

**Constructor config properties:** 
- connection: object - AWS lambda connection options. 
  - type: string - 'aws'
  - arn: string - Lambda function arn
- credential: object - AWS lambda credential options
  - access_id: string - Amazon access id
  - access_key: string - Amazon secret access key

## <a name="client_seneca"></a> FeedbacksDirectClientV1 class

FeedbacksDirectClientV1 is a client that calls controller directly from the same container.
It can be used in monolythic deployments when multiple microservices run in the same process.

```javascript
class FeedbacksDirectClientV1 extends DirectClient implements IFeedbacksClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getFeedbacks(correlationId, filter, paging, callback);
    getFeedbackById(correlationId, feedbackId, callback);
    sendFeedback(fcorrelationId, eedback, user, callback);
    replyFeedback(correlationId, feedbackId, reply, user, callback);
    deleteFeedbackById(correlationId, feedbackId, callback);
}
```
