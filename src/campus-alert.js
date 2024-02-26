import { LitElement, html, css } from 'lit';

export class campusalert extends LitElement {

    static get tag() {
        return 'campus-alert';
      }
    
      constructor() {
        super();
        this.date = "NOVEMBER 17, 2023 12:00 AM";
        this.text = "Occaecat laboris incididunt ea labore quis in qui commodo velit cillum et commodo. Dolore consectetur eu eu reprehenderit anim fugiat in nostrud anim magna enim nisi. Mollit est incididunt sint aliqua duis. Deserunt ut velit deserunt fugiat eiusmod. Do incididunt laborum aliqua cupidatat adipisicing fugiat reprehenderit cillum id. Minim minim elit occaecat id velit fugiat ea. Aliqua excepteur ea excepteur cillum esse voluptate non elit laboris laboris esse est sunt incididunt ullamco. PENN STATE NEWS";
    }

    static get styles () {
        return css`
        
      :host {
        /*
        --basic-color: #fcb900;
        --text-color: black;
        display: inline-flex;
        color: var(--text-color);
        background: var(--basic-color);
        margin: 0 auto;
        font-size: 14px; 
        background-clip: padding-box;
        -webkit-text-size-adjust: 100%;
        vertical-align: baseline;
        //background: transparent;
        */

        height: 250px;
        display: flex;
      }

        .cardcontainer {
          display: flex;
          border-radius: 50px;
          //padding: 4px;
          margin: 0 auto;
          width: 100%;
          text-align: justify;
          flex: 1;
        }

        .leftcontainer {
          //flex: 1;
          width: 50%; 
          height: 250px; 
          background-color: #ff6900; 
          display: flex;
        }

        .textcontainer {
          //flex: 1;
          text-align: justify;
          text-justify: inter-word;
          margin: 0;
          font-size: 14px;
          font-family: Roboto;
          background-color: #fcb900;
          padding: 48px ;
          display: flex;
        }

        .rightcontainer {
          //flex: 1;
          width: 50%; 
          height: 250px; 
          background-color: #ff6900; 
          display: flex;
        }
    `}

    openChanged(e) {
        console.log(e.newState);
        if (e.newState === "open") {
            this.fancy = true;
        }
        else {
            this.fancy = false;
        }
    }

    render() {

        return html` 
        
        <div class="cardcontainer">
          <h1 class="leftcontainer">
          </h1>

          <h2 class="textcontainer">
            ${this.text}
          </h2>

          <h3 class="rightcontainer">
          </h3>
        </div>
     
    `;}

    static get properties() {
        return {
        date: { type: String, reflect: true },
        text: { type: String, reflect: true }
    };
  }
}

globalThis.customElements.define(campusalert.tag, campusalert);