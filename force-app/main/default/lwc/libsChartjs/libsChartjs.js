import { LightningElement, api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/chartJs';
import { loadScript } from 'lightning/platformResourceLoader';

export default class LibsChartjs extends LightningElement {
    error;
    chart;
    chartInitialized = false;
    //   @api
    // get labs() {
    //     return this._labs;
    // }
    // set labs(value) {
    //     this._labs = value;
    //     this.updateChart();
    // }
    
    // @api
    // get valeurs() {
    //     return this._valeurs;
    // }
    // set valeurs(value) {
    //     this._valeurs = value;
    //     this.updateChart();
    // }
  
     labs=["Super Elite", "Elite", "VVIC", "VIC", "VGC", "GC", "Prospect", "Inactive"];
    long=8;
       valeurs=[15, 22, 16, 19, 9, 13, 12, 14];
    
    // backgroundColors = Array.from({ length: this.labs.length }, () => this.generateRandomColor());


    config = {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: this.valeurs,
                    // backgroundColor: Array.from({ length: this.long }, () => this.generateRandomColor()),
                    backgroundColor: Array.from({ length: 8 }, () => this.generateRandomColor()),
                    // backgroundColor:  [
                    //     'rgb(255, 99, 132)',
                    //     'rgb(255, 159, 64)',
                    //     'rgb(255, 205, 86)',
                    //     'rgb(75, 192, 192)',
                    //     'rgb(54, 162, 235)'
                    // ],
                    label: 'Dataset 1'
                }
            ],
            labels: this.labs
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'left'
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };
    generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
async connectedCallback() {
    // async renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;

        try {
            await loadScript(this, chartjs);
            const canvas = document.createElement('canvas');
            
            canvas.width = 300; // Remplacez par la largeur souhaitée
            canvas.height = 200; // Remplacez par la hauteur souhaitée
            // this.template.querySelector('div.chart').appendChild(canvas);
            const chartContainer = this.template.querySelector('div.chart');
// Définir la largeur et la hauteur du canvas pour le rendre plus petit
chartContainer.width = 350; // Remplacez par la largeur souhaitée
chartContainer.height = 280; // Remplacez par la hauteur souhaitée
chartContainer.appendChild(canvas);


            const ctx = canvas.getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
        } catch (error) {
            this.error = error;
        }
    }
    //    disconnectedCallback() {
    //     if (this.chart) {
    //         this.chart.destroy();
    //     }
    // }
// }
  
    
    // async connectedCallback() {
    //     this.res1 = await getPie({ ownerIds: this.ids });
    //     this.valeurs = await this.res1.map(item => item.val);
    //     // this.totalvaleurs = await this.valeurs.reduce((a, b) => a + b, 0).toString();
    //     this.totalvaleurs = await this.valeurs.reduce((a, b) => a + b, 0);
    //     this.labs = await this.res1.map(item => item.Segment__c +' ('+ item.val + ' / ' + this.totalvaleurs + ')');
    // }
    updateChart() {
        if (this.chart) {
            // Mettez à jour le graphique avec les nouvelles données
            this.chart.data.labels = this.labs;
            this.chart.data.datasets[0].data = this.valeurs;
            this.chart.update();
        }
    }
    
}

    // renderedCallback() {
    //     if (this.chartInitialized) {
    //         return;
    //     }
    //     this.chartInitialized = true;
    
    //     if (this.labs && this.valeurs) {
    //         loadScript(this, chartjs)
    //             .then(() => {
    //                 this.initialiserGraphique();
    //             })
    //             .catch(error => {
    //                 this.error = error;
    //                 console.error('Erreur lors du chargement du script Chart.js', error);
    //             });
    //     }
    // }

 
    
    



//     initialiserGraphique() {
//         // alert(this.totalvaleurs);
//         const canvas = document.createElement('canvas');
//         this.template.querySelector('div.chart').appendChild(canvas);
//         const ctx = canvas.getContext('2d');

//         const backgroundColors = Array.from({ length: this.labs.length }, () => this.generateRandomColor());

//         this.chart = new window.Chart(ctx, {
//             type: 'doughnut',
//             data: {
//                 datasets: [{
//                     data: this.valeurs,
//                     backgroundColor: backgroundColors,
//                     label: 'Nombre de clients par segment'
//                 }],
//                 labels: this.labs,
//             },
//             options: {
//                 responsive: false,
//                 plugins: {
//                     legend: {
//                         position: 'center'
//                     },
//                     doughnutlabel: {
//                         labels: [
//                             {
//                                 text: "woaaaaw",
//                                 font: {
//                                     size: '30'
//                                 }
//                             }
//                         ]
//                     }
//                 },
//                 animation: {
//                     animateScale: true,
//                     animateRotate: true
//                 }
//             }
//         });
//     }
// }
                // text: this.valeurs.reduce((a, b) => a + b, 0).toString(),
                // text: this.totalvaleurs,
