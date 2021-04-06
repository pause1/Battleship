import { settings } from "./settings"
import { getStyle, playerPlayfield, playerShips } from "./main";
import { Manager } from "./manager";
import { fullFillRandomShips } from "./generator"

export class playerShip {
    private div = <HTMLDivElement>document.createElement("div")
    private curShip: any
    public game: any = ''

    constructor() {
        this.div.className = "shipsToAdd"

        document.body.appendChild(this.div)
        this.select = this.select.bind(this)
        this.resizeShipsWindow = this.resizeShipsWindow.bind(this)
        this.postShipThere = this.postShipThere.bind(this)
        this.rotateCurShip = this.rotateCurShip.bind(this)
        this.removeShip = this.removeShip.bind(this)
    }

    createShips() {
        let letter = "A"
        settings.defaultShips.forEach(element => {
            let oneShip = <HTMLDivElement>document.createElement("div")
            oneShip.className = "ship"
            oneShip.id = letter + element.toString()
            letter = letter.substring(0, letter.length - 1) + String.fromCharCode(letter.charCodeAt(letter.length - 1) + 1)
            for (let i: number = 0; i < element; i++) {
                let singleDiv = <HTMLDivElement>document.createElement("div")
                singleDiv.className = "fas fa-ship"
                oneShip.appendChild(singleDiv)
            }
            this.div.appendChild(oneShip)
        });

        let xd: string = getStyle(document.body, "margin")
        let marginToSubstract: number = parseInt(xd)

        let cheat = <HTMLButtonElement>document.createElement("button")
        cheat.onclick = () => {
            playerPlayfield.mainArr.forEach((element: any) => {
                element.forEach((elem: any) => {
                    elem.value = 0
                    elem.length = null
                    elem.orientation = settings.defOrientation
                    elem.shooted = false
                });
            });

            let elements = <HTMLCollection>document.getElementsByClassName("elem player")

            Array.prototype.forEach.call(elements, function (el: HTMLElement) {
                el.onclick = () => false;
                el.onmouseenter = () => false;
                el.onmouseleave = () => false;
                el.style.cursor = "default"
                el.style.color = ""
            });
            playerShips.curShip = null

            fullFillRandomShips(playerPlayfield.mainArr)
            let myNode = <HTMLDivElement>document.getElementsByClassName("shipsToAdd")[0];
            while (myNode.lastChild) {
                myNode.removeChild(myNode.lastChild);
            }
            playerPlayfield.rewrite()
            this.startGame()
        }
        cheat.textContent = "Push random ships"
        cheat.style.margin = "10px"
        this.div.insertBefore(cheat, this.div.firstChild)

        this.div.style.width = (window.innerWidth - playerPlayfield.playDiv.offsetWidth * 2 - 2 * marginToSubstract) + "px"

        Array.prototype.forEach.call(this.div.children, (el: HTMLElement) => {
            if (el.tagName != "BUTTON")
                el.style.margin = "0px"
            el.style.padding = "0px"
            el.style.height = (parseFloat(getStyle(playerPlayfield.playDiv, "height")) - 10 - parseFloat(getStyle(cheat, "margin")) * 2) / this.div.children.length + "px"
        });

        window.addEventListener("resize", this.resizeShipsWindow)

    }

    resizeShipsWindow() {
        let xd: string = getStyle(document.body, "margin")
        let marginToSubstract: number = parseInt(xd)
        this.div.style.width = (window.innerWidth - playerPlayfield.playDiv.offsetWidth * 2 - 2 * marginToSubstract) + "px"
    }

    addListener() {
        let accessThis = this
        let shipCol = <HTMLCollection>document.getElementsByClassName("ship")
        if (shipCol.length > 0) {
            Array.prototype.forEach.call(shipCol, function (el: HTMLElement) {
                el.onclick = accessThis.select
                el.style.cursor = "pointer"
            });
            let placedShips = playerPlayfield.playDiv.getElementsByClassName("elem fa-ship player")
            Array.prototype.forEach.call(placedShips, function (el: HTMLElement) {
                el.onclick = accessThis.removeShip
                el.style.cursor = "pointer"
            });
        }
        else {
            this.startGame()
        }
    }

    startGame() {
        let accessThis = this
        let button = <HTMLButtonElement>document.createElement("button")
        button.textContent = "Start game"
        button.onclick = () => {
            let placedShips = playerPlayfield.playDiv.getElementsByClassName("elem fa-ship player")
            Array.prototype.forEach.call(placedShips, function (el: HTMLElement) {
                el.onclick = () => { return 0; }
                el.style.cursor = "default"
            });

            this.game = new Manager()
            this.game.startGame()
        }
        this.div.innerHTML = ""
        this.div.appendChild(button)

        let placedShips = playerPlayfield.playDiv.getElementsByClassName("elem fa-ship player")
        Array.prototype.forEach.call(placedShips, function (el: HTMLElement) {
            el.onclick = () => {
                button.remove()
                accessThis.removeShip(event)
            }
            el.style.cursor = "pointer"
        });

    }

    removeShip(event: any) {
        let accessThis = this
        let placedShips = playerPlayfield.playDiv.getElementsByClassName("elem fa-ship player")
        Array.prototype.forEach.call(placedShips, function (el: HTMLElement) {
            el.onclick = () => false;
            el.style.cursor = "default"
        });

        let tempPos: Array<any> = event.path[0].id.split(",")
        let toTrash: Array<any> = []
        toTrash.push({
            a: Number([tempPos[1]]),
            b: Number([tempPos[0]])
        })

        let tempPosNmb: Array<number> = []
        tempPos.forEach(element => {
            tempPosNmb.push(Number(element))
        });

        let index: number = 1
        for (let i: number = 1; i < playerPlayfield.mainArr[tempPosNmb[1]][tempPosNmb[0]].static; i++) {
            if (playerPlayfield.mainArr[tempPosNmb[1]][tempPosNmb[0]].staticOr == true) {
                try {
                    if (playerPlayfield.mainArr[tempPosNmb[1]][tempPosNmb[0] + i].value == 1) {
                        toTrash.push({
                            a: Number([tempPos[1]]),
                            b: Number([tempPos[0]]) + i
                        })
                    }
                    else {
                        try {
                            if (playerPlayfield.mainArr[tempPosNmb[1]][tempPosNmb[0] - index].value == 1) {
                                toTrash.push({
                                    a: Number([tempPos[1]]),
                                    b: Number([tempPos[0]]) - index
                                })
                                index++
                            }
                        }
                        catch (err) { }
                    }
                } catch (err) {
                    if (playerPlayfield.mainArr[tempPosNmb[1]][tempPosNmb[0] - index].value == 1) {
                        toTrash.push({
                            a: Number([tempPos[1]]),
                            b: Number([tempPos[0]]) - index
                        })
                        index++
                    }
                }
            }
            else {
                try {

                    if (playerPlayfield.mainArr[tempPosNmb[1] + i][tempPosNmb[0]].value == 1) {
                        toTrash.push({
                            a: Number([tempPos[1]]) + i,
                            b: Number([tempPos[0]])
                        })
                    }
                    else {
                        if (playerPlayfield.mainArr[tempPosNmb[1] - index][tempPosNmb[0]].value == 1) {
                            toTrash.push({
                                a: Number([tempPos[1]]) - index,
                                b: Number([tempPos[0]])
                            })
                            index++
                        }
                    }
                } catch (err) {
                    if (playerPlayfield.mainArr[tempPosNmb[1] - index][tempPosNmb[0]].value == 1) {
                        toTrash.push({
                            a: Number([tempPos[1]]) - index,
                            b: Number([tempPos[0]])
                        })
                        index++
                    }
                }
            }
        }

        let oneShip = <HTMLDivElement>document.createElement("div")
        oneShip.className = "ship"
        oneShip.id = "Z" + toTrash.length
        for (let i: number = 0; i < toTrash.length; i++) {
            let singleDiv = <HTMLDivElement>document.createElement("div")
            singleDiv.className = "fas fa-ship"
            oneShip.appendChild(singleDiv)
        }
        oneShip.onclick = this.select
        oneShip.style.cursor = "pointer"
        playerShips.div.appendChild(oneShip)
        toTrash.forEach(element => {
            let temp = playerPlayfield.mainArr[element.a][element.b]
            temp.length = null
            temp.static = null
            temp.oldValue = null
            temp.orientation = settings.defOrientation
            temp.staticOr = null
            temp.shooted = false
            temp.value = 0
        });
        playerShips.removeUnnecessaryLength()

        playerPlayfield.mainArr.forEach((element: any) => {
            element.forEach((elem: any) => {
                if (elem.value == 2)
                    elem.value = 0
            });
        });
        this.write2nearTo1()
        playerPlayfield.rewrite()

        placedShips = playerPlayfield.playDiv.getElementsByClassName("elem fa-ship player")
        Array.prototype.forEach.call(placedShips, function (el: HTMLElement) {
            el.onclick = accessThis.removeShip
            el.style.cursor = "pointer"
        });
    }

    rotateCurShip(event: any) {
        try {
            event.preventDefault()
            let mousePos: Array<number> = []
            event.path[0].id.split(",").forEach((element: number) => {
                mousePos.push(Number(element))
            });
            playerPlayfield.mainArr[mousePos[1]][mousePos[0]].orientation = !playerPlayfield.mainArr[mousePos[1]][mousePos[0]].orientation
            this.curShip.orientation = playerPlayfield.mainArr[mousePos[1]][mousePos[0]].orientation
            playerPlayfield.mainArr.forEach((element: any) => {
                element.forEach((element2: any) => {
                    if (element2.value == 3) {
                        element2.value = element2.oldValue
                        element2.oldValue = null
                        element2.orientation = settings.defOrientation
                        var elem = <HTMLElement>document.getElementById(element2.x + "," + element2.y)
                        elem.style.color = ""
                        elem.style.cursor = "default"
                    }
                    playerPlayfield.rewrite()
                });
            });
            playerShips.removeUnnecessaryLength()
            let arrPos = playerPlayfield.mainArr[mousePos[1]][mousePos[0]]
            let length = this.curShip.children.length
            arrPos.orientation = this.curShip.orientation
            this.draw(3, playerPlayfield.mainArr[mousePos[1]][mousePos[0]], mousePos, length, event.path[0])
            playerPlayfield.rewrite()
        }
        catch (err) { }
    }

    select(event: any) {
        let accessThis = this
        const curShipTemp: string = event.currentTarget.id
        playerShips.curShip = <HTMLElement>document.getElementById(curShipTemp.toString())
        playerShips.curShip.style.color = "Green"
        let shipCol = <HTMLCollection>document.getElementsByClassName("ship")
        Array.prototype.forEach.call(shipCol, function (el: HTMLElement) {
            el.onclick = () => false;
            el.style.cursor = "default"
        })

        let placedShips = playerPlayfield.playDiv.getElementsByClassName("elem fa-ship player")
        Array.prototype.forEach.call(placedShips, function (el: HTMLElement) {
            el.onclick = () => false;
            el.style.cursor = "default"
        });

        window.addEventListener("contextmenu", this.rotateCurShip)

        let entries = <HTMLCollection>document.getElementsByClassName("main " + playerPlayfield.type)
        Array.prototype.forEach.call(entries[0].children, function (el: HTMLElement) {
            let boxes = <HTMLCollectionOf<Element>>el.getElementsByClassName("elem")
            Array.prototype.forEach.call(boxes, function (el: HTMLElement) {
                el.onmouseenter = (event: any) => {
                    let mousePos: Array<number> = []
                    event.currentTarget.id.split(",").forEach((element: number) => {
                        mousePos.push(Number(element))
                    });
                    let arrPos = playerPlayfield.mainArr[mousePos[1]][mousePos[0]]
                    let length = accessThis.curShip.children.length
                    if (accessThis.curShip.orientation != undefined)
                        arrPos.orientation = accessThis.curShip.orientation
                    else
                        arrPos.orientation = settings.defOrientation
                    accessThis.draw(3, arrPos, mousePos, length, event.path[0])

                    playerPlayfield.rewrite()
                    el.onmouseleave = function () {
                        playerPlayfield.mainArr.forEach((element: any) => {
                            element.forEach((element2: any) => {
                                if (element2.value == 3) {
                                    element2.value = element2.oldValue
                                    element2.oldValue = null
                                    element2.orientation = settings.defOrientation
                                    var elem = <HTMLElement>document.getElementById(element2.x + "," + element2.y)
                                    elem.style.color = ""
                                    elem.style.cursor = "default"
                                }
                                playerPlayfield.rewrite()
                            });
                        });
                        playerShips.removeUnnecessaryLength()
                    }
                }
            })
        })

        let elements = <HTMLCollection>document.getElementsByClassName("elem player fa-stop")
        Array.prototype.forEach.call(elements, function (el: HTMLElement) {
            el.onclick = accessThis.postShipThere
        });
    }

    draw(target: number, arrPos: any, mousePos: Array<number>, length: number, toPointer: any) {
        let index: number = 1
        let i: number = 0
        let tempArr: Array<any> = []
        function checker() {
            if (tempArr.every((element: any) => {
                return (element.value == 0)
            })) {
                toPointer.style.cursor = "pointer"
                tempArr.forEach((element: any) => {
                    element.oldValue = element.value
                    element.value = target
                });
            }
            else {
                tempArr.forEach((element: any) => {
                    var elem = <HTMLElement>document.getElementById(element.x + "," + element.y)
                    elem.style.color = "red"
                    element.oldValue = element.value
                    element.value = target
                });
            }
        }
        function inDraw() {
            if (arrPos.orientation) {
                try {
                    if (playerPlayfield.mainArr[mousePos[1]][mousePos[0] + i].value != undefined)
                        tempArr.push(playerPlayfield.mainArr[mousePos[1]][mousePos[0] + i])
                    i++
                    if (i < length)
                        inDraw()
                    else
                        checker()
                }
                catch (error) {
                    if (playerPlayfield.mainArr[mousePos[1]][mousePos[0] - index].value != undefined)
                        tempArr.push(playerPlayfield.mainArr[mousePos[1]][mousePos[0] - index])
                    index++
                    i++
                    if (i < length)
                        inDraw()
                    else
                        checker()
                }
            }
            else {
                try {
                    if (playerPlayfield.mainArr[mousePos[1] + i][mousePos[0]].value != undefined)
                        tempArr.push(playerPlayfield.mainArr[mousePos[1] + i][mousePos[0]])
                    i++
                    if (i < length)
                        inDraw()
                    else
                        checker()
                }
                catch (error) {
                    if (playerPlayfield.mainArr[mousePos[1] - index][mousePos[0]].value != undefined)
                        tempArr.push(playerPlayfield.mainArr[mousePos[1] - index][mousePos[0]])
                    index++
                    i++
                    if (i < length)
                        inDraw()
                    else
                        checker()
                }
            }
        }
        if (length > 0)
            inDraw()
    }

    postShipThere(event: any) {
        window.removeEventListener("contextmenu", this.rotateCurShip)
        let mousePos: Array<number> = []
        event.currentTarget.id.split(",").forEach((element: number) => {
            mousePos.push(Number(element))
        });
        let elements = <HTMLCollection>document.getElementsByClassName("elem player")

        if (Array.prototype.every.call(elements, function (element: HTMLElement) {
            return (element.style.color != "red")
        })) {
            let index: number = 1
            let statOr: any = null
            playerPlayfield.mainArr.forEach((element: any) => {
                element.forEach((elem: any) => {
                    if (elem.value == 3) {
                        elem.static = this.curShip.children.length
                        if (index == 1)
                            statOr = elem.orientation
                        elem.staticOr = statOr
                        elem.value = 1
                        index++
                    }
                });
            });
            let arrPos: any = playerPlayfield.mainArr[mousePos[1]][mousePos[0]]
            this.draw(1, arrPos, mousePos, arrPos.length, null)

            Array.prototype.forEach.call(elements, function (el: HTMLElement) {
                el.onclick = () => false;
                el.onmouseenter = () => false;
                el.onmouseleave = () => false;
                el.style.cursor = "default"
                el.style.color = ""
            });

            this.write2nearTo1()
            this.curShip.remove()
            this.curShip = null
            this.addListener()
        }
    }

    removeUnnecessaryLength() {
        playerPlayfield.mainArr.forEach((element: any) => {
            element.forEach((elem: any) => {
                if (elem.value != 1)
                    elem.length = null
            });
        });
    }

    write2nearTo1() {
        let toCheck: Array<any> = []
        playerPlayfield.mainArr.forEach((element: any) => {
            element.forEach((element: any) => {
                if (element.value == 1)
                    toCheck.push(element)
            })
        });

        toCheck.forEach((element: any) => {
            try { if (playerPlayfield.mainArr[element.y + 1][element.x].value == 0) playerPlayfield.mainArr[element.y + 1][element.x].value = 2 } catch (err) { }
            try { if (playerPlayfield.mainArr[element.y - 1][element.x].value == 0) playerPlayfield.mainArr[element.y - 1][element.x].value = 2 } catch (err) { }
            try { if (playerPlayfield.mainArr[element.y][element.x - 1].value == 0) playerPlayfield.mainArr[element.y][element.x - 1].value = 2 } catch (err) { }
            try { if (playerPlayfield.mainArr[element.y][element.x + 1].value == 0) playerPlayfield.mainArr[element.y][element.x + 1].value = 2 } catch (err) { }
            try { if (playerPlayfield.mainArr[element.y + 1][element.x + 1].value == 0) playerPlayfield.mainArr[element.y + 1][element.x + 1].value = 2 } catch (err) { }
            try { if (playerPlayfield.mainArr[element.y - 1][element.x + 1].value == 0) playerPlayfield.mainArr[element.y - 1][element.x + 1].value = 2 } catch (err) { }
            try { if (playerPlayfield.mainArr[element.y + 1][element.x - 1].value == 0) playerPlayfield.mainArr[element.y + 1][element.x - 1].value = 2 } catch (err) { }
            try { if (playerPlayfield.mainArr[element.y - 1][element.x - 1].value == 0) playerPlayfield.mainArr[element.y - 1][element.x - 1].value = 2 } catch (err) { }
        })

        playerPlayfield.rewrite()
    }
}