import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams} from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';

import { FeedbackV1 } from './FeedbackV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { IFeedbacksClientV1 } from './IFeedbacksClientV1';
//import { IFeedbacksController } from 'service-feedbacks-node';

export class FeedbacksDirectClientV1 extends DirectClient<any> implements IFeedbacksClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("service-feedbacks", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public async getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FeedbackV1>> {
        let timing = this.instrument(correlationId, 'feedbacks.get_feedbacks');

        try {
            return await this._controller.getFeedbacks(correlationId, filter, paging);
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
            return await this._controller.getFeedbackById(correlationId, feedbackId);
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
            return await this._controller.sendFeedback(correlationId, feedback, user);
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
            return await this._controller.replyFeedback(correlationId, feedbackId, reply, user);
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
            return await this._controller.deleteFeedbackById(correlationId, feedbackId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

}