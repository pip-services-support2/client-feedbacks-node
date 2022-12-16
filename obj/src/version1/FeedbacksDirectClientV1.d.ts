import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';
import { FeedbackV1 } from './FeedbackV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { IFeedbacksClientV1 } from './IFeedbacksClientV1';
export declare class FeedbacksDirectClientV1 extends DirectClient<any> implements IFeedbacksClientV1 {
    constructor(config?: any);
    getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FeedbackV1>>;
    getFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1>;
    sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1): Promise<FeedbackV1>;
    replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1): Promise<FeedbackV1>;
    deleteFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1>;
}
