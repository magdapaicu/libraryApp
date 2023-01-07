import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksDisplayComponent } from './components/book/books-display/books-display.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { BookComponent } from './components/book/book.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LoginComponent } from './components/login/login.component';
import { MainContentComponent } from './components/contacts/main-content/main-content.component';
import { LocatieComponent } from './locatie/locatie.component';
import { FPasswordComponent } from './f-password/f-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/app-register', pathMatch: 'full' },
  {
    path: 'app-login',
    component: LoginComponent,
  },
  {
    path: 'users-componenUsers',
    component: UsersComponent,
  },
  {
    path: 'Users',
    component: UsersComponent,
  },
  {
    path: 'Users/UserDetails/:id',
    component: UserDetailsComponent,
  },
  {
    path: 'app-book',
    component: BookComponent,
  },
  {
    path: 'book-display-component',
    component: BooksDisplayComponent,
  },
  {
    path: 'app-register',
    component: RegisterComponent,
  },
  {
    path: 'app-contacts',
    component: ContactsComponent,
    children: [
      {
        path: ':id',
        component: MainContentComponent,
      },
      {
        path: '',
        component: MainContentComponent,
      },
    ],
  },
  {
    path: 'Contacts',
    component: LocatieComponent,
  },
  {
    path: 'app-book-display',
    component: BooksDisplayComponent,
  },
  {
    path: 'app-f-password',
    component: FPasswordComponent,
  },
  // {
  //   path: 'main-container',
  //   loadChildren:()=>import(''),
  // },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
