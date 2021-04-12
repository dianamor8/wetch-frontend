import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faPhoneAlt=faPhoneAlt;
  faEnvelope=faEnvelope;
  

  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebook, faTwitter, faInstagram, faEnvelope);
    
  } 
  

  ngOnInit(): void {
  }

}
