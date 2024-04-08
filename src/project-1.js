import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import { RpgCharacter } from "@lrnwebcomponents/rpg-character/rpg-character.js";

export class project1 extends DDD {

  static get tag() {
    return 'project-1';
  }

  constructor() {
    super();
    this.index = 0;
    this.userName = null;
    this.changed = false;
    this.saved = false;
    this.party =
      localStorage.getItem("party") != null
        ? localStorage.getItem("party").split(",")
        : [];
  }

  static get styles() {
    return css`

          :host {
            --basic-color: var(--ddd-theme-default-roarLight);
            --text-color: var(--ddd-theme-default-potentialMidnight);
            --basic-spacing: var(--ddd-spacing-2);
            --standard-spacing: var(--ddd-spacing-0);
            display: inline-flex;
            color: var(--text-color);
            background: var(--basic-color);
            margin: var(--standard-spacing) auto;
            font-size: var(--ddd-font-size-3xs);
            font-family: "Press Start 2P", system-ui;
            background-clip: padding-box;
            -webkit-text-size-adjust: 100%;
            width: 100%;
            text-align: center;
          }

          .header {
            font-family: "Press Start 2P", system-ui;
          }

          .btnsave {
            display: block;
            background-color: var(--ddd-theme-default-athertonViolet);
            box-shadow: 0 5px var(--ddd-theme-default-potential50);
            width: 100px;
            text-align: center;
            cursor: pointer; 
            border-radius: 10px;
            transition: background-color 0.3s ease;
            margin-top: var(--basic-spacing);
            margin: auto;
        }

        /** Container that wrap the card */
        #container {
          text-align: center;
          justify-content: center;
          width: 900px;
          height: var(--dd-spacing, 500px);
          margin: 50px;
          border: 3px solid var(--ddd-theme-default-potentialMidnight);
        }

        .btnadd,
        .btnremove {
          display: inline-block;
          background-color: var(--ddd-theme-default-athertonViolet);
          box-shadow: 0 5px var(--ddd-theme-default-potential50);
          padding: var(--dd-spacing-4);
          width: 100px;
          text-align: center;
          cursor: pointer; 
          border-radius: 10px;
          transition: background-color 0.3s ease;
          margin: var(--standard-spacing) auto;
          margin-top: var(--basic-spacing);
          margin-bottom: var(--basic-spacing);
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
          text-align: center;
          margin: var(--standard-spacing) auto;
        }

        .rpg-selector {
          margin: var(---dd-spacing-5);
          padding: var(---ddd-spacing-1);
          width: 250px;
          display:block;
        }

        .rpg-character {
          opacity: 0.4;
        }

        rpg-character:hover {
          border: 2px solid var(--ddd-theme-default-discoveryCoral);
        }

        .rpg-party {
          max-width: 90vw;
          justify-content: center;
          padding: var(--ddd-spacing-4);
          display: inline-flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        /**Adaptation to different screen size */
        @media (max-width: 500px) {
          #container {
            width: auto; 
            margin: 20px; 
            padding: 10px; 
          }

          .rpg-selector {
            width: 100%;
          }
        } 

        @media (max-width: 1000px) {
          #container {
            width: auto; 
            margin: 45px; 
            padding: 50px; 
          }

          .rpg-selector {
            width: 100%;
          }
        } 
    `}

  render() {
    return html`
      <audio id="coin-sound" src="media/coin sound.wav"></audio>
      <audio id="remove-sound" src="media/remove sound.mp3"></audio>
      <confetti-container id="confetti">
          <h1 class="header">Haxcms-Party-UI</h1>
          <div id="container">
            <!-- Block elements for text input, text button, and remove button -->
            <div class="input-wrapper">
              <input type="text" id="inputbox" placeholder="search username">
              <button class="btnadd" @click="${this.addItem}" >Add</button>
              <button class="btnremove" @click="${this.removeUser}" >Remove</button>
            </div>

            <!-- BLock element for rpg-characters -->
            <div class="rpg-party">
              ${this.party.map((user, index) => html` 
              <div class="rpg-selector" @click="${(e) => this.selectCharacter(e, index)}">
                <rpg-character class="character" seed="${user}" walking></rpg-character>

                <!-- Username of the rpg-character -->
                <p class="characterName">
                  ${user}
                </p>
              </div>
              `)}
            </div>

            <!-- Block element for the Save button -->
            <button class="btnsave" @click="${this.saveItem}" >Save</button>
          </div>        
        </confetti-container>  
    `;
  }

  /** Save button function*/
  saveItem() {
    if (this.party.length >= 1) {
      const myArray = this.party.toString();
      localStorage.setItem("party", myArray);
      this.saved = true;
      this.shadowRoot.getElementById("remove-sound").play();
      this.makeItRain();
    }
    else {
      window.alert("You need at least 1 party member to save.");
    }
  }

  /** To select the index closest to the rpg-character. Used in Remove button */
  selectCharacter(event, index) {
    const selectedCharacter = event.target.closest('.rpg-selector');
    const selectedUserName = selectedCharacter.querySelector('.characterName').innerText;

    // Find index of the selected user in the party array
    const selectedIndex = this.party.findIndex(user => user === selectedUserName);
    this.index = selectedIndex;
  }

  /** Remove button function */
  removeUser() {
    this.party.splice(this.index, 1);
    this.party = [...this.party];
    this.shadowRoot.getElementById("remove-sound").play();
  }

  /** To display the item in the array */
  displayItem(item) {
    if (this.saved) {
      return html`<rpg-character walking seed="${item}"></rpg-character>`;
    } else {
      return html`<rpg-character seed="${item}"></rpg-character>`;
    }
  }

  /** Add button function */
  addItem() {
    const input = this.shadowRoot.getElementById('inputbox');
    const username = input.value.trim();

    /** Restriction for the text input: only accept lowercase letters and numbers */
    /** Addition: Sqet alphabet limitation to 10 */
    if (username !== '') {
      if (/^[a-z0-9]{1,10}$/.test(username)) {
        if (!this.party.includes(username)) {
          this.party.push(username);
          this.value = '';
          this.requestUpdate();
        }

        else {
          window.alert("Username is already in the party.");
        }
      }

      else {
        window.alert("Username must be lowercase, numbers, and less than 10 characters only.");
      }
    }
  }

  /** To make confetti when Save button is on clicked*/
  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  toggleChanged() {
    this.changed = !this.changed;
  }

  static get properties() {
    return {
      ...super.properties,
      party: { type: Array, reflect: true },
      changed: { type: Boolean, reflect: true },
      saved: { type: Boolean, reflect: true },
      index: { type: Number, reflect: true }
    };
  }
}

globalThis.customElements.define(project1.tag, project1);