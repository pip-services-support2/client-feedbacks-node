"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbacksClientFactory = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const FeedbacksDirectClientV1_1 = require("../version1/FeedbacksDirectClientV1");
const FeedbacksCommandableHttpClientV1_1 = require("../version1/FeedbacksCommandableHttpClientV1");
const FeedbacksCommandableLambdaClientV1_1 = require("../version1/FeedbacksCommandableLambdaClientV1");
class FeedbacksClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(FeedbacksClientFactory.DirectClientV1Descriptor, FeedbacksDirectClientV1_1.FeedbacksDirectClientV1);
        this.registerAsType(FeedbacksClientFactory.CmdHttpClientV1Descriptor, FeedbacksCommandableHttpClientV1_1.FeedbacksCommandableHttpClientV1);
        this.registerAsType(FeedbacksClientFactory.CmdLambdaClientV1Descriptor, FeedbacksCommandableLambdaClientV1_1.FeedbacksCommandableLambdaClientV1);
    }
}
exports.FeedbacksClientFactory = FeedbacksClientFactory;
FeedbacksClientFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-feedbacks', 'factory', 'default', 'default', '1.0');
FeedbacksClientFactory.DirectClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-feedbacks', 'client', 'direct', 'default', '1.0');
FeedbacksClientFactory.CmdHttpClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-feedbacks', 'client', 'commandable-http', 'default', '1.0');
FeedbacksClientFactory.CmdLambdaClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-feedbacks', 'client', 'commandable-lambda', 'default', '1.0');
//# sourceMappingURL=FeedbacksClientFactory.js.map