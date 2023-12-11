import { LightningElement, track, wire } from 'lwc';
import getPie from '@salesforce/apex/ClientsSeg.getPie';
import chartjs from '@salesforce/resourceUrl/chartJs';
import { loadScript } from 'c/resourceLoader';



export default class libsChartjs extends LightningElement {
    error;
    chart;
    @track ids = ['005Qy0000014MpKIAU'];
    // ids = [];
    @track labs;
    @track valeurs;
    // dons = JSON.stringify(donnees);
    // console.log(dons);
    chartInitialized = false;
    
    @wire(getPie, { param: '$ids' })
    donnees;

    // ids = ['005Qy0000014MpKIAU'];
    // donnees = getPie(ids);
    
    
    
    async renderedCallback() {
        if (this.chartInitialized) {
            return;
        }
        this.chartInitialized = true;
        
        // Charger le script Chart.js
        await  loadScript(this, chartjs)
        .then(() => {
            // Mettre à jour le graphique une fois le script chargé
            this.initialiserGraphique();
        })
        .catch(error => {
            this.error = error;
            console.error('Erreur lors du chargement du script Chart.js', error);
        });
    }
    
    initialiserGraphique() {
        // donnees = this.donnees;
        console.log(donnees.length());
        this.labs = this.donnees.data.map(i => i.Segment__c);
        this.valeurs = this.donnees.data.map(i => i.val);
        console.log('this.labs : ', JSON.stringify(this.labs));
        


            if (!this.donnees.data) {
                return;
            }
            
            console.log(labs);
            console.log(valeurs);

        // const ctx = this.template.querySelector('canvas').getContext('2d');

        const canvas = document.createElement('canvas');
        this.template.querySelector('div.chart').appendChild(canvas);
        const ctx = canvas.getContext('2d');


        this.chart = new window.Chart(ctx, {
            type: 'doughnut',
            data:{
            datasets: [{
                data: valeurs,
                backgroundColor:  [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(51, 255, 255)',
                    'rgb(0, 204, 102)',
                    'rgb(131, 51, 255)'
                ],
                label: 'Nombre de clients par segment'
                }
            ],
                labels: labs,
            },
            options: {
                responsive: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
          }
        }
        )
    }
}
