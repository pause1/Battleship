import { getStyle } from "./main"
import { playerPlayfield } from "./main"

export function log(target: any, name: string, descriptor: any) {
    var originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        var result: any = originalMethod.apply(this, args);
        let infoBox = <HTMLDivElement>document.getElementsByClassName("shipsToAdd")[0]
        if (!Array.isArray(result)) {
            infoBox.textContent = "Current move belongs to: " + result
            if (result == "AI")
                infoBox.innerHTML += "<br/>AI is calculating new move..."
        }
        else {
            let winner: string
            if (result[0] == 'player')
                winner = "This game has been won by AI."
            else
                winner = "Congratulations! You won."
            endAlert(winner)
            infoBox.innerHTML = "<button onclick='location.reload()'>Play again</button>"
            infoBox.style.marginTop = <string>((parseFloat(getStyle(playerPlayfield.playDiv, "height")) - 20) / 2 + "px")
            infoBox.style.height = "20px"
        }

    }
}

function endAlert(winner: string) {
    let curtain = <HTMLDivElement>document.createElement("div")
    curtain.className = "curtain"
    curtain.style.width = window.innerWidth + "px"
    curtain.style.height = window.innerHeight + "px"
    let curtainBox = <HTMLDivElement>document.createElement("div")
    curtainBox.className = "curtainBox"
    let curtainButton = <HTMLButtonElement>document.createElement("button")

    curtainBox.innerHTML = winner + "<br /><br />"
    curtainButton.textContent = "Understood"

    curtainButton.onclick = () => curtain.remove()
    curtainBox.appendChild(curtainButton)
    curtain.appendChild(curtainBox)
    document.body.appendChild(curtain)
    curtainBox.style.top = window.innerHeight / 2 - parseFloat(getStyle(curtainBox, "height")) / 2 - parseFloat(getStyle(curtainBox, "padding")) + "px"
    curtainBox.style.left = window.innerWidth / 2 - parseFloat(getStyle(curtainBox, "width")) / 2 - parseFloat(getStyle(curtainBox, "padding")) + "px"
    curtainButton.style.marginLeft = parseFloat(getStyle(curtainBox, "width")) / 2 - parseFloat(getStyle(curtainButton, "width")) / 2 + "px"
}
