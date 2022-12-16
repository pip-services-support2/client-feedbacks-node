import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';

import { FeedbackV1 } from './FeedbackV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { IFeedbacksClientV1 } from './IFeedbacksClientV1';

export class FeedbacksCommandableHttpClientV1 extends CommandableHttpClient implements IFeedbacksClientV1 {

    constructor(config?: any) {
        super('v1/feedbacks');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public async getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FeedbackV1>> {
        return await this.callCommand(
            'get_feedbacks',
            correlationId,
            {
                filter: filter,
                paging: paging
            }
        );
    }

    public async getFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1> {
        return await this.callCommand(
            'get_feedback_by_id',
            correlationId,
            {
                feedback_id: feedbackId
            }
        );
    }

    public async sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1): Promise<FeedbackV1> {
        return await this.callCommand(
            'send_feedback',
            correlationId,
            {
                feedback: feedback,
                user: user
            }
        );
    }

    public async replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1): Promise<FeedbackV1> {
        return await this.callCommand(
            'reply_feedback',
            correlationId,
            {
                feedback_id: feedbackId,
                reply: reply,
                user: user
            }
        );
    }

    public async deleteFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1> {
        return await this.callCommand(
            'delete_feedback_by_id',
            correlationId,
            {
                feedback_id: feedbackId
            }
        );
    }
}
