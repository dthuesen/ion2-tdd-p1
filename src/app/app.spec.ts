import {
  TestBed,
  ComponentFixture,
  async
} from '@angular/core/testing';
import { IonicModule } from 'ionic-angular'; 
import { MyApp } from './app.component';
import { ProductPage } from '../pages/product/product';

// Every provider for DI has to be imported, too!!!!!!!
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe( 'Component: Root Componet', () => {
  
  beforeEach( async( () => {
    
    TestBed.configureTestingModule({
      
      declarations: [MyApp],
      providers: [
        StatusBar,
        SplashScreen
      ],
      imports: [
        IonicModule.forRoot(MyApp)
      ]
      
    }).compileComponents();
  }));
  
  beforeEach( () => {
    
    fixture = TestBed.createComponent(MyApp);
    comp    = fixture.componentInstance;
    
  });

  afterEach( () =>{
    fixture.destroy();
    comp = null; 
  });

  it( 'is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it( 'displays the product page to the user', () => {
    expect( comp['rootPage'] ).toBe(ProductPage);
  });
  
});
