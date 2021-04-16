import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducers, metaReducers } from './app.reducer';
import { EffectsModule } from "@ngrx/effects";
import { EffectsArray as EffectsArrayAuth } from './auth/effects';
import { AuthModule } from './auth/auth.module';
import { UtilitariosModule } from './utilitarios/utilitarios.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    AuthModule,
    UtilitariosModule,
    StoreModule.forRoot(appReducers, {metaReducers}),
    EffectsModule.forRoot(EffectsArrayAuth),
    StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly:environment.production
    })        
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {   
}
