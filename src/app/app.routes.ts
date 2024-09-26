import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProjectListPageComponent } from './components/project-list-page/project-list-page.component';

export const routes: Routes = [
    { path: '', component: MainComponent},
    { path: 'home', component: MainComponent},
    { path: 'projets', component: ProjectListPageComponent},
    { path: '**', component: NotfoundComponent}
];
