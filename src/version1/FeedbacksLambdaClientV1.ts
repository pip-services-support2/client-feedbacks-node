import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableLambdaClient } from 'pip-services3-aws-nodex';

import { FeedbackV1 } from './FeedbackV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { IFeedbacksClientV1 } from './IFeedbacksClientV1';

export class FeedbacksLambdaClientV1 extends CommandableLambdaClient implements IFeedbacksClientV1 {

    constructor(config?: any) {
        super('feedbacks');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public async getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FeedbackV1>> {
        let timing = this.instrument(correlationId, 'feedbacks.get_feedbacks');

        try {
            return await this.callCommand(
                'get_feedbacks',
                correlationId,
                {
                    filter: filter,
                    paging: paging
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1> {
        let timing = this.instrument(correlationId, 'feedbacks.get_feedback_by_id');

        try {
            return await this.callCommand(
                'get_feedback_by_id',
                correlationId,
                {
                    feedback_id: feedbackId
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1): Promise<FeedbackV1> {
        let timing = this.instrument(correlationId, 'feedbacks.send_feedback');

        try {
            return await this.callCommand(
                'send_feedback',
                correlationId,
                {
                    feedback: feedback,
                    user: user
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1): Promise<FeedbackV1> {
        let timing = this.instrument(correlationId, 'feedbacks.reply_feedback');

        try {
            return await this.callCommand(
                'reply_feedback',
                correlationId,
                {
                    feedback_id: feedbackId,
                    reply: reply,
                    user: user
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async deleteFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1> {
        let timing = this.instrument(correlationId, 'feedbacks.delete_feedback_by_id');

        try {
            return await this.callCommand(
                'delete_feedback_by_id',
                correlationId,
                {
                    feedback_id: feedbackId
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

}
