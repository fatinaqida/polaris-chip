import { LitElement, html, css } from 'lit';

export class campusalert extends LitElement {

    static get tag() {
        return 'campus-alert';
      }
    
      constructor() {
        super();
        this.date = "NOVEMBER 17, 2023 12:00 AM";
        this.title = "Alert";
        this.sticky = false;
        this.opened = true;
        this.link = "https://www.psu.edu/news/";
        this.text = "Occaecat laboris incididunt ea labore quis in qui commodo velit cillum et commodo. Dolore consectetur eu eu reprehenderit anim fugiat in nostrud anim magna enim nisi. Mollit est incididunt sint aliqua duis. Deserunt ut velit deserunt fugiat eiusmod. Do incididunt laborum aliqua cupidatat adipisicing fugiat reprehenderit cillum id. Minim minim elit occaecat id velit fugiat ea. Aliqua excepteur ea excepteur cillum esse voluptate non elit laboris laboris esse est sunt incididunt ullamco. ";
      }

    static get styles () {
        return css`

          :host {
            --basic-color: #fcb900;
            --text-color: black;
            --foreground-text-color: #000321;
            --background-color: #ffffff;
            display: flex;
            color: var(--text-color);
            background: var(--basic-color);
            margin: 0 auto;
            font-size: 14px; 
            font-family: Arial, sans-serif;
            background-clip: padding-box;
            -webkit-text-size-adjust: 100%;
            vertical-align: baseline;
            height: 250px;
          }

          :host([sticky]) {
            position: sticky;
            top: 0;
            opacity: 1.0;
          }

          :host([status="alert"]) {
            --basic-color: #bf3026;
            --background-color: #000000;
            --foreground-text-color: #ffffff;
            --background-text-color: #ffffff;
          }

          :host([status="notice"]) {
            --basic-color: lightblue;
            --background-color: blue;
            --foreground-text-color: #ffffff;
            --background-text-color: #ffffff;
          }

          .datecontainer {
            width: 300px;
            transform: skew(20deg);
            background-color: #ff6900;
            padding: 100px 0px;
            text-align: justify;
            display: inline-flex;
            margin-left: -150px;
          }

          .datecard {
            margin: auto;
            width: 80px;
            transform: skew(-20deg);
            color: var(--background-color);
            margin-left: 150px;
            text-align: center;
            font-weight: bold;
          }

          .alert-icon {
            max-width: 46px;
            max-height: 46px;
            padding: 20px 38px 20px 12px;
            color: var(--foreground-text-color);
            stroke: var(--foreground-text-color);
          }   

          .cardcontainer {
            max-height: 258px;
            display: inline-flex;
            padding: 0px 62px 0px 62px;
            justify-content: space-between;
          }

          .content {
            display: inline-flex;
            position: relative;
          }

          .box {
            display: inline-flex;
            position: relative;
          }

          .box::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 1023px;
            height: 100%;
            max-height: 258px;
            transform: skew(20deg);
            background: var(--foreground-color);
          }

          .textcontainer {
            margin: auto;
            width: 1200px;
            max-width: 1050px;
            min-width: 150px;
            max-height: 180px;
            font-size: 18px;
            letter-spacing: 0.5px;
            line-height: 20px;
            color: var(--foreground-text-color);
            text-size-adjust: 100%;
            font-weight: bold;
            font-style: italic;
          }

          .closebutton {
            padding: 16px 32px 32px 32px;
            //float: right;
            width: 300px;
            transform: skew(20deg);
            background-color: #ff6900;
            padding: 16px;
            text-align: center;
            display: inline-flex;
            margin-right: -500px;
          }

          .closebuttoncontainer {
            border: none;
            width: 80px;
            color: var(--background-color);
            font-size: 16px;
            background-color: transparent;
            display: inline-flex;
            transform: skew(-20deg);
            font-weight: bold;
            margin-right: 200px;
          }
    `}


    toggleAlert() {
      this.opened =!this.opened;
      localStorage.setItem("campus-alert-opened-state", this.opened);
    }

    render() {

        return html` 
        
        <div class="cardcontainer">
          <div class="datecontainer">
            <div class="datecard">
              ${this.date}
            </div>
          </div>
          
          <div class="box">
            <div class="content">
              <!-- Exclamation Mark-->
              <svg
              class="alert-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 82 82"
            >
              <g transform="translate(-350.099 -428.714)">
                <g
                  transform="translate(350.099 428.714)"
                  fill="none"
                  stroke-width="6"
                >
                  <circle cx="41" cy="41" r="41" stroke="none"></circle>
                  <circle cx="41" cy="41" r="38" fill="none"></circle>
                </g>
                <g transform="translate(384.41 448.566)">
                  <rect
                    width="10.381"
                    height="7.786"
                    transform="translate(0.919 34.336)"
                  ></rect>
                  <path
                    d="M6520.672,2327.554h-5.854l-3.21-23.669V2299.2h11.81v4.681Z"
                    transform="translate(-6511.607 -2299.203)"
                  ></path>
                </g>
              </g>
            </svg>

            <div class="textcontainer">
              <slot>
                ${this.text}
              </slot>
            </div>
          </div>

          <div class="closebutton">
            <button class="closebuttoncontainer" @click=${this.toggleButton}>✕CLOSE</button>
          </div>
          </div>
          </div>

          
    `;}

    static get properties() {
        return {
        date: { type: String, reflect: true },
        text: { type: String, reflect: true }, 
        sticky: { type: Boolean, reflect: true }, 
        opened: { type: Boolean, reflect: true }
    };
  }
}

globalThis.customElements.define(campusalert.tag, campusalert);