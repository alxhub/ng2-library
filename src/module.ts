import {NgModule} from '@angular/core';
import {Ng2LibraryComponent} from './component';

@NgModule({
  declarations: [
    Ng2LibraryComponent,
  ],
  exports: [
    Ng2LibraryComponent,
  ],
})
export class Ng2LibraryModule {}
