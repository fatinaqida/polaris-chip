import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
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

      .btn {
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

      @media (min-width: 500px) and (max-width: 800px)
      {
        .btn {
          background-color: pink;
          padding: 4px;
          font-size: 16px;
          display: inline; 
        }
      }

      #cardlist {
        display: flex;
        justify-content: stretch;
      }

      .change-color {
        background-color: #95EDF0;
      }

      .reset-color {
        background-color: beige;
      }
    `;}

  render() {
    return html`
      <div>${this.title}</div>
      <div class="control-wrapper">
    <button class="duplicate">Clone Card</button>
    <button id="changetitle">Change Title</button>
    <button id="changeimage">Change Image</button>
    <button id="changebg">Change background</button>
    <button id="deletecard">Delete Card</button>
    <button id="resetcard">Reset Card</button>
  </div>

  <div id="cardlist">
    <div class="card">
      <p class="cardTitle"> 
        Ducati Panigale V2
      </p>

    <img class="cardImage" src="https://cdn.motor1.com/images/mgl/BXQ9kZ/s1/2024-ducati-panigale-v2---black-on-black---studio---right-side.jpg" alt="Ducati Panigale V2">
  
    <br><br>
  
    <center>
      <d class="cardText">
        A 955 cc Superquadro V-twin engine sport bike, Ducati Panigale V2, is one of the fastest motorbike model. It has a top speed of 186 mph with 155 horsepower which makes it an ourstanding sport bike with unique features and performance.
      
      </d>
    </center>
  
  <br>
  
    <a href="https://hax.psu.edu">
      <button class="btn">Details</button>
    </a>
  
  </div>
</div>`;}

  static get properties() {
    return {
      title: { type: String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
