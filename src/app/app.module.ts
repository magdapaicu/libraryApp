import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, NgForm } from '@angular/forms';
import { PostService } from './services/post.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { BookComponent } from './components/book/book.component';
import { BooksDisplayComponent } from './components/book/books-display/books-display.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DialogLogoutComponent } from './dialog-logout/dialog-logout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartComponent } from './components/start/start.component';
import { HoverDirective } from './hover.directive';
import { MaterialModule } from './shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SidenavComponent } from './components/contacts/sidenav/sidenav.component';
import { ToolbarComponent } from './components/contacts/toolbar/toolbar.component';
import { MainContentComponent } from './components/contacts/main-content/main-content.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AddNewBookDilogComponent } from './components/book/add-new-book-dilog/add-new-book-dilog.component';
import { LocatieComponent } from './locatie/locatie.component';
import { SidenavServicesService } from './components/users/user-details/sidenav-services.service';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { FPasswordComponent } from './f-password/f-password.component';
import { AddReviewDialogComponent } from './components/contacts/main-content/add-review-dialog/add-review-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditDialogComponent } from './components/users/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './components/users/delete-dialog/delete-dialog.component';
import { SearchButtonComponent } from './components/users/user-details/search-button/search-button.component';
import { EditDialogBookComponent } from './components/book/edit-dialog-book/edit-dialog-book.component';
import { SidenavBooksDetailsComponent } from './shared/sidenav-books-details/sidenav-books-details.component';
import { BookListComponent } from './components/users/book-list/book-list.component';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAu-j3XLcEra7fSzNEX_fwuqZsDMtzIwEY',
  authDomain: 'angularapp-f143a.firebaseapp.com',
  databaseURL: 'https://angularapp-f143a-default-rtdb.firebaseio.com',
  projectId: 'angularapp-f143a',
  storageBucket: 'angularapp-f143a.appspot.com',
  messagingSenderId: '76197812124',
  appId: '1:76197812124:web:ffb109617f18346c6d5a59',
  measurementId: 'G-FLLW710DQP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    RegisterComponent,
    UsersComponent,
    UserDetailsComponent,
    BookComponent,
    BooksDisplayComponent,
    DialogLogoutComponent,
    StartComponent,
    HoverDirective,
    ContactsComponent,
    SidenavComponent,
    ToolbarComponent,
    MainContentComponent,
    PageNotFoundComponent,
    LoginComponent,
    AddNewBookDilogComponent,
    LocatieComponent,
    FPasswordComponent,
    AddReviewDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    SearchButtonComponent,
    EditDialogBookComponent,
    SidenavBooksDetailsComponent,
    BookListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    NgbModule,
  ],
  providers: [PostService, SidenavServicesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
