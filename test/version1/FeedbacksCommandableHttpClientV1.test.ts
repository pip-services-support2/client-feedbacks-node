import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { FeedbacksMemoryPersistence } from 'service-feedbacks-node';
import { FeedbacksController } from 'service-feedbacks-node';
import { FeedbacksCommandableHttpServiceV1 } from 'service-feedbacks-node';
import { FeedbacksCommandableHttpClientV1 } from '../../src/version1/FeedbacksCommandableHttpClientV1';
import { FeedbacksClientFixtureV1 } from './FeedbacksClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('FeedbacksCommandableHttpClientV1', ()=> {
    let service: FeedbacksCommandableHttpServiceV1;
    let client: FeedbacksCommandableHttpClientV1;
    let fixture: FeedbacksClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new FeedbacksMemoryPersistence();
        let controller = new FeedbacksController();

        service = new FeedbacksCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-feedbacks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-feedbacks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-feedbacks', 'service', 'commandable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new FeedbacksCommandableHttpClientV1();
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
