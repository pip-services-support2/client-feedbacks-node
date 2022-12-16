"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbacksCommandableLambdaClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
class FeedbacksCommandableLambdaClientV1 extends pip_services3_aws_nodex_1.CommandableLambdaClient {
    constructor(config) {
        super('feedbacks');
        if (config != null)
            this.configure(pip_services3_commons_nodex_1.ConfigParams.fromValue(config));
    }
    getFeedbacks(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_feedbacks', correlationId, {
                filter: filter,
                paging: paging
            });
        });
    }
    getFeedbackById(correlationId, feedbackId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_feedback_by_id', correlationId, {
                feedback_id: feedbackId
            });
        });
    }
    sendFeedback(correlationId, feedback, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('send_feedback', correlationId, {
                feedback: feedback,
                user: user
            });
        });
    }
    replyFeedback(correlationId, feedbackId, reply, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('reply_feedback', correlationId, {
                feedback_id: feedbackId,
                reply: reply,
                user: user
            });
        });
    }
    deleteFeedbackById(correlationId, feedbackId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('delete_feedback_by_id', correlationId, {
                feedback_id: feedbackId
            });
        });
    }
}
exports.FeedbacksCommandableLambdaClientV1 = FeedbacksCommandableLambdaClientV1;
//# sourceMappingURL=FeedbacksCommandableLambdaClientV1.js.map