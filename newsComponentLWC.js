import { LightningElement, track } from 'lwc';
// this is the JavaScript controller for the LWC, no markup
// import our Apex controller
// import retrieveNews from "@salesforce/apex/newsController.retrieveNews";
import retrieveNews from "@salesforce/apex/newsController.retrieveNews";

export default class NewsComponentLWC extends LightningElement {
    
    @track result = []
    // call method from LWC to fetch data
    connectedCallback() {
        // call fetchNews method created below
        this.fetchNews();
    }
    fetchNews() {
        // call retrieveNews
        // fetchNews method returns a promise with either a response or an error    
        retrieveNews().then(response =>{
            console.log(response);
            this.formatNewsData(response.articles)
        }).catch(error => {
            console.error(error);
        })
    }
    formatNewsData(res) {
        this.result = res.map((item, index)=>{
            let id = `new_${index+1}`;
            let name = item.source.name;
            return {...item, id:id, name:name};
        })
    }
}