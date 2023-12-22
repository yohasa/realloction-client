import { LightningElement } from 'lwc';
import trailheadLogo from '@salesforce/resourceUrl/trailhead_logo';
import trailheadCharacters from '@salesforce/resourceUrl/trailhead_characters';

export default class MiscStaticResource extends LightningElement {
    // Expose the static resource URL for use in the template
    trailheadLogoUrl = trailheadLogo;

    // Expose URL of assets included inside an archive file
    einsteinUrl = trailheadCharacters + '/images/einstein.png';
    vO2isUrl = trailheadCharacters + '/images/VO2is.png';
    bvo2ISRUrl = trailheadCharacters + '/images/bvo2ISR.png';
    syntechproUrl = trailheadCharacters + '/images/syntechpro.png';
    cvO2BleuUrl = trailheadCharacters + '/images/cvO2Bleu.png';
}