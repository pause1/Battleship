import { fullFillRandomShips } from "./generator"
import { playfield } from "./playfield"
import { playerShip } from "./playerShips"
import { AI } from "./ai"

export let playerShips: any;
export let playerPlayfield: any;
export let computerPlayfield: any;
export let ai: any;

document.addEventListener("DOMContentLoaded", function () {

    playerPlayfield = new playfield("player")
    playerShips = new playerShip()
    playerShips.createShips()
    computerPlayfield = new playfield("AI")
    computerPlayfield.mainArr = fullFillRandomShips(computerPlayfield.mainArr)
    computerPlayfield.rewrite()
    playerShips.addListener()
    ai = new AI()

})

export function getStyle(el: Element, styleProp: string): any {
    let defaultView: any = getComputedStyle(el)
    let xdf = defaultView.getPropertyValue(styleProp)
    return xdf
}



/* zabezpieczyc przed usuwaniem poprzez przesuwanie stawianych statków            | DONE
statków nie można stawiać jeden koło drugiego (zapełnienie 2 wokół 1 w tablicy)   | DONE
ogarnąć pointer na wybieranych statkach                                           | DONE
wyróżnić wybrany statek                                                           | DONE
obrócenie wybranego statku                                                        | DONE
ogarnąć dynamiczność elementów mainArr.length bo cos odkurwia                     | DONE
rozpoczęcie gry  playerships.ts => 63                                             | DONE
ogarnac ze gracz jest glupi i nie bedzie mogl postawic statku xd                  | DONE
strzelanie                                                                        | DONE
AI                                                                                | DONE
wygrana/przegrana                                                                 | DONE

!!!!
dlugosc kliknietego juz postawionego jest nieprawidlowa (super) dlugosc fora 153  | DONE
dynamiczne pokazywanie stawianego statku psuje potem usuwanie jezeli statek 
                                jest obrocony inaczej niz juz postawiony ta dalej | DONE */

//BONUS: AI zatapia statki
/* trzeba by dodac do lastaimove punkt startowy i aktualny punkt strzalu, jak znajdzie w jedna strone to dobija az znajdzie puste pole w mainarr albo zajete wg AiArr,
 wtedy przechodzi do nastepnego kierunku wg punktu startowego i tak do usranej smierci :D  
 ~2h pracy mysle zeby to jakos wygladalo a nie 40tys ifow ktore de facto tez pisanie nie wiadomo ile*/