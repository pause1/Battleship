import { settings } from "./settings"
import { randomNum } from "./generator";
import { playerPlayfield, playerShips } from "./main";

export class AI {
    lastShoot: any = {}
    shotArr: number[][] = []
    constructor() {
        for (let i: number = 0; i < settings.playgroundSize; i++) {
            let tempArr: number[] = []
            for (let j: number = 0; j < settings.playgroundSize; j++)
                tempArr.push(0)
            this.shotArr.push(tempArr)
        }
        this.randomShot = this.randomShot.bind(this)
    }

    shot() {
        if (this.shotArr.every((element: number[], index) => {
            return this.shotArr[index].every((element: number) => {
                return (element == 0 || element == 1)
            })
        })) {
            console.log("pusta")
        }
        else {
            //tu proba dobicia
            //to najlepiej rozrysowac drzewkiem w sumie, analogicnzie do ponizszego 
            //jesli gora nie sprawdzona -> sprawdz -> jesli zajeta dobijaj w gore, jesli nie przejdz do nastepnego etapu -> jesli skonczy sie w gore, jesli dlugosc nie odpowiada najdluzszemu, sprawdz dla jednego w dol czy pelny
            //jesli gora nie sprawdzona -> sprawdz
            //jesli gora nie sprawdzona -> sprawdz
            //jesli gora nie sprawdzona -> sprawdz
            //jesli gora nie sprawdzona -> sprawdz
        }



        //jesli nie uzupelnia i dostepne na planszy jedynki
        this.randomShot()
    }

    randomShot() {
        let _this = this
        function fill(aim: boolean, setMove: any[]) {
            if (playerPlayfield.mainArr[setMove[1]][setMove[0]].shooted == false) {
                if (aim && playerPlayfield.mainArr[setMove[1]][setMove[0]].value == 1) {
                    playerPlayfield.mainArr[setMove[1]][setMove[0]].shooted = true
                    _this.shotArr[setMove[1]][setMove[0]] = 2
                    playerPlayfield.rewrite()
                    playerShips.game.giveMove("player")
                }
                else if (!aim && playerPlayfield.mainArr[setMove[1]][setMove[0]].value != 1) {
                    playerPlayfield.mainArr[setMove[1]][setMove[0]].shooted = true
                    _this.shotArr[setMove[1]][setMove[0]] = 1
                    playerPlayfield.rewrite()
                    playerShips.game.giveMove("player")
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
        setTimeout(() => {
            let aim: boolean
            if (Math.random() > Number(settings.level))
                aim = false
            else
                aim = true
            let setMove: Array<number> = []
            setMove.push(randomNum(0, settings.playgroundSize), randomNum(0, settings.playgroundSize))
            fill(aim, setMove)


        }, 1000)
    }


}