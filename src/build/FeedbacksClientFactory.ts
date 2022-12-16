import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';

import { FeedbacksDirectClientV1 } from '../version1/FeedbacksDirectClientV1';
import { FeedbacksCommandableHttpClientV1 } from '../version1/FeedbacksCommandableHttpClientV1';
import { FeedbacksCommandableLambdaClientV1 } from '../version1/FeedbacksCommandableLambdaClientV1';

export class FeedbacksClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('service-feedbacks', 'factory', 'default', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('service-feedbacks', 'client', 'direct', 'default', '1.0');
	public static CmdHttpClientV1Descriptor = new Descriptor('service-feedbacks', 'client', 'commandable-http', 'default', '1.0');
	public static CmdLambdaClientV1Descriptor = new Descriptor('service-feedbacks', 'client', 'commandable-lambda', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(FeedbacksClientFactory.DirectClientV1Descriptor, FeedbacksDirectClientV1);
		this.registerAsType(FeedbacksClientFactory.CmdHttpClientV1Descriptor, FeedbacksCommandableHttpClientV1);
		this.registerAsType(FeedbacksClientFactory.CmdLambdaClientV1Descriptor, FeedbacksCommandableLambdaClientV1);
	}
	
}
