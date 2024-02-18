import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.description = "This is a Beautiful Flower. NICE!";
    this.link = "https://hax.psu.edu";
    this.btntext = "Detail";
    this.fancy = false;
    this.image = "https://www.thespruce.com/thmb/UvUq2d5afwavMHdm7PcUNtbAowQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-most-beautiful-garden-flowers-4690011-7-f6963a3136ee47dba5f85d786b31ac7d.jpg";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      :root, html, body {
        font-size: 16px; 
        --basic-color: beige;
      }

      :host([fancy]) {
        display: block;
        background-color: pink;
        border: 2px #a0fa05;
        box-shadow: 10px 5px 5px red;
      }

      a {
        text-decoration: none;
      }

      .card {
        background-color: beige;
        padding: 10px;
        margin: 64px;
        max-width: 399px;
        text-align: center;
        border: 1px solid black;
      }

      .cardImage {
        width: 80%;
        height: auto;
        padding: 16x 32px 32px 32px;
      }

      .cardText {
        text-align: justify;
        text-justify: inter-word;
        margin: 32px 16px 48px 32px;
        font-size: Verdana;
      }

      .button {
        background-color: pink;
        padding: 16px 16px 16px 16px;
        font-size: 16px;
        display: none;
        border-radius: 10%;
      }

      .cardTitle {
        font: Verdana;
        font-size: 32px;
      } 

      @media (max-width: 500px)
      {
        .card {
          display: incline;
        }
      } 

    
      .btn {
          background-color: pink;
          padding: 4px;
          font-size: 16px;
          display: inline; 
      }

      #cardlist {
        display: flex;
        justify-content: stretch;
      }

      .change-color {
        background-color: #95EDF0;
        color:#000;
      }

      .reset-color {
        background-color: beige;
      }

      details summary {
        text-align: left;
        font-size: 20px;
        padding: 8px 0;
      }

      details[open] summary {
        font-weight: bold;
      }
  
      details div {
        border: 2px solid black;
        text-align: left;
        padding: 8px;
        height: 70px;
        overflow: auto;
      }
    `;}

  // put this anywhere on the MyCard class; just above render() is probably good
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
  
  <div>${this.title}</div>
  <div id="cardlist">
    <div class="card">
      <p class="cardTitle"> 
        ${this.title}
      </p>

      <meme-maker 
        alt="Cat stalking a small toy" 
        image-url=${this.image}
        top-text=${this.title} 
        bottom-text="it is what it is"
        style="200px"
        font-size="4px">
      </meme-maker>

    <h3>${this.title}</h3>

    <details ?open="${this.fancy}" @toggle="${this.openChanged}">
      <summary>Description</summary>
      <div>
        <slot>${this.description}</slot>
      </div>
    </details>
    
    <br><br>

  <br>
  
    <a href=${this.link} target="_blank">
      <button class = "btn"> ${this.btntext} </button>
    </a>
  
  </div>
</div>`;}

  static get properties() {
    return {
      title: { type: String, reflect: true },
      description: { type: String },
      fancy: { type: Boolean, reflect: true },
      image: { type: String, reflect: true },
      link: { type: String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);

