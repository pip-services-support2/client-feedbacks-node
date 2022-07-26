import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';

import { FeedbacksDirectClientV1 } from '../version1/FeedbacksDirectClientV1';
import { FeedbacksHttpClientV1 } from '../version1/FeedbacksHttpClientV1';

export class FeedbacksClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('service-feedbacks', 'factory', 'default', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('service-feedbacks', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('service-feedbacks', 'client', 'http', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(FeedbacksClientFactory.DirectClientV1Descriptor, FeedbacksDirectClientV1);
		this.registerAsType(FeedbacksClientFactory.HttpClientV1Descriptor, FeedbacksHttpClientV1);
	}
	
}
