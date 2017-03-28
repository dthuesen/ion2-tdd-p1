# TDD with ionic

## TDD  -  Test Driven Development  ≠  BDD Behavior Driven Development

The TDD approach might be: 

```it('should remove the last element in the array')``` 

whereas the BDD approach might be described like 

```it('should remove the last grocery item added')``` 

Both test the same thing but the TDD approach has knowledge of the internals of the implementation. BDD tests the desired behavior.

## Anatomy of a basic test with Jasmine and TestBed


<strong>The configuration of the test </strong> in the file ```test.ts``` has ten steps to follow (in this app):

1. Import required dependencies
2. Declare the not yet available typing for Karma
3. Prevent Karma from running prematurely
4. Initialize the Angular testing environment:

    <pre><code> 
    getTestBed().initTestEnvironment(
       BrowserDynamicTestingModule,
       platformBrowserDynamicTesting(),
    ); 
    </code></pre>
5. Find all the tests. with 
    <pre><code> 
      let context: any = require.context('./', true, /\.spec\.ts/);
    </code></pre>
6. Load the modules.
    <pre><code>
      context.keys().map(context);
    </code></pre>
7. Start Karma to run the tests
    <pre><code>
      __karma__.start();
    </code></pre>


<strong>A test itself has more or less this shape: </strong>

1. Import als required dependencies. Even the providers used in the specific component (e.g. StatusBar or SplashScreen) 
2. Add variables for <b>comp</b>, e.g ```let comp: MyApp;```, and <b>fixtures</b>, e.g. ```let fixture: ComponentFixture<MyApp>;```
3. Write the test suite with  ```describe() {}```
4. In the test suite write the beforeEach() function with the async parameter (this wraps a function in an asynchronous test zone. The test will automatically complete when all asynchronous calls within this zone are done.) and its callback function with ```TestBed.configureTestingModule()``` for configuration of the TestBed (with 'declarations', 'providers' and 'imports'): 
      <pre><code>
        (method) TestBed.configureTestingModule(moduleDef: {
            providers?: any[];
            declarations?: any[];
            imports?: any[];
            schemas?: (any[] | SchemaMetadata)[];
        }): typeof TestBed
      </code></pre>
    This allows overriding default providers, directives, pipes, modules of the test injector, which are defined in test_injector.js
5. Resolve the Promis with ```.compileComponents()``` -  it's necessary as fetching urls is asynchronous.
6. Write beforeEach() function for all things to do upfront the tests, e.g.
    <pre><code>
      beforeEach( () => {
    
        fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;
        
      });
    </code></pre>
7. Write a afterEach() function for destroying the things setup in the beforeEach() funktion, e.g.
    <pre><code>
      afterEach( () =>{
        fixture.destroy();
        comp = null; 
      });
    </code></pre>
8. Now writing the test(s) starts with a kind of shape like this:
    <pre><code>
      it( 'is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
      });
    </code></pre>
    or like this
    <pre><code>
      it( 'displays the product page to the user', () => {
        expect( comp['rootPage'] ).toBe(ProductPage);
      });
    </code></pre>

That's it.

## The process of TDD and BDD tests ar following
1. Write a test
2. Run the test (it should fail)
3. Write the code to satisfy the test 
4. Test again (it should pass)
5. Refactor as necessary


## Beginner example of writing a test for a static "service" (provider in Ionic speak), the starting point to a real world service with e.g. HTTP requests

1. Import all necessary dependencies:
      <pre><code>
        import { Products } from './products';
        import { NavController, NavParams } from 'ionic-angular';
      </pre></code>
2. Declare a variable for the instance of the service which should be tested:
      <pre><code>
        let productsService;
      </pre></code>
3. Write the test suite function:
      <pre><code>
        describe('Provider: Products', () => {
          //
          // beforeEach() ...
          //
          // it()...
          //
          //...
        });
      </pre></code>
4. In that test suite write the ```beforeEach()``` function:
      <pre><code>
        beforeEach(() => {
            
             |    // This instatiation only works because the actual service
             |    // has no dependencies (e.g. Http). With dependencies TestBed 
            \|/   // is needed to inject these dependencies
             V
 
            productsService = new Products();
            
        });
      </pre></code>
5. And the ```it```function - the test case - as well:
      <pre><code>
        it('should have a non empty array called products', () =>{
            
          let products = productsService.products;
          
          expect(Array.isArray(products)).toBeTruthy();
          expect(products.length).toBeGreaterThan(0);
          
        })
      </pre></code>
6. Done


## Writing a test for a more realistic service with HTTP request
### But befor starting: ```MockBackend?```, ```BaseRequestOptions?```, ```useFactory?```

In this test for the service the provided Http won't be used in its normal form. The implementation will be modified by using ```useFactory```. By that only the service will betetsted and not the external service as an isolated case.
The ```useFactory``` uses a service provided by Angular called ```MockBackend```. This is for testing purpose and alows to create a fake backend which send fake responses. These responses are still performed asynchronously, like a normal HTTP request would be.
When mocking the backend like this, any response can be used for testing. In this case a ```JSON``` string is used hard coded. The mock response is setup like this:

        <pre><code>
          mockBackend.connections.subscribe( (connection) => {
            connection.mockRespond( new Response( new ResponseOptions( {
              body: mockResponse
            })));
          })
        </pre></code>

This has effects on the test of the products page, too. With the simple test mentioned above the Products service is referenced and checks its data immediately. but the data isn't available immediatle, becaus it's loaded asynchronously. It would make the former test fail. Now the correct approach should isolate the unit test as much as possible. A mock for the Products service is needed, so this specific component will only be tested. 

A ProductsMock is needed in src/mocks:

        <pre><code>
          export class ProductsMock {
            public products: any = [
              { "title": "Cool shoes", "description": "Isn\'t it obvious?", "price": "39.99" }
            ]
          }
        </pre></code>

And this mock has to be imported into ```product.spec.ts```and declared in the providers array like so:

        <pre><code>
          {
            provide: Products,
            useClass: ProductsMock
          }
        </pre></code>

This takes out the provided service and follows the approach to fake the HTTP backend and swap the real Products with a fake ProductsMock by using ```useClass```.


## How to solve some issues 
(actually there's only one but I think more to come ;-) 

1. Compilation errors in @types/jasmine v.2.5.42

    => Update TypeScript to newer version e.g. v2.2.2




