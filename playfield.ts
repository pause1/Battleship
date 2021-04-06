import { settings } from "./settings";
import { playerShips } from './main';

export class playfield {

    public playDiv = <HTMLElement>document.createElement("div");
    public mainArr: Array<any> = [];
    public type: string;

    constructor(className: string) {
        this.type = className;
        this.playDiv.className += "main "
        this.playDiv.className += this.type
        this.clicking = this.clicking.bind(this)
        for (let i: number = 0; i < settings.playgroundSize; i++) {
            let tempArr: Array<any> = [];
            for (let j: number = 0; j < settings.playgroundSize; j++)
                tempArr.push({
                    x: j,
                    y: i,
                    value: 0,
                    length: null,
                    orientation: settings.defOrientation,
                    shooted: false
                });
            this.mainArr.push(tempArr);
        }

        for (let i: number = 0; i < this.mainArr.length; i++) {
            let line = <HTMLElement>document.createElement("div");
            line.className = "lineCon"

            for (let j: number = 0; j < settings.playgroundSize; j++) {
                let element = <HTMLElement>document.createElement("div");
                element.className = "elem "
                element.className += className
                element.id = j + "," + i
                line.appendChild(element);
            }
            this.playDiv.appendChild(line)
        }

        document.body.appendChild(this.playDiv);
        this.rewrite()
    }

    public rewrite() {
        let type: string = this.type
        let reqArr: Array<any> = this.mainArr
        let lines = <HTMLCollectionOf<Element>>this.playDiv.getElementsByClassName("lineCon")
        Array.prototype.forEach.call(lines, function (el: HTMLElement, index: number) {
            el.style.fontFamily = "FontAwesome"
            var boxes = <HTMLCollectionOf<Element>>el.getElementsByClassName("elem")
            var index: number = index
            Array.prototype.forEach.call(boxes, function (el: HTMLElement, indexEl: number) {
                el.className = ''
                el.style.fontWeight = "900"
                el.style.opacity = "1"
                if (reqArr[index][indexEl].value == 1 && type == "player" && reqArr[index][indexEl].shooted == false)
                    el.className = "elem fas fa-ship " + type
                else if (reqArr[index][indexEl].value == 1 && reqArr[index][indexEl].shooted == true)
                    el.className = "elem fas fa-skull " + type
                else if (reqArr[index][indexEl].shooted == true)
                    el.className = "elem fas fa-bomb " + type
                /* 
                else if (reqArr[index][indexEl].value == 2 && type == "player")
                    el.className = "elem fas fa-times " + type  
                */
                else if (reqArr[index][indexEl].value == 3 && type == "player") {
                    el.className = "elem fas fa-ship " + type
                    el.style.opacity = "0.3"
                }
                else
                    el.className = "elem fas fa-stop " + type
            });
        });
    }

    clicking(event: any) {
        var arrPos: Array<any> = event.target.id.split(",")
        this.mainArr[arrPos[1]][arrPos[0]].shooted = true
        this.rewrite()
        this.removeEvent("A")
        playerShips.game.giveMove("AI")
    }

    addEvent() {
        let accessToThis = this
        let mainAI = <HTMLCollection>document.getElementsByClassName("main AI")
        let lines = <HTMLCollectionOf<Element>>mainAI[0].getElementsByClassName("lineCon")
        Array.prototype.forEach.call(lines, function (el: HTMLElement) {
            var boxes = <HTMLCollectionOf<Element>>el.getElementsByClassName("elem")
            Array.prototype.forEach.call(boxes, function (el: HTMLElement) {
                if (el.classList.contains("fa-stop")) {
                    el.style.cursor = "pointer"
                    el.onclick = accessToThis.clicking
                }
            })
        })
    }

    public removeEvent(string: string) {
        let mainAI = <HTMLCollection>document.getElementsByClassName("main AI")
        let lines = <HTMLCollectionOf<Element>>mainAI[0].getElementsByClassName("lineCon")
        Array.prototype.forEach.call(lines, function (el: HTMLElement, index: number) {
            var boxes = <HTMLCollectionOf<Element>>el.getElementsByClassName("elem")
            Array.prototype.forEach.call(boxes, function (el: HTMLElement, indexEl: number) {
                el.onclick = () => false;
                el.style.cursor = "default"
            })
        })
    }

}
