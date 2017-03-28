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



      <pre><code>
      </pre></code>


## How to solve some issues 

1. Compilation errors in @types/jasmine v.2.5.42

    => Update TypeScript to newer version e.g. v2.2.2




