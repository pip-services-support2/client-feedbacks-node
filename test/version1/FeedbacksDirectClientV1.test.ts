import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { FeedbacksMemoryPersistence } from 'service-feedbacks-node';
import { FeedbacksController } from 'service-feedbacks-node';
import { IFeedbacksClientV1 } from '../../src/version1/IFeedbacksClientV1';
import { FeedbacksDirectClientV1 } from '../../src/version1/FeedbacksDirectClientV1';
import { FeedbacksClientFixtureV1 } from './FeedbacksClientFixtureV1';

suite('FeedbacksDirectClientV1', ()=> {
    let client: FeedbacksDirectClientV1;
    let fixture: FeedbacksClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new FeedbacksMemoryPersistence();
        let controller = new FeedbacksController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-feedbacks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-feedbacks', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new FeedbacksDirectClientV1();
        client.setReferences(references);

        fixture = new FeedbacksClientFixtureV1(client);

        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});
