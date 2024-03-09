import { LitElement, html, css } from 'lit';

export class campusalert extends LitElement {

    static get tag() {
        return 'campus-alert';
      }
    
      constructor() {
        super();
        this.notification = "warning";
        this.date = "NOVEMBER 17, 2023 12:00 AM";
        this.title = "Alert";
        this.sticky = false;
        this.opened = true;
        this.link = "https://www.psu.edu/news/";
        this.text = "Hello There";
        this.closed = (localStorage.getItem("close") == "true"? true : false);
      }

    static get styles () {
        return css`

          :host {
            --basic-color: #ffd100;
            --text-color: black;
            --foreground-text-color: #000321;
            --background-color: #ffffff;
            --side-color: #bf8226;
            --open-height: 250px;
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
            z-index: 1;
          }

          :host([notification="alert"]) {
            --basic-color: #bf3026;
            --background-color: #fffffff4;
            --foreground-text-color: #000000;
            --background-text-color: #000000;
            --side-color: black;
          }

          :host([notification="notice"]) {
            --basic-color: #5BA0ED;
            --background-color: #ffffff;
            --foreground-text-color: #000000;
            --background-text-color: #000000;
            --side-color: #f17612;
          }

          :host([notification="spring break"]) {
            --basic-color: #ed5ba4;
            --background-color: #ffffff;
            --foreground-text-color: #000000;
            --background-text-color: #000000;
            --side-color: #7a1469;
          }

          :host([closed]) {
            height: 50px;
            transition: all 200ms 200ms linear;
            background: var(--basic-color);
          }

          :host([sticky]) {
            position: sticky;
            top: 0;
          }

          :host(:not([closed])) .content::before {
            display: inline-flex;
            content:" ";
            width: 0;
            height: 0;
            position: absolute;
            bottom: 2rem;
            left: -0.4rem;
            border-left: 35px solid transparent;
            border-right: 0px solid transparent;
            border-bottom: 30px solid var(--basic-color);
            transform: skew(20deg);
          }

          .datecontainer {
            width: 300px;
            transform: skew(20deg);
            background-color: var(--side-color);
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
            max-width: 48px;
            max-height: 48px;
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
            background-color: var(--side-color);
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

    render() {
        const message = this.closed ? "Campus Alert" : this.text;
        const datetime = this.closed ? "" : this.date;
        return html` 
        
        <div class="cardcontainer">
          <div class="datecontainer">
            <div class="datecard">
              ${datetime}
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
                ${message}
              </slot>
            </div>
          </div>

          <div class="closebutton">
            <button class="closebuttoncontainer" @click=${this.toggleButton}>✕CLOSE</button>
          </div>
          </div>
          </div>

          
    `;}

    updated(changedProperties) {
      if (changedProperties.has("closed"))
      {
        if (this.closed)
        {
          localStorage.setItem("close", (this.closed).toString());
        }

        else
        {
          localStorage.removeItem("close");
        }
      }
    }

    toggleButton()
    {
      this.closed = !this.closed;
    }

    static get properties() {
        return {
        date: { type: String, reflect: true },
        text: { type: String, reflect: true }, 
        sticky: { type: Boolean, reflect: true }, 
        opened: { type: Boolean, reflect: true }, 
        closed: { type: Boolean, reflect: true }, 
        link: { type: String, reflect: true }
    };
  }
}

globalThis.customElements.define(campusalert.tag, campusalert);