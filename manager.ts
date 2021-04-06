
import { randomArr, randomNum } from "./generator";
import { getStyle, computerPlayfield, playerPlayfield, ai } from "./main";
import { settings } from "./settings";
import { log } from "./decorators";

export class Manager {
    firstPlayer = ''
    timeToStart = settings.waitTime
    retardedCounter = 0

    startGame() {
        let curtain = <HTMLDivElement>document.createElement("div")
        curtain.className = "curtain"
        curtain.style.width = window.innerWidth + "px"
        curtain.style.height = window.innerHeight + "px"
        let curtainBox = <HTMLDivElement>document.createElement("div")
        curtainBox.className = "curtainBox"
        curtainBox.textContent = "Game will start in: " + this.timeToStart

        let timer = setInterval(() => {
            this.timeToStart--
            curtainBox.textContent = "Game will start in: " + this.timeToStart
            if (this.timeToStart < 0) {
                clearInterval(timer)
                this.giveMove(this.firstPlayer)
                curtain.remove()
            }
        }, 1000)
        curtain.appendChild(curtainBox)
        document.body.appendChild(curtain)
        curtainBox.style.top = window.innerHeight / 2 - parseFloat(getStyle(curtainBox, "height")) / 2 - parseFloat(getStyle(curtainBox, "padding")) + "px"
        curtainBox.style.left = window.innerWidth / 2 - parseFloat(getStyle(curtainBox, "width")) / 2 - parseFloat(getStyle(curtainBox, "padding")) + "px"
        window.addEventListener("resize", this.resizeCurtain)
        this.firstPlayer = randomArr(["player", "AI"])

        let temp = <HTMLDivElement>document.getElementsByClassName("main player")[0]
        temp.onclick = () => {
            let curtain = <HTMLDivElement>document.createElement("div")
            curtain.className = "curtain"
            curtain.style.width = window.innerWidth + "px"
            curtain.style.height = window.innerHeight + "px"
            let curtainBox = <HTMLDivElement>document.createElement("div")
            curtainBox.className = "curtainBox"
            let curtainButton = <HTMLButtonElement>document.createElement("button")
            if (this.retardedCounter < 3) {
                curtainBox.innerHTML = "This is your playfield. To move click on the second one. When waiting for AI to move please, do not click here.<br/><br/>"
                curtainButton.textContent = "Understood"
                this.retardedCounter++
            }
            else {
                curtainBox.innerHTML = "Are you retarded or what?<br/><br/>"
                curtainButton.textContent = "Yes I do have autism"
            }


            curtainButton.onclick = () => curtain.remove()
            curtainBox.appendChild(curtainButton)
            curtain.appendChild(curtainBox)
            document.body.appendChild(curtain)
            curtainBox.style.top = window.innerHeight / 2 - parseFloat(getStyle(curtainBox, "height")) / 2 - parseFloat(getStyle(curtainBox, "padding")) + "px"
            curtainBox.style.left = window.innerWidth / 2 - parseFloat(getStyle(curtainBox, "width")) / 2 - parseFloat(getStyle(curtainBox, "padding")) + "px"
            curtainButton.style.marginLeft = parseFloat(getStyle(curtainBox, "width")) / 2 - parseFloat(getStyle(curtainButton, "width")) / 2 + "px"
        }
    }

    resizeCurtain() {
        try {
            let curtain = <HTMLDivElement>document.getElementsByClassName("curtain")[0]

            curtain.style.width = window.innerWidth + "px"
            curtain.style.height = window.innerHeight + "px"
            let curtainBox = <HTMLDivElement>document.getElementsByClassName("curtainBox")[0]

            curtainBox.style.top = window.innerHeight / 2 - parseFloat(getStyle(curtainBox, "height")) / 2 - parseFloat(getStyle(curtainBox, "padding")) + "px"
            curtainBox.style.left = window.innerWidth / 2 - parseFloat(getStyle(curtainBox, "width")) / 2 - parseFloat(getStyle(curtainBox, "padding")) + "px"
        }
        catch (err1) { }
    }
    @log
    giveMove(curPlayer: string) {
        function fill(aim: boolean, setMove: any[]) {
            if (playerPlayfield.mainArr[setMove[1]][setMove[0]].shooted == false) {
                if (aim && playerPlayfield.mainArr[setMove[1]][setMove[0]].value == 1) {
                    playerPlayfield.mainArr[setMove[1]][setMove[0]].shooted = true
                    playerPlayfield.rewrite()
                    accessToThis.giveMove("player")
                }
                else if (!aim && playerPlayfield.mainArr[setMove[1]][setMove[0]].value != 1) {
                    playerPlayfield.mainArr[setMove[1]][setMove[0]].shooted = true
                    playerPlayfield.rewrite()
                    accessToThis.giveMove("player")
                }
                else {
                    setMove = []
                    setMove.push(randomNum(0, settings.playgroundSize), randomNum(0, settings.playgroundSize))
                    fill(aim, setMove)
                    return 0;
                }
            }
            else {
                setMove = []
                setMove.push(randomNum(0, settings.playgroundSize), randomNum(0, settings.playgroundSize))
                fill(aim, setMove)
                return 0;
            }
        }

        let array: any = []
        let arrStr: boolean[] = []
        if (curPlayer == "player")
            array = playerPlayfield
        else
            array = computerPlayfield

        array.mainArr.forEach((element: any[]) => {
            let check = element.every((elem: any) => {
                return (elem.value != 1 || (elem.value == 1 && elem.shooted == true))
            })
            arrStr.push(check)
        });
        if (arrStr.every((elem: any) => { return elem == true })) {
            return [curPlayer, 0];
        }

        let accessToThis = this

        if (curPlayer == "player")
            computerPlayfield.addEvent()
        else
            ai.shot()


        return curPlayer;
    }
}