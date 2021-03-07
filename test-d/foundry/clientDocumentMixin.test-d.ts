import '../../index';
import { expectType } from 'tsd';

class TestDocument {
  data: unknown;
}

class TestClientDocument extends ClientDocumentMixin(TestDocument) {}

expectType<string>(new TestClientDocument().link);
