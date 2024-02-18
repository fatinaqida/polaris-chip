import { LitElement, html, css } from 'lit';

export class counterapp extends LitElement {

  static get tag() {
    return 'counter-app';
  }

  constructor() {
    super();
    this.number = 20;
    this.min = 18;
    this.max = 21;
}

  static get styles() {

    return css`
      :host {
        --basic-color: black;
        --text-color: #EB20DC;
        display: inline-flex;
        color: var(--text-color);
        background: var(--basic-color);
        border-radius: 50px;
        margin: 32px;
        font-size: 16px; 
        border: 10px dotted #ff9eef;
        background-clip: padding-box;
      }
      /*
      :root, html, body {
        font-size: 16px; 
        --basic-color: beige;
      }
      */

      :host([number="18"]) {
        color: #ff7d31;
        background: cyan;
        border: 10px dotted #edcb5b;
        background-clip: padding-box;
      }

      :host([number="21"]) {
        color: #9900ff;
        background: yellow;
        border: 10px dotted red;
        background-clip: padding-box;
      }

      .card {
        //background-color: yellow;
        display: inline-block;
        border-radius: 50px;
        padding: 16px 16px 16px 16px;
        margin: 32px;
        width: 300px;
        text-align: center;
        //border: 10px dotted #e9692e;
        //background-clip: padding-box;
      }

      .countnum {
        font: Verdana;
        font-size: 32px;
      }

      #container {
        text-align: center;
        display: inline-block;
      }

      .btnmin, .btnmax {
        display: inline-block;
        background-color: #e01ca5;
        box-shadow: 0 5px #666;
        padding: 16px 16px;
        width: 100px;
        text-align: center;
        cursor: pointer; 
        border-radius: 10px;
        box-shadow: 0 5px #6b6a6a;
        transition: background-color 0.3s ease;
      }

      /*
      .btnmin:active, .btnmax:active {
        display: inline-block;
        background-color: #D8AEF5;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
        
      }
      */

      .btnmin:disabled, .btnmax:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      .btnmin:hover, .btnmax:hover{
        display: inline-block;
        background-color: #5BA0ED;
      }
      
      
    `;}

  render() {
    /*
    var changetext;
    var changebg;

    if(this.number === this.min || this.number === this.max)
    {
      changetext = "#6FEC35";
      changebg = "#C8EC35";
    }
    */

    return html` <confetti-container id="confetti">

    <div id="counterCard">
      <div class=card>
        <div class="countnum">
          <h1 class="counter"> 
            ${this.number}
          </h1>
        </div>
        
        <br>

        <div id="container">
          <button class="btnmin" @click="${this.decrease}" ?disabled="${this.min === this.number}">-</button>
          <button class="btnmax" @click="${this.increase}" ?disabled="${this.max === this.number}">+</button>
        </div>
      </div>
    </div>
    </confetti-container>
  `;}

  

  increase()
  {
    if(this.number >= this.min && this.number < this.max)
    {
      this.number++;
    }
  }

  decrease()
  {
    if(this.number > this.min && this.number <= this.max)
    {
      this.number--;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('number')) {
      // do your testing of the value and make it rain by calling makeItRain
      if(this.number == 21)
      {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  static get properties() {
    return {
      number: { type: Number, reflect: true },
      btnmin: { type: Number, reflect: true },
      btnmax: { type: Number, reflect: true },
    };
  }

  
}

globalThis.customElements.define(counterapp.tag, counterapp);

