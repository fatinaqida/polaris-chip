import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class project1 extends DDD {

    static get tag() {
        return 'project-1';
      }
    
      constructor() {
        super();
        //this.input = "";
        this.inputcount = 5;
        this.number = 5;
        this.party = [];
        this.userName = null;
      }

    static get styles () {
        return css`

          /**use var(ddd) for the height, width */
          :host {
            --basic-color: black;
            --text-color: #cfa0f8;
            display: flex;
            color: var(--text-color);
            background: var(--basic-color);
            margin: 0 auto;
            font-size: 14px; 
            font-family: Arial, sans-serif;
            background-clip: padding-box;
            -webkit-text-size-adjust: 100%;
            width: 100%;
            text-align: center;
            height: var(--dd-spacing, 600px);
          }

          .btnsave {
            display: block;
            background-color: #e01c1c;
            box-shadow: 0 5px #666;
            width: 100px;
            text-align: center;
            cursor: pointer; 
            border-radius: 10px;
            box-shadow: 0 5px #6b6a6a;
            transition: background-color 0.3s ease;
            margin: auto;
          }

        .btnsave:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        } 

        .btnsave:hover {
            display: inline-block;
            background-color: #5BA0ED;
        }

        #container {
            text-align: center;
            display: relative;
            text-align: center;
            justify-content: center;
            width: 1200px;
            height: var(--dd-spacing, 500px);
            margin: 0 auto;
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

        .userName {
          width: 100px;
        }

        .characterName {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: clip;
          width: 100%;
        }

        .input-wrapper {
          display: block;
          text-align: center;
          margin: 0 auto;
        }

        .rpg-selector {
          display: inline-flex;
          margin: var(---dd-spacing-5);
          padding: var(---ddd-spacing-1);
          width: 250px;
        }

        .rpg-character {
            opacity: 0.4;
        }

        .rpg {
          display: inline-block;
        }
    `}

    /**there's an easier way for the party */
    render() {
        return html` <confetti-container id="confetti">
          <h1>Haxcms-Party-UI</h1>
          <div id="container">
            
            <div class="input-wrapper">
              <input type="text" id="inputbox" placeholder="search username">
              <button class="btnadd" @click="${this.addItem}" >Add</button>
              <button class="btnremove" @click="${this.removeitem}" >Remove</button>
            </div>
            
            <div class="rpg">
              ${this.party.map(user => html` 
              <div class="rpg-selector">
                <rpg-character class="character" seed="${user}" walking></rpg-character>
                <p class="characterName">
                  ${user}
                </p>
              </div>
              `)}
            </div>
            <button class="btnsave" @click="${this.makeItRain}" ?disabled="${this.inputcount < this.number}">Save</button>

          </div>        
        </confetti-container>  
    `;}

    /** add lowercase function*/

    addItem(){
      const input = this.shadowRoot.getElementById('inputbox');
      const username = input.value.trim();

      if (username !== '' && this.party.length < this.number) {
        if (/^[a-z0-9]{1,10}$/.test(username))
        {
          if(!this.party.includes(username))
          {
            this.party.push(username);
            this.value = '';
            this.requestUpdate();
          }

          else {
            window.alert("Username is already in the party.");
          }
        }
        
        else {
          window.alert("Username must be lowercase and numbers only.");
        }
      }
    }

    makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
    
  static get properties() {
        return {
          ...super.properties,
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