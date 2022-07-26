import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { FeedbacksMemoryPersistence } from 'service-feedbacks-node';
import { FeedbacksController } from 'service-feedbacks-node';
import { FeedbacksHttpServiceV1 } from 'service-feedbacks-node';
import { FeedbacksHttpClientV1 } from '../../src/version1/FeedbacksHttpClientV1';
import { FeedbacksClientFixtureV1 } from './FeedbacksClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('FeedbacksHttpClientV1', ()=> {
    let service: FeedbacksHttpServiceV1;
    let client: FeedbacksHttpClientV1;
    let fixture: FeedbacksClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new FeedbacksMemoryPersistence();
        let controller = new FeedbacksController();

        service = new FeedbacksHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-feedbacks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-feedbacks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-feedbacks', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new FeedbacksHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new FeedbacksClientFixtureV1(client);

        await service.open(null);
        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
        await service.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});
