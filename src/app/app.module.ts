import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TablaturaCardComponent } from './components/tablatura-card/tablatura-card.component';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RecorderComponent } from './components/recorder/recorder.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { MetronomoCardComponent } from './components/metronomo-card/metronomo-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CalibrarComponentComponent } from './components/calibrar-component/calibrar-component.component';
import { HomeComponent } from './components/home/home.component';
import { TablaturaService } from './services/tablatura.service';
import { NotaComponent } from './components/nota/nota.component';
import { AudioSteamService } from './services/audio-steam.service';
import { MetronomoAfinadorWrapperComponent } from './metronomo-afinador-wrapper/metronomo-afinador-wrapper.component';
import { AboutModalComponent } from './components/about-modal/about-modal.component';
import { InformacoesNotaComponent } from './informacoes-nota/informacoes-nota.component';
import { SalvarAudioComponent } from './salvar-audio/salvar-audio.component';



const appRoutes: Routes = [
  { path: 'testeAudioAnalyzer', component: RecorderComponent},
  { path: 'calibrar', component: CalibrarComponentComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TablaturaCardComponent,
    SidenavComponent,
    SettingsModalComponent,
    MetronomoCardComponent,
    CalibrarComponentComponent,
    HomeComponent,
    RecorderComponent,
    NotaComponent,
    MetronomoAfinadorWrapperComponent,
    AboutModalComponent,
    InformacoesNotaComponent,
    SalvarAudioComponent,
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  providers: [TablaturaService, AudioSteamService],
  bootstrap: [AppComponent],
  entryComponents: [
    SettingsModalComponent,
    AboutModalComponent,
    InformacoesNotaComponent,
    SalvarAudioComponent
  ]
})
export class AppModule { }
