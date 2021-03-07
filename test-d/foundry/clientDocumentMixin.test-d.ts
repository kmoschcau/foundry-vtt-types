import '../../index';
import { expectType, expectAssignable } from 'tsd';

class TestDocument {
  data: unknown;

  get foo() {
    return false;
  }
}

class TestClientDocument extends ClientDocumentMixin(TestDocument) {}

expectType<boolean>(new TestClientDocument().foo);
expectType<string>(new TestClientDocument().link);

expectAssignable<TestDocument>(new TestClientDocument());
expectAssignable<ClientDocumentMixin<any>>(new TestClientDocument());
