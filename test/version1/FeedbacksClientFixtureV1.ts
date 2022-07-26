const assert = require('chai').assert;

import { IFeedbacksClientV1 } from '../../src/version1/IFeedbacksClientV1';
import { PartyReferenceV1 } from '../../src/version1/PartyReferenceV1';
import { FeedbackV1 } from '../../src/version1/FeedbackV1';

let FEEDBACK = <FeedbackV1>{
    category: 'general',
    title: 'Test',
    content: 'This is just a test'
};
let USER1 = <PartyReferenceV1>{
    id: '1',
    name: 'Test User',
    email: 'test@digitallivingsoftware.com'
};
let USER2 = <PartyReferenceV1>{
    id: '2',
    name: 'Admin User',
    email: 'admin@digitallivingsoftware.com'
};

export class FeedbacksClientFixtureV1 {
    private _client: IFeedbacksClientV1;
    
    constructor(client: IFeedbacksClientV1) {
        this._client = client;
    }
        
    public async testCrudOperations() {
        var feedback1, feedback2;

        // Send one feedback
        let feedback = await this._client.sendFeedback(null, FEEDBACK, USER1);

        assert.isObject(feedback);
        assert.equal(feedback.category, FEEDBACK.category);
        assert.equal(feedback.content, FEEDBACK.content);
        assert.equal(feedback.sender.id, USER1.id);
        assert.equal(feedback.sender.name, USER1.name);
        assert.isDefined(feedback.sent_time);
        assert.isUndefined(feedback.reply_time);

        feedback1 = feedback;

        // Send another feedback
        feedback = await this._client.sendFeedback(null, FEEDBACK, USER2);

        assert.isObject(feedback);
        assert.equal(feedback.category, FEEDBACK.category);
        assert.equal(feedback.content, FEEDBACK.content);
        assert.equal(feedback.sender.id, USER2.id);
        assert.equal(feedback.sender.name, USER2.name);
        assert.isDefined(feedback.sent_time);
        assert.isUndefined(feedback.reply_time);

        feedback2 = feedback;

        // Get all feedbacks
        let page = await this._client.getFeedbacks(null, null, null);

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Reply the feedback
        feedback = await this._client.replyFeedback(null, feedback1.id, 'This is a reply', USER2);

        assert.isObject(feedback);
        assert.equal(feedback.reply, 'This is a reply');
        assert.equal(feedback.replier.id, USER2.id);
        assert.equal(feedback.replier.name, USER2.name);
        assert.isDefined(feedback.reply_time);

        feedback1 = feedback;

        // Delete feedback
        await this._client.deleteFeedbackById(null, feedback1.id);

        // Try to get delete feedback
        feedback = await this._client.getFeedbackById(null, feedback1.id);

        assert.isNull(feedback || null);
    }
}
