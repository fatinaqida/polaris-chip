import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class project1 extends DDD {

    static get tag() {
        return 'project-1';
      }
    
      constructor() {
        super();
        this.input = "";
        this.inputcount = 5;
        this.opened = true;
        this.closed = (localStorage.getItem("close") == "true"? true : false);
        this.number = 5;
        this.party = ["spm6834"];
      }

    static get styles () {
        return css`

          :host {
            --basic-color: #7ada7a;
            --text-color: black;
            display: flex;
            color: var(--text-color);
            background: var(--basic-color);
            margin: auto;
            font-size: 14px; 
            font-family: Arial, sans-serif;
            background-clip: padding-box;
            -webkit-text-size-adjust: 100%;
            width: 590px;
            text-align: center;
            height: 250px;
          }

          .btnsave {
            display: inline-block;
            background-color: #e01c1c;
            box-shadow: 0 5px #666;
            width: 100px;
            text-align: center;
            cursor: pointer; 
            border-radius: 10px;
            box-shadow: 0 5px #6b6a6a;
            transition: background-color 0.3s ease;
            margin: auto;
            margin-top: 10px;
          }

        .btnsave:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        } 

        .btnsave:hover {
            display: inline-block;
            background-color: #5BA0ED;
        }

        .container {
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 100%;
        }

        .btnadd,
        .btnremove {
          display: inline-block;
          background-color: #e01c1c;
          box-shadow: 0 5px #666;
          padding: 4px 4px;
          width: 100px;
          text-align: center;
          cursor: pointer; 
          border-radius: 10px;
          box-shadow: 0 5px #6b6a6a;
          transition: background-color 0.3s ease;
          margin: 0 auto;
          margin-top: 10px;
          margin-bottom: 20px;
        }

    `}

    render() {
        return html` <confetti-container id="confetti">
          <div id="container">
            
            <input type="text" class="input" name="fname">
            <button class="btnadd">Add</button>
            <button class="btnremove">Remove</button>
            
            <div>
              <rpg-character walking seed=${this.party[0]}></rpg-character>
              <rpg-character walking seed=${this.party[1]}></rpg-character>
              <rpg-character walking seed=${this.party[2]}></rpg-character>
              <rpg-character walking seed=${this.party[3]}></rpg-character>
              <rpg-character walking seed=${this.party[4]}></rpg-character>
            </div>
            <button class="btnsave" @click="${this.makeItRain}" ?disabled="${this.inputcount < this.number}">Save</button>
          </div>        
        </confetti-container>  
    `;}

    addItem(){
      input = document.querySelector(".search-input").value;
      this.item = {...this.item, item}
    }

    toggleButton()
    {
      this.closed = !this.closed;
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
        input: { type: String, reflect: true },
        closed: { type: Boolean, reflect: true },
        opened: { type: Boolean, reflect: true },
        number: { type: String, reflect: true }, 
        inputcount: { type: String, reflect: true },
        party: { type: String, reflect: true }
    };
  }
}

globalThis.customElements.define(project1.tag, project1);