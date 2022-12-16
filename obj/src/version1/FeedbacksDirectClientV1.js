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
exports.FeedbacksDirectClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
//import { IFeedbacksController } from 'service-feedbacks-node';
class FeedbacksDirectClientV1 extends pip_services3_rpc_nodex_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_2.Descriptor("service-feedbacks", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services3_commons_nodex_1.ConfigParams.fromValue(config));
    }
    getFeedbacks(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'feedbacks.get_feedbacks');
            try {
                let res = yield this._controller.getFeedbacks(correlationId, filter, paging);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    getFeedbackById(correlationId, feedbackId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'feedbacks.get_feedback_by_id');
            try {
                let res = yield this._controller.getFeedbackById(correlationId, feedbackId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    sendFeedback(correlationId, feedback, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'feedbacks.send_feedback');
            try {
                let res = yield this._controller.sendFeedback(correlationId, feedback, user);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    replyFeedback(correlationId, feedbackId, reply, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'feedbacks.reply_feedback');
            try {
                let res = yield this._controller.replyFeedback(correlationId, feedbackId, reply, user);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    deleteFeedbackById(correlationId, feedbackId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'feedbacks.delete_feedback_by_id');
            try {
                let res = yield this._controller.deleteFeedbackById(correlationId, feedbackId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
}
exports.FeedbacksDirectClientV1 = FeedbacksDirectClientV1;
//# sourceMappingURL=FeedbacksDirectClientV1.js.map